import { firebaseAdmin } from "../../firebase-admin";

export default async function createUserInFirebase(req, res) {
  try {
    const email = req.body.email;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == false) {
      res.status(400).json({ message: "Invalid Email" });
      return;
    }
    const password = req.body.password;
    const role = req.body.role;
    const secret = req.body.secret;
    // if (email || password || role) {
    //   res.status(400).json({ message: "Incomplete Data" });
    //   return;
    // }
    console.log({ email, password, role });

    const userRec = await firebaseAdmin.auth().createUser({
      email: email,
      password: password,
      displayName: role,
    });

    const uid = userRec.uid;
    await firebaseAdmin.firestore().collection("keys").doc(uid).set({
      secret: secret,
      password: password,
      email: email,
    });
    console.log(userRec.uid);
    res.status(200).json({ uid: userRec.uid });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
