
import { useEffect, useState } from "react";

import { auth, signInWithEmailAndPassword, signOut } from "../firebase-app";
import { useRouter } from "next/router";
import nookies from "nookies";
import InputWidget from "../components/widgets/InputWidget";
import RaisedButton from "../components/widgets/RaisedButton";
import TextButton from "../components/widgets/TextButton";
import Link from "next/link";
import BackdropWidget from "../components/widgets/BackdropWidget";
import SnackBarWidget from "../components/widgets/SnackBarWidget";

function Login({ props }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    if (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == false ||
      password.trim().length == 0
    ) {
      setError("All fields required.");
      return;
    }
    setLoading(true);
    await signInWithEmailAndPassword(auth, email.trim(), password.trim())
      .then(async (user) => {
        if (user.user.displayName != "super-admin") {
          setError("You are not authorised!");
          signOut(auth);
          setLoading(false);
          return;
        }
        setLoading(false);
        router.replace("/");
      })
      .catch((er) => {
        const msg = er.message.split(":")[1];
        setError(msg);
      });
    setLoading(false);
  };

  const forgotPassoword = async () => {
    alert("Sit back, relax and try to remember!");
  };

  return (
    <>
      <BackdropWidget open={loading} />
      <SnackBarWidget
        severityNumber={3}
        handleClose={() => setError("")}
        message={error}
        open={error.length > 0}
      />
      <div className="w-screen h-[45rem] sm:h-screen flex flex-col sm:flex-row bg-secondary">
        <div className="h-1/3  w-full sm:w-1/2 sm:h-full    flex sm:items-center sm:justify-end items-end justify-center">
          <div className="w-5/6  h-5/6 sm:border-r-0 border-opacity-60 border-t-8 border-l-8 sm:border-b-8 border-r-8 rounded-sm   border-secondary flex items-center justify-center flex-col text-white space-y-0 sm:space-y-2">
            <Link href="/">
              <img
                src="/Logo 1.svg"
                className="w-28 sm:w-64 mb-4"
                alt=""
              />
            </Link>

            <p className="text-lg sm:text-2xl drop-shadow-md font-primaryTypefaceJosefin">
              Document Management System
            </p>
            <p className="text-sm sm:text-base font-primaryTypefaceJosefin">
              Powered by XDC Network
            </p>
            {/* <RaisedButtonSecondary buttonName="Home" link="/" /> */}
          </div>
        </div>
        <div className="h-2/3 w-full sm:w-1/2 sm:h-full flex sm:items-center justify-center  sm:justify-start">
          <div className="w-5/6 h-5/6 bg-actionBlack  rounded-sm border-secondary border-b-8 border-r-8 border-l-8 sm:border-l-0 sm:border-t-8 flex justify-center text-gray-800 flex-col space-y-12 p-4 sm:px-20 ">
            <h1 className=" text-lg sm:text-xl text-center font-primaryTypefaceJosefin text-primary font-bold">
              LOGIN
            </h1>
            <div className="space-y-3  w-full">
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="email"
                  className="text-customWhite font-secondaryTypefaceDmSans"
                >
                  Email
                </label>
                <InputWidget
                  placeholder="john@email.com"
                  type="email"
                  value={email}
                  onChangeFunction={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="password"
                  className="text-customWhite font-secondaryTypefaceDmSans"
                >
                  Password
                </label>
                <InputWidget
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChangeFunction={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <RaisedButton
                buttonName="Login"
                width="w-full"
                onClickFunction={loginUser}
              />
              <div className="flex justify-center">
                <TextButton
                  buttonName="Forgot Password?"
                  width="w-full"
                  onClickFunction={forgotPassoword}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

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
        props: {},
      };
    }
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
};

export default Login;
