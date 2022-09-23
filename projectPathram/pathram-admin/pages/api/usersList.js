import { firebaseAdmin } from "../../firebase-admin";

export default async function usersList(req, res) {
  try {
    const email = req.body.email;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == false) {
      res.status(400).json({ message: "Invalid Email" });
      return;
    }

    let usersList = []

    const users = await firebaseAdmin.auth().listUsers().then((userRecords) => {
        userRecords.users.forEach((user) => {
            let userEmail = user.email
            usersList.push(userEmail)
        });
        // res.end('Retrieved users list successfully.');
      }).catch((error) => console.log(error));

      if(usersList.includes(email)) res.send({bool:true})
      else res.send({bool:false})
    //   res.send({"usersList":usersList})

  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
