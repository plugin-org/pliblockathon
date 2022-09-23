import React from "react";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import {
  auth,
  setDoc,
  doc,
  db,
  createUserWithEmailAndPassword,
  updateProfile,
  updateDoc,
  increment,
} from "../firebase-app";
import nookies from "nookies";
import InputWidget from "../components/widgets/InputWidget";
import RaisedButtonSecondary from "../components/widgets/RaisedButtonSecondary";
import SnackBarWidget from "../components/widgets/SnackBarWidget";
import BackdropWidget from "../components/widgets/BackdropWidget";

export default function Index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState(3);

  const addUser = async () => {
    const publicKey = "";
    const secretKey = "";

    if (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == false ||
      password.trim().length == 0 ||
      name.trim().length == 0 ||
      confirmPassword.trim().length == 0 ||
      designation.trim().length == 0
    ) {
      setError("All fields are required.");
      return;
    }
    if (password.trim() != confirmPassword.trim()) {
      setError("Incorrect passwords");
      return;
    }
    setSeverity(3);

    setLoading(true);
    try {
      // const raw = '';
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await fetch("/api/accountGenerator", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const res = JSON.parse(result);
          console.log(res);
          publicKey = res.public;
          secretKey = res.secret;
        })
        .catch((error) => {
          setError("Something went wrong. Try again.");
          setLoading(false);
          return;
        });
    } catch (error) {
      // setError(error);
      setError("Something went wrong. Try again.");
      setLoading(false);
      return;
    }

    console.log(secretKey);
    // console.log({ email, password, role });
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        email: email,
        password: password,
        role: role,
        secret: secretKey,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      let uid;
      await fetch("/api/createUserInFirebase", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const res = JSON.parse(result);
          console.log(res);
          uid = res.uid;
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
          return;
        });

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        // type: "enc",
        // cipher: secretKey,
        // key: password,
        inpText: secretKey,
        inpKey: password.trim(),
        sleBlockSize: 256,
        direction : "Encrypt"
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      let secret;

      await fetch("https://rgu-hub1.herokuapp.com/enc", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          // const res = JSON.parse(result);
          // secret = res.cipher;
          secret = result;
          console.log(result);
        })
        .catch((error) => console.log("error", error));

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        // type: "enc",
        // cipher: secretKey,
        // key: "TheSavage",
        inpText: secretKey,
        inpKey: "TheSavage",
        sleBlockSize: 256,
        direction : "Encrypt"
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      let masterSecret;

      await fetch("https://rgu-hub1.herokuapp.com/enc", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          // const res = JSON.parse(result);
          masterSecret = result;
          console.log(result + "Master Key");

        })
        .catch((error) => console.log("error", error));

      const userRef = doc(db, "users", uid);

      await setDoc(userRef, {
        name: name.trim(),
        email: email.trim(),
        role: role,
        uid: uid,
        secretKey: secret,
        publicKey: publicKey,
        designation: designation,
        imageUrl: "",
        masterSecret: masterSecret,
      });

      // sending email to user

      let headersList = {
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        TO: email,
        SUBJECT: "Login Credentials For Dasthavej",
        uid: uid,
        name: name,
      });

      await fetch("/api/sendEmail", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });

      // -----

      // updating total in count document
      const countRef = doc(db, "users", "count");
      await updateDoc(countRef, {
        total: increment(1),
      });
      setSeverity(1);
      setError("User added succesfully");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setDesignation("");
      setRole("");
    } catch (error) {
      console.log(error);
      // setError(error.message);
    }

    setLoading(false);
  };

  return (
    <Layout
      Component={
        <>
          <SnackBarWidget
            severityNumber={severity}
            handleClose={() => setError("")}
            message={error}
            open={error.length > 0}
          />
          <BackdropWidget open={loading} />
          <div className="flex bg-secondary flex-col-reverse sm:flex-row ">
            <div className="w-full sm:w-1/2 my-5 space-y-2 p-10 sm:p-20 text-justify font-secondaryTypefaceDmSans text-sm text-customBlack">
              <h1 className="text-primary font-primaryTypefaceJosefin text-2xl">
                Users and Roles in Dasthavej
              </h1>
              <p className="text-customWhite">
                There are 2 user roles under which a user can be added. Viz.
                Admin and Signer. Every user is an account on a blockchain.
              </p>
              <div className="text-customWhite">
                <p>
                  • Admin is responsible for registering an Event under any
                  specific <b>Event</b> Type.
                </p>
                <p>
                  • The Signer is responsible for approving or rejecting any
                  application that is requested under a certain Event Type in
                  which he/she is involved as a signer.
                </p>
              </div>
              <h1 className="text-primary font-primaryTypefaceJosefin text-2xl pt-5">
                User Addition Flow
              </h1>
              <div>
                <img src="/add_user.svg" alt="" srcset="" />
              </div>
              <h1 className="text-primary font-primaryTypefaceJosefin text-xl pt-5">
                What happens when you add user?
              </h1>
              <div className="text-xs text-customWhite">
                <p>1. Data is sent to server which executes further process.</p>
                <p>
                  2. A Keypair on Blockchain is generated and Account is funded
                  and created.
                </p>
                <p>
                  3. The required data is stored in the database in encrypted
                  format.
                </p>
                <p>
                  4. An onboarding mail is sent to the new user which has
                  view-once link of Account Credentials.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 flex flex-col items-center  space-y-2 p-10 sm:p-32 sm:m-5 rounded-md bg-actionBlack">
              <h1 className="text-xl  text-left font-primaryTypefaceJosefin text-customWhite  w-full">
                Add User
              </h1>

              <InputWidget
                type="text"
                placeholder="Name"
                value={name}
                onChangeFunction={(e) => setName(e.target.value)}
              />

              <InputWidget
                type="email"
                placeholder="Email"
                value={email}
                onChangeFunction={(e) => setEmail(e.target.value)}
              />

              <InputWidget
                type="text"
                placeholder="Designation"
                value={designation}
                onChangeFunction={(e) => setDesignation(e.target.value)}
              />

              <InputWidget
                type="password"
                placeholder="Password"
                value={password}
                onChangeFunction={(e) => setPassword(e.target.value)}
              />

              <InputWidget
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeFunction={(e) => setConfirmPassword(e.target.value)}
              />
              <select
                className="outline-none  focus:shadow-md px-4 py-2 border border-secondary rounded-md transition duration-200 focus:scale-100 text-customWhite bg-secondary w-full"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="signer">Signer</option>
              </select>
              <div className="flex w-full space-x-2">
                <button
                  disabled={loading}
                  onClick={addUser}
                  className={`bg-primary px-4 w-full text-customWhite rounded-sm duration-200 hover:bg-secondary hover:text-primary font-primaryTypefaceJosefin leading-4 pt-2 pb-1 `}
                >
                  {loading ? <center>Adding...</center> : <h1>Add User</h1>}
                </button>
                <RaisedButtonSecondary
                  buttonName="Cancel"
                  width="w-full"
                  link="/"
                />
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}

export const getServerSideProps = async (ctx) => {
  console.log("AuthCheck getServerSideProps");
  try {
    console.log("Enterd AuthCheck");
    const cookies = nookies.get(ctx);
    if (
      cookies.token == undefined ||
      cookies.token == null ||
      cookies.token == ""
    ) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
    if (cookies.role != "super-admin") {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
    console.log("Hello");
    console.log("Cookies: ", cookies);
    // const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    return {
      props: {},
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};
