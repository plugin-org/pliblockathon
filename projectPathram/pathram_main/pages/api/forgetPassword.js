

/**
* @param {import('next').NextApiRequest} req
* @param {import('next').NextApiResponse} res
*/

import { firebaseAdmin } from '../../firebase-admin';

export default async function (req, res) {
    const email = req.body.email;
    const password = req.body.newPassword;
    const docs =  await firebaseAdmin.firestore().collection("users").where("email","==",email).get();

    if(docs.docs.length>0){
        await firebaseAdmin
          .firestore()
          .collection("forgetPassword")
          .doc(email)
          .create({
            email: email,
            timestamp: new Date().toUTCString(),
            newPassword: password,
          });
          res.status(200).json({message: "Succesfully Reset Request Sent."})
    }else{
        res.status(400).json({message: "Invalid email. You are not authorized."})
    }
}