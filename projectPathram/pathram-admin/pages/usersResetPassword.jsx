import { useRouter } from "next/router";
import nookies from "nookies";
import { useState } from "react";
import Layout from "../components/Layout";
import BackdropWidget from "../components/widgets/BackdropWidget";
import RaisedButton from "../components/widgets/RaisedButton";
import SnackBarWidget from "../components/widgets/SnackBarWidget";

import { firebaseAdmin } from "../firebase-admin";

function UsersResetPassword({ email, newPassword }) {
  const router = useRouter();
  console.log({ email, newPassword });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState(3);
  const authorizeResetPassword = async () => {
    setLoading(true);
    setSeverity(3);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      newPassword: newPassword,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch("/api/authorizeResetPassword", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setSeverity(1);
        setError("Password changed successfully!");
        router.reload();
      })
      .catch((error) => {
        console.log(error);
        setError("Error resetting password!");
      });
    setLoading(false);
  };
  return (
    <Layout
      Component={
        <>
          <BackdropWidget open={loading} />
          <SnackBarWidget
            severityNumber={severity}
            handleClose={() => setError("")}
            message={error}
            open={error.length > 0}
          />
          <div className="max-w-6xl mx-auto h-[82vh] py-10 px-10 sm:px-0 text2xl font-primaryTypefaceJosefin text-customBlack   space-y-2">
            <h1>
              <span className="font-semibold mr-2 text-primary">
                Requested Email Address:
              </span>{" "}
              {email}
            </h1>
            <h1>
              <span className="font-semibold mr-2 text-primary">
                New Password:
              </span>{" "}
              {newPassword}
            </h1>
            <RaisedButton
              buttonName="Authorize"
              onClickFunction={authorizeResetPassword}
            />
          </div>
        </>
      }
    />
  );
}

export default UsersResetPassword;

export const getServerSideProps = async (ctx) => {
  console.log("AuthCheck getServerSideProps");
  try {
    console.log("Enterd AuthCheck");
    const cookies = nookies.get(ctx);

    console.log("Cookies: ", cookies);
    if (
      cookies.length == 0 ||
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

    const reqEmail = ctx.query.email;

    console.log(reqEmail);
    let email, newPassword;

    console.log(reqEmail);

    if (reqEmail == undefined) {
      const reqSnap = (
        await firebaseAdmin
          .firestore()
          .collection("forgetPassword")
          .limit(1)
          .get()
      ).docs[0].data();
      email = reqSnap.email;
      newPassword = reqSnap.newPassword;
    } else {
      const reqSnap = (
        await firebaseAdmin
          .firestore()
          .collection("forgetPassword")
          .doc(reqEmail)
          .get()
      ).data();
      if (reqSnap == undefined) {
        return {
          redirect: {
            permanent: false,
          destination: "/",
          }
        };
      } else {
        email = reqSnap.email;
        newPassword = reqSnap.newPassword;
      }
    }

    // const email =
    return {
      props: {
        email,
        newPassword,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        permanent: false,
      destination: "/",
      }
    };
  }
};
