import Layout from "../components/Layout";
import Link from "next/link";
import nookies from "nookies";
import { useEffect, useState } from "react";
import { doc, db, getDoc } from "../firebase-app";
import BackdropWidget from "../components/widgets/BackdropWidget";

function Home() {
  const [dashboardDetails, setDashboardDetails] = useState({
    totalUsers: 0,
    totalEventTypes: 0,
    totalEvents: 0,
    desc: "",
    name: "",
  });

  const [fetching, setFetching] = useState(true);

  const fetchDashboardData = async () => {
    const temp = {
      totalUsers: 0,
      totalEventTypes: 0,
      totalEvents: 0,
      desc: "",
      name: "",
    };

    // getting users count
    const userCountRef = doc(db, "users", "count");
    const userDoc = await getDoc(userCountRef);
    temp.totalUsers = userDoc.get("total");

    // getting event types count
    const eventTypesCountRef = doc(db, "event-type", "count");
    const eventTypeDoc = await getDoc(eventTypesCountRef);
    temp.totalEventTypes = eventTypeDoc.get("total");

    // getting events count
    const eventsCountRef = doc(db, "events", "count");
    const eventsDoc = await getDoc(eventsCountRef);
    temp.totalEvents = eventsDoc.get("total");

    // getting organisation data
    const orgRef = doc(db, "organisation", "data");
    const orgData = await getDoc(orgRef);
    temp.desc = orgData.get("desc");
    temp.name = orgData.get("name");
    console.log(temp);
    setDashboardDetails(temp);
    setFetching(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  return (
    <>
      <BackdropWidget open={fetching} />
      <div className="flex flex-col sm:flex-row bg-secondary">
        <div className="w-full sm:w-1/2 h-full sm:h-[35rem] p-5 sm:p-10 space-y-6">
          <div className="font-primaryTypefaceJosefin text-customBlack">
            <h1 className="text-3xl drop-shadow-sm text-customWhite pl-1">
              Welcome to
            </h1>
            <h1 className="text-5xl sm:text-6xl text-customWhite">
              {dashboardDetails.name}
            </h1>
            <p className="text-lg text-gray-400 font-secondaryTypefaceDmSans pl-1">
              {dashboardDetails.desc}
            </p>
          </div>
          {/* ------ */}
          <div className="flex space-x-2 items-center bg-actionBlack w-full sm:w-80 rounded-lg  text-customBlack">
            <div className="bg-primary h-14 w-10 flex justify-center items-center rounded-tl-lg rounded-bl-lg">
              <img src="/icons/users.svg" className="px-2"></img>
            </div>
            <div>
              <h2 className="font-secondaryTypefaceDmSans text-white">
                Total Users
              </h2>
              <h3 className="drop-shadow-md font-primaryTypefaceJosefin font-semibold text-customWhite">
                {dashboardDetails.totalUsers}
              </h3>
            </div>
          </div>
          {/* ---- */}
          <div className="flex space-x-2 items-center  w-full sm:w-80 rounded-lg  text-customBlack bg-actionBlack">
            <div className="bg-primary h-14 w-10 flex justify-center items-center rounded-tl-lg rounded-bl-lg">
              <img src="/icons/eventtypes.svg" className="px-2"></img>
            </div>
            <div>
              <h2 className="font-secondaryTypefaceDmSans text-white">
                Total Event Types
              </h2>
              <h3 className="drop-shadow-md text-customWhite font-primaryTypefaceJosefin font-semibold">
                {dashboardDetails.totalEventTypes}
              </h3>
            </div>
          </div>
          {/* ---- */}
          <div className="flex space-x-2 items-center  w-full sm:w-80 rounded-lg  text-customBlack bg-actionBlack">
            <div className="bg-primary h-14 w-10 flex justify-center items-center rounded-tl-lg rounded-bl-lg">
              <img src="/icons/events.svg" className="px-2"></img>
            </div>
            <div>
              <h2 className="font-secondaryTypefaceDmSans text-white">
                Total Events
              </h2>
              <h3 className="drop-shadow-md font-primaryTypefaceJosefin font-semibold text-customWhite">
                {dashboardDetails.totalEvents}
              </h3>
            </div>
          </div>
          {/* ---- */}
        </div>
        <div className="ww-full sm:w-1/2 h-full sm:h-[35rem] p-5 sm:p-10 space-y-6">
          <h1 className="font-secondaryTypefaceDmSans text-xl text-white drop-shadow-sm">
            Choose an Option
          </h1>
          {/* ----- */}
          <Link href="/adduser">
            <div className="flex space-x-2 items-center border-l-[14px] w-full sm:w-80 border-primary rounded-lg  text-customWhite bg-actionBlack cursor-pointer hover:text-primary hover:bg-Third duration-300">
              <div className="py-5 px-3">
                <h2 className="font-secondaryTypefaceDmSans ">Add User</h2>
              </div>
            </div>
          </Link>
          {/* ----- */}
          <Link href="/edit/editUser">
            <div className="flex space-x-2 items-center border-l-[14px] w-full sm:w-80 border-primary rounded-lg  text-customWhite bg-actionBlack cursor-pointer hover:text-primary hover:bg-Third duration-300">
              <div className="py-5 px-3">
                <h2 className="font-secondaryTypefaceDmSans ">Edit User</h2>
              </div>
            </div>
          </Link>
          {/* ------- */}
          <Link href="/addeventtype">
            <div className="flex space-x-2 items-center border-l-[14px] w-full sm:w-80 border-primary rounded-lg  text-customWhite bg-actionBlack cursor-pointer hover:text-primary hover:bg-Third duration-300">
              <div className="py-5 px-3">
                <h2 className="font-secondaryTypefaceDmSans ">
                  Create Event Type
                </h2>
              </div>
            </div>
          </Link>
          {/* ----- */}
          <Link href="/edit/editEventType">
            <div className="flex space-x-2 items-center border-l-[14px] w-full sm:w-80 border-primary rounded-lg  text-customWhite bg-actionBlack cursor-pointer hover:text-primary hover:bg-Third duration-300">
              <div className="py-5 px-3">
                <h2 className="font-secondaryTypefaceDmSans ">
                  Edit Event Type
                </h2>
              </div>
            </div>
          </Link>
          {/* -------- */}

          <Link href="/usersResetPassword">
            <div className="flex space-x-2 items-center border-l-[14px] w-full sm:w-80 border-primary rounded-lg  text-customWhite bg-actionBlack cursor-pointer hover:text-primary hover:bg-Third duration-300">
              <div className="py-5 px-3">
                <h2 className="font-secondaryTypefaceDmSans ">
                  Password Reset Requests
                </h2>
              </div>
            </div>
          </Link>

          {/* -------- */}
        </div>
      </div>
    </>
  );
}

export default function Index() {
  return <Layout Component={<Home />} />;
}

export const getServerSideProps = async (ctx) => {
  console.log("AuthCheck getServerSideProps");

  try {
    console.log("Enterd AuthCheck");
    const cookies = nookies.get(ctx);
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
    console.log(err);
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};
