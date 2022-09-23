import Layout from "../../components/Layout";

import { useState } from "react";
import { useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import {
  getDocs,
  query,
  db,
  where,
  collection,
  limit,
} from "../../firebase-app";
import BackdropWidget from "../../components/widgets/BackdropWidget";
import SnackBarWidget from "../../components/widgets/SnackBarWidget";

import nookies from "nookies";
import { firebaseAdmin } from "../../firebase-admin";
import Link from "next/link";

const options = ["View", "Track"];

const ITEM_HEIGHT = 48;

function ViewEvents({ uid, eventTypes }) {
  console.log(eventTypes);
  const [eventType, setEventType] = useState("all");
  const [status, setStatus] = useState("all");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const filter = async () => {
    console.log({
      eventType,
      status,
    });
    setLoading(true);

    const whereConditions = [where("adminUID", "==", uid)];
    if (eventType != "all") {
      whereConditions.push(where("type", "==", eventType));
    }

    if (status != "all") {
      whereConditions.push(where("status", "==", status));
    }
    console.log(whereConditions);
    try {
      const q = query(collection(db, "events"), ...whereConditions, limit(10));
      const snapshot = await getDocs(q);
      setEvents(snapshot.docs);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
    // we get the data
  };

  useEffect(() => {
    filter();
  }, []);

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
          <div>
            <div className=" py-10 px-4 sm:px-20 bg-secondary">
              <div className="flex sm:justify-between space-y-2 sm:items-center sm:flex-row flex-col ">
                <h1 className="font-primaryTypefaceJosefin text-4xl text-primary mb-5 sm:mb-0">
                  View Events
                </h1>
                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center text-customWhite  sm:space-x-2">
                  <h2 className="text-xl font-secondaryTypefaceDmSans text-primary">
                    Filter:
                  </h2>
                  {/* <div className="flex flex space-x-4 items-center"> */}
                  <select
                    className="outline-none   focus:shadow-md px-4 py-2 border border-gray-100 rounded-md transition duration-200 focus:scale-100 text-customWhite bg-secondary w-full"
                    value={eventType}
                    onChange={(e) => {
                      setEventType(e.target.value);
                    }}
                  >
                    <option value="all">Event Type</option>

                    {eventTypes.map((eventType) => (
                      <option value={eventType.title}>{eventType.title}</option>
                    ))}
                  </select>
                  <select
                    className="outline-none   focus:shadow-md px-4 py-2 border border-gray-100 rounded-md transition duration-200 focus:scale-100 text-customWhite bg-secondary w-full"
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    <option value="all">Status</option>

                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>

                    {/* {eventData.map((eventType) => (
                      <option value={eventType.docID}>{eventType.title}</option>
                    ))} */}
                  </select>
                  <div
                    className="flex justify-center bg-Third p-2 rounded-sm hover:bg-secondary shadow-sm"
                    onClick={filter}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    {/* </div> */}
                  </div>
                </div>
              </div>
              <br />

              <div
                className={` grid-cols-1 sm:grid-cols-3 gap-4 w-full ${
                  loading ? "hidden" : "grid"
                }`}
              >
                {events.map((event, ind) => (
                  <div className={`rounded-md flex border-l-[30px] ${event.data().status=="approved"?"border-primary":event.data().status=="pending"?"border-orange-400":"border-red-400"}  bg-secondary w-full`}>
                    <div className="w-full font-secondaryTypefaceDmSans px-5 py-4 sm:py-8">
                      <h1 className="text-primary font-primaryTypefaceJosefin">
                        {event.data().raisedBy}
                      </h1>
                      <div className="flex sm:justify-between flex-col  text-xs w-full ">
                        <h1>{event.data().type}</h1>
                        <h2>
                          <span className="font-semibold">Status:</span>{" "}
                          {event.data().status}
                        </h2>
                        <h2>
                          <span className="font-semibold">Created At: </span>
                          {event.data().created_date}
                        </h2>
                      </div>
                    </div>
                    <div className="w-20 ">
                      <Tooltip title="View" placement="left">
                        <Link
                          href={`/admin/viewSingleEvent?eventID=${
                            event.data().id
                          }`}
                        >
                          <div className="h-1/2 bg-Third rounded-tr-md flex items-center justify-center cursor-pointer hover:bg-transparent duration-300">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-customWhite "
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                              />
                            </svg>
                          </div>
                        </Link>
                      </Tooltip>
                      <Tooltip title="Track" placement="left">
                        <Link href={`/?eventId=${event.data().id}`}>
                          <div className="h-1/2  rounded-br-md flex items-center justify-center cursor-pointer duration-300 hover:bg-white">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-primary "
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                              />
                            </svg>
                          </div>
                        </Link>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}

export default ViewEvents;

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
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
      const uid = token.uid;

      const events = (
        await firebaseAdmin.firestore().collection("event-type").get()
      ).docs;
      const eventTypes = [];
      events.forEach((event) => {
        if (event.id != "count") {
          const data = event.data();
          data.id = event.id;
          eventTypes.push(data);
        }
      });
      console.log(eventTypes);
      return {
        props: { uid, eventTypes },
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
