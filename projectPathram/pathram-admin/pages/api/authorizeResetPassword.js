/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
import { firebaseAdmin } from "../../firebase-admin";

export default async function authorizeResetPassword(req, res) {
  try {
    const email = req.body.email;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == false) {
      res.status(400).json({ message: "Invalid Email" });
      return;
    }
    const newPassword = req.body.newPassword;

    const ABSOLUTE_URL = process.env.ABSOLUTE_URL;

    console.log({ email, newPassword });

    const userData = (
      await firebaseAdmin
        .firestore()
        .collection("users")
        .where("email", "==", email)
        .get()
    ).docs[0].data();
    console.log(userData);
    if (userData == undefined) {
      //reject authorization, send email

      res.status(400).json({ message: "Invalid email. User notified." });
    } else {
      const uid = userData.uid;
      await firebaseAdmin.auth().updateUser(uid, {
        password: newPassword,
      });
      await firebaseAdmin
        .firestore()
        .collection("forgetPassword")
        .doc(email)
        .delete();
      // send successful reset password email to user with email
      //TheSavage

      // decrypting secret key from masterkey
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        // type: "dec",
        // cipher: userData.masterSecret,
        // key: "TheSavage",
        inpText: userData.masterSecret,
        inpKey: "TheSavage",
        sleBlockSize: 256,
        direction : "Decrypt"
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      let secret;

      await fetch(`https://rgu-hub1.herokuapp.com/enc`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          // const res = JSON.parse(result);
          secret = result;
        })
        .catch((error) => {
          console.log(error);
        });

      // encrypting key with user new password

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        // type: "enc",
        // cipher: secret,
        // key: newPassword,
        
        inpText: secret,
        inpKey: newPassword,
        sleBlockSize: 256,
        direction : "Encrypt"
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      let secretHash;

      await fetch(`https://rgu-hub1.herokuapp.com/enc`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          // const res = JSON.parse(result);
          secretHash = result;
        })
        .catch((error) => {
          console.log(error);
        });

      //   update key in user

      await firebaseAdmin.firestore().collection("users").doc(uid).update({
        secretKey: secretHash,
      });

      // send email
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        TO: email,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        "https://dasthavej-admin.vercel.app/api/sendEmailNewPassword",
        requestOptions
      );

      res.status(200).json({ message: "succesful" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid email. User notified." });
  }
}
