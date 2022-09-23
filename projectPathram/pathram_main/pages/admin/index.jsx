import Link from "next/link";
import Layout from "../../components/Layout";
import nookies from "nookies";
import { firebaseAdmin } from "../../firebase-admin";
import { useEffect, useState } from "react";
import {
  db,
  doc,
  getDoc,
  getDocs,
  where,
  query,
  collection,
} from "../../firebase-app";
import BackdropWidget from "../../components/widgets/BackdropWidget";
import SnackBarWidget from "../../components/widgets/SnackBarWidget";
import { useRouter } from "next/router";

function Dashboard({ uid }) {
  const [user, setUser] = useState({
    name: "",
    designation: "",
    totalEvents: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchData = async () => {
    // const userSnap = (
    //   await firebaseAdmin.firestore().collection("users").doc(uid).get()
    // ).data();

    const userRef = doc(db, "users", uid);
    const userSnap = (await getDoc(userRef)).data();

    console.log(userSnap);

    const name = userSnap.name;
    const designation = userSnap.designation;

    // const eventSnap = (
    //   await firebaseAdmin
    //     .firestore()
    //     .collection("events")
    //     .where("adminUID", "==", uid)
    //     .get()
    // ).docs;

    const eventQuery = query(
      collection(db, "events"),
      where("adminUID", "==", uid)
    );
    const eventSnap = (await getDocs(eventQuery)).docs;

    console.log(eventSnap.length);

    const totalEvents = eventSnap.length;
    let approved = 0,
      pending = 0,
      rejected = 0;

    eventSnap.forEach((doc) => {
      if (doc.data().status == "approved") {
        approved += 1;
      } else if (doc.data().status == "pending") {
        pending += 1;
      } else {
        rejected += 1;
      }
    });

    setUser({
      name: name,
      designation: designation,
      totalEvents: totalEvents,
      approved: approved,
      pending: pending,
      rejected: rejected,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateReport = async () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      admin_uid: uid,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let link;
    try {
      await fetch("/api/reportCSVDownload", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const res = JSON.parse(result);
          console.log(res);
          link = res.link;
          router.push(link);
          // cons   t url = new URL(link);
          // router.push(url);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      setError("Cannot generate report. Try again later.");
    }
    setLoading(false);
  };

  return (
    <Layout
      Component={
        <>
          <BackdropWidget open={loading} />
          <SnackBarWidget
            severityNumber={3}
            handleClose={() => setError("")}
            message={error}
            open={error.length > 0}
          />
          <div
            className={`${
              loading ? "hidden" : "flex"
            } flex-col sm:flex-row bg-secondary`}
          >
            <div className="w-full  sm:w-1/2 h-full sm:h-[82vh] p-5 sm:p-16 space-y-6">
              <div className="font-primaryTypefaceJosefin text-customBlack">
                <h1 className="text-3xl drop-shadow-sm text-primary pl-1">
                  Welcome
                </h1>
                <h1 className="text-5xl sm:text-6xl text-primary">
                  {user.name}
                </h1>
                <p className="text-lg text-gray-400 font-secondaryTypefaceDmSans pl-1">
                  {user.designation}
                </p>
              </div>
              {/* ------ */}
              <div className="flex space-x-2 items-center  w-full sm:w-80 rounded-lg  text-customBlack bg-actionBlack">
                <div className="bg-primary h-14 w-10 flex justify-center items-center rounded-tl-lg rounded-bl-lg">
                  <img src="/icons/events.svg" className="px-2"></img>
                </div>
                <div>
                  <h2 className="font-secondaryTypefaceDmSans text-gray-500">
                    Total Events
                  </h2>
                  <h3 className="drop-shadow-md font-primaryTypefaceJosefin font-semibold text-customWhite">
                    {user.totalEvents}
                  </h3>
                </div>
              </div>
              {/* ---- */}
              <div className="flex space-x-2 items-center border w-full sm:w-80 rounded-lg  text-customBlack bg-secondary">
                <div className="grid grid-cols-3 w-full p-2">
                  <div className=" flex flex-col items-center border-r-4 border-white">
                    <h2 className="font-secondaryTypefaceDmSans text-customWhite">
                      Approved
                    </h2>
                    <h3 className="drop-shadow-md font-primaryTypefaceJosefin font-semibold text-white">
                      {user.approved}
                    </h3>
                  </div>
                  <div className=" flex flex-col items-center border-r-4 border-white">
                    <h2 className="font-secondaryTypefaceDmSans text-customWhite">
                      Rejected
                    </h2>
                    <h3 className="drop-shadow-md font-primaryTypefaceJosefin font-semibold text-white">
                      {user.rejected}
                    </h3>
                  </div>
                  <div className=" flex flex-col items-center">
                    <h2 className="font-secondaryTypefaceDmSans text-customWhite">
                      Pending
                    </h2>
                    <h3 className="drop-shadow-md font-primaryTypefaceJosefin font-semibold text-white">
                      {user.pending}
                    </h3>
                  </div>
                </div>
              </div>
              {/* ---- */}

              {/* ---- */}
            </div>
            <div className="w-full sm:w-1/2 h-full sm:h-[82vh] p-5 sm:p-10 space-y-6">
              <h1 className="font-secondaryTypefaceDmSans text-xl text-white drop-shadow-sm">
                Choose an Option
              </h1>
              <Link href="/admin/createEvent">
                <div className="flex space-x-2 items-center border-l-[14px] w-full sm:w-80 border-primary rounded-lg  text-customBlack bg-actionBlack cursor-pointer hover:text-primary text-customWhite duration-300">
                  <div className="py-5 px-3">
                    <h2 className="font-secondaryTypefaceDmSans ">Add Event</h2>
                  </div>
                </div>
              </Link>

              <Link href="/">
                <div className="flex space-x-2 items-center border-l-[14px] w-full sm:w-80 border-primary rounded-lg  text-customBlack bg-actionBlack cursor-pointer hover:text-primary text-customWhite duration-300">
                  <div className="py-5 px-3">
                    <h2 className="font-secondaryTypefaceDmSans ">
                      Track Event
                    </h2>
                  </div>
                </div>
              </Link>

              <Link href="/admin/viewEvents">
                <div className="flex space-x-2 items-center border-l-[14px] w-full sm:w-80 border-primary rounded-lg  text-customBlack bg-actionBlack cursor-pointer hover:text-primary text-customWhite duration-300">
                  <div className="py-5 px-3">
                    <h2 className="font-secondaryTypefaceDmSans ">
                      View All Events
                    </h2>
                  </div>
                </div>
              </Link>
              {/* <div
                onClick={generateReport}
                className="flex space-x-2 items-center border-l-[14px] w-full sm:w-80 border-primary rounded-lg  text-customBlack bg-secondary cursor-pointer hover:text-primary hover:bg-white duration-300"
              >
                <div className="py-5 px-3">
                  <h2 className="font-secondaryTypefaceDmSans ">
                    Generate Report
                  </h2>
                </div>
              </div> */}
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
    if (cookies.role == "super-admin") {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }

    if (cookies.role == "Admin") {
      console.log("Entered ");
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
      const uid = token.uid;
      console.log(uid);

      // console.log({
      //   totalEvents,
      //   approved,
      //   rejected,
      //   pending,
      //   name,
      //   designation,
      // });

      return {
        props: { uid },
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
