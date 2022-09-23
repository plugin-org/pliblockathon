import Link from "next/link";
import Layout from "../../components/Layout";
import nookies from "nookies";
import { useEffect, useState } from "react";
import { firebaseAdmin } from "../../firebase-admin";
import SnackBarWidget from "../../components/widgets/SnackBarWidget";

function Dashboard({
  uid,
  name,
  designation,
  totalRequests,
  pendingRequests,
  message,
  time,
}) {
  console.log(message);

  const [m, setM] = useState(message);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message.length > 0) {
      setM(message);
      setOpen(true);
    }
  }, [time]);
  return (
    <Layout
      Component={
        <>
          <SnackBarWidget
            severityNumber={2}
            handleClose={() => setOpen(false)}
            message={m}
            open={open}
          />
          <div className="flex flex-col sm:flex-row bg-secondary">
            <div className="w-full sm:w-1/2  h-full sm:h-[82vh] p-5 sm:p-16 space-y-6 ">
              <div className="font-primaryTypefaceJosefin  text-customWhite">
                <h1 className="text-3xl drop-shadow-sm  pl-1">
                  Welcome
                </h1>
                <h1 className="text-5xl sm:text-6xl ">{name}</h1>
                <p className="text-lg text-gray-400 font-secondaryTypefaceDmSans pl-1">
                  {designation}
                </p>
              </div>
              {/* ------ */}
              <div className="flex space-x-2 items-center  w-full sm:w-80 rounded-lg  text-customWhite bg-actionBlack">
                <div className="bg-primary h-14 w-10 flex justify-center items-center rounded-tl-lg rounded-bl-lg">
                  <img src="/icons/eventtypes.svg" className="px-2"></img>
                </div>
                <div>
                  <h2 className="font-secondaryTypefaceDmSans text-customWhite">
                    Total Assigned
                  </h2>
                  <h3 className="drop-shadow-md font-primaryTypefaceJosefin font-semibold text-white">
                    {totalRequests}
                  </h3>
                </div>
              </div>

              {/* ---- */}
              <div className="flex space-x-2 items-center  w-full sm:w-80 rounded-lg  text-customWhite bg-actionBlack">
                <div className="bg-primary h-14 w-10 flex justify-center items-center rounded-tl-lg rounded-bl-lg">
                  <img src="/icons/events.svg" className="px-2"></img>
                </div>
                <div>
                  <h2 className="font-secondaryTypefaceDmSans text-customWhite">
                    Pending
                  </h2>
                  <h3 className="drop-shadow-md font-primaryTypefaceJosefin font-semibold text-white">
                    {pendingRequests}
                  </h3>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 h-full sm:h-[82vh] p-5 sm:p-10 space-y-6">
              <h1 className="font-secondaryTypefaceDmSans text-xl text-white drop-shadow-sm">
                Choose an Option
              </h1>
              <Link href="/signer/authorize">
                <div className="flex space-x-2 items-center border-l-[14px] w-full sm:w-80 border-primary rounded-lg  text-customWhite bg-actionBlack cursor-pointer hover:text-primary hover:bg-Third duration-300">
                  <div className="py-5 px-3">
                    <h2 className="font-secondaryTypefaceDmSans ">
                      Authorize Event
                    </h2>
                  </div>
                </div>
              </Link>

              <Link href="/">
                <div className="flex space-x-2 items-center border-l-[14px] w-full sm:w-80 border-primary rounded-lg  text-customWhite bg-actionBlack cursor-pointer hover:text-primary hover:bg-Third duration-300">
                  <div className="py-5 px-3">
                    <h2 className="font-secondaryTypefaceDmSans ">
                      Track Event
                    </h2>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </>
      }
    />
  );
}

export default Dashboard;

export const getServerSideProps = async (ctx) => {
  console.log("AuthCheck getServerSideProps");
  try {
    console.log("Enterd AuthCheck");
    const cookies = nookies.get(ctx);

    console.log("Cookies: ", cookies);
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

    console.log(cookies.role);
    if (cookies.role == "super-admin") {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
    if (cookies.role == "signer") {
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
      const uid = token.uid;

      const userSnap = (
        await firebaseAdmin.firestore().collection("users").doc(uid).get()
      ).data();

      const name = userSnap.name;
      const designation = userSnap.designation;
      const requestSnap = await firebaseAdmin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("request")
        .get();
      let totalRequests = requestSnap.docs.length;
      let pendingRequests = requestSnap.docs.filter((doc) => {
        if (doc.data().signed == false) {
          return doc;
        }
      }).length;
      const message = cookies.message;
      const time = new Date().getTime().toString();
      console.log(message);
      console.log(time);
      // nookies.set(ctx, "message", "");

      return {
        props: {
          uid,
          name,
          designation,
          totalRequests,
          pendingRequests,
          message,
          time,
        },
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};
