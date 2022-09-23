import * as firebaseAdmin from 'firebase-admin'



if(firebaseAdmin.apps.length==0){

    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            privateKey: process.env.NEXTAUTH_FADMIN_PRIVATE_KEY,
            clientEmail: process.env.NEXTAUTH_FADMIN_CLIENT_EMAIL,
            projectId: process.env.NEXTAUTH_FADMIN_PROJECT_ID
        }),
        databaseURL: process.env.NEXTAUTH_FADMIN_DATABASE_URL
    })

    // app = initializeApp({
    //     credential: credential.cert({
            // privateKey: process.env.NEXTAUTH_FADMIN_PRIVATE_KEY,
            // clientEmail: process.env.NEXTAUTH_FADMIN_CLIENT_EMAIL,
            // projectId: process.env.NEXTAUTH_FADMIN_PROJECT_ID
    //     }),
    //     databaseURL: process.env.NEXTAUTH_FADMIN_DATABASE_URL
    // });
}



export {
    firebaseAdmin
}