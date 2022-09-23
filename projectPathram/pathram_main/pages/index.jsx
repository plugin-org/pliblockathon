import Link from "next/link";
import { useEffect, useState } from "react";
import { db, getDoc, doc } from "../firebase-app";
import RaisedButton from "../components/widgets/RaisedButton";
import InputWidget from "../components/widgets/InputWidget";
import RaisedButtonSecondary from "../components/widgets/RaisedButtonSecondary";
import TextButton from "../components/widgets/TextButton";
import Footer from "../components/Footer";
import BackdropWidget from "../components/widgets/BackdropWidget";
import SnackBarWidget from "../components/widgets/SnackBarWidget";
import Layout from "../components/Layout";

export default function Index({ eventId }) {
  const [loading, setLoading] = useState(false);
  const [trackId, setTrackId] = useState("");
  const [error, setError] = useState("");
  const [trackedEvent, setTrackedEvent] = useState({
    raisedBy: "",
    docId: "",
    status: "",
    signers: [],
    cid: "",
  });
  const [isTracked, setIsTracked] = useState(false);
  useEffect(() => {
    checkFirstTime();
  }, []);

  const checkFirstTime = async () => {
    if (eventId == undefined) {
      return;
    }
    setLoading(true);

    try {
      const eventRef = doc(db, "events", eventId);
      const eventDoc = await getDoc(eventRef);

      if (!eventDoc.exists()) {
        setError("Wrong Tracking ID");
        setLoading(false);
        return;
      }

      console.log(eventDoc.data());

      setTrackedEvent({
        raisedBy: eventDoc.get("raisedBy"),
        docId: eventDoc.get("id"),
        status: eventDoc.get("status"),
        signers: eventDoc.get("signed_up"),
        cid: eventDoc.get("cid"),
      });

      setLoading(false);
      setIsTracked(true);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const trackEventHandler = async () => {
    setIsTracked(false);
    if (eventId == undefined) {
    }

    if (trackId.length == 0) {
      setError("Enter Tracking ID.");
      return;
    }

    setLoading(true);

    try {
      const eventRef = doc(db, "events", trackId);
      const eventDoc = await getDoc(eventRef);

      if (!eventDoc.exists()) {
        setError("Wrong Tracking ID");
        setLoading(false);
        return;
      }

      console.log(eventDoc.data());

      setTrackedEvent({
        raisedBy: eventDoc.get("raisedBy"),
        docId: eventDoc.get("id"),
        status: eventDoc.get("status"),
        signers: eventDoc.get("signed_up"),
        remarks: eventDoc.get("remarks"),
      });

      setLoading(false);
      setIsTracked(true);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
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
          <div className=" bg-secondary">
            <div className=" flex flex-col sm:flex sm:flex-row text-gray-800 sm:h-[45rem] h-full ">
              <div className="sm:w-1/3 mt-10 sm:mt-20 w-full sm:pl-10 ">
                <div className="px-10 pb-5 text-customWhite">
                  <h1 className="text-2xl font-semibold font-primaryTypefaceJosefin ">
                    Welcome to
                  </h1>

                  <h1 className="text-5xl font-semibold mb-3 mt-1 font-primaryTypefaceJosefin sm:mb-4 ">
                    Pathram
                  </h1>
                  <p className=" border-l-4  pl-2 sm:mb-3 rounded-sm font-secondaryTypefaceDmSans border-primary ">
                    Document Management System Powered by XDC Network.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className=" w-5/6 bg-layerBlack bg-opacity-50  rounded-md px-8 py-6 space-y-4 flex flex-col justify-center">
                    <div className="flex items-center space-x-2">
                      <img src="/pen_icon.svg" alt="" />
                      <h2 className="text-customWhite">Enter Tracking ID.</h2>
                    </div>

                    <InputWidget
                      type="text"
                      placeholder="Ex.: 1660899291118"
                      value={trackId}
                      onChangeFunction={(e) => {
                        setTrackId(e.target.value.trim());
                      }}
                    />

                    <div className="flex items-center">
                      <div className="w-3/5">
                        <RaisedButton
                          buttonName="Track"
                          width="w-full"
                          onClickFunction={trackEventHandler}
                        />
                      </div>
                      <div className="w-2/5 flex justify-center">
                        <TextButton buttonName="Lost?" link="/support" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {isTracked ? (
                // Tracked Details
                <>
                  <div className=" sm:w-2/3  w-full sm:my-20 mt-10 flex justify-center  ">
                    <div className="sbar track-right-div w-5/6 bg-white border-8 border-secondary  font-secondaryTypefaceDmSans p-4 sm:p-8 max-h-[26rem] h-2/3 sm:h-full sm:max-h-full rounded-md text-lg">
                      <h1 className="font-normal font-primaryTypefaceJosefin border-b text-3xl drop-shadow-md mb-10">
                        Tracking Details
                      </h1>
                      <div className="w-full flex flex-col sm:flex-row">
                        <div className="w-full sm:w-1/2">
                          <h2>
                            <span className="text-gray-600 text-sm border-b">
                              Raised By:{" "}
                            </span>
                            <br />
                            <span className="text-3xl font-primaryTypefaceJosefin sm:text-3xl drop-shadow-md">
                              {trackedEvent.raisedBy}
                            </span>
                          </h2>
                          <h2>
                            <span className="text-gray-600 text-sm border-b">
                              ID:{" "}
                            </span>
                            <br />
                            <span className="text-3xl font-primaryTypefaceJosefin sm:text-3xl drop-shadow-md">
                              {trackedEvent.docId}
                            </span>
                          </h2>
                          <div className="">
                            <span className="text-gray-600 text-sm border-b">
                              Status:
                            </span>
                            <h2
                              className={`${
                                trackedEvent.status == "rejected"
                                  ? "text-red-500"
                                  : trackedEvent.status == "pending"
                                  ? "text-orange-500"
                                  : "text-green-500"
                              } font-primaryTypefaceJosefin text-3xl sm:text-3xl drop-shadow-md mb-6 uppercase `}
                            >
                              {trackedEvent.status}
                            </h2>
                            {trackedEvent.status == "rejected" ? (
                              <div className="font-primaryTypefaceJosefin text-customWhite mb-5 sm:mb-5">
                                <span className="text-gray-600 text-sm border-b">
                                  Reason for Rejection:
                                </span>
                                {console.log(trackedEvent.remarks)}
                                <p>{trackedEvent.remarks}</p>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                          {trackedEvent.status == "approved" ? (
                            <TextButton
                              buttonName="Click To View Acknowledgement"
                              link={`/viewAcknowledgement?ack=${trackedEvent.cid}`}
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="w-full sm:w-1/2">
                          {/*  */}

                          <section class="text-gray-600 body-font">
                            <div class="container  mx-auto flex flex-wrap">
                              <div class="flex flex-col flex-wrap w-full">
                                <div class="">
                                  {/*  */}
                                  {trackedEvent.signers.map((e) => {
                                    return (
                                      <div class="flex relative ">
                                        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                                          <div class="h-full w-px bg-gray-200 pointer-events-none"></div>
                                        </div>
                                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary inline-flex items-center justify-center text-secondary relative z-10">
                                          <img src="/pen_icon.svg" alt="" />
                                        </div>
                                        <div class="flex-grow pl-4 pb-10">
                                          <h2 class="font-medium title-font text-lg text-gray-800 font-primaryTypefaceJosefin">
                                            {e.name}
                                          </h2>
                                          <div className="flex space-x-2">
                                            <p class="text-xs text-gray-400">
                                              {e.designation}
                                            </p>
                                            <p class="text-xs text-gray-400">
                                              --{" "}
                                              {e.signed
                                                ? "Signed at " + e.signedAt
                                                : "Pending"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                                <div>
                                  {trackedEvent.status == "approved" ? (
                                    <img
                                      src="/Approved_Dasthavej.png"
                                      className="h-40 -rotate-[15deg]"
                                    />
                                  ) : (
                                    <></>
                                  )}
                                  {trackedEvent.status == "rejected" ? (
                                    <img
                                      src="/Rejected_Dasthavej.png"
                                      className="h-40 -rotate-[15deg]"
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                            </div>
                          </section>

                          {/*  */}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // Info Details
                <div className="sm:w-2/3 w-full   sm:my-20 mt-10 flex justify-center  ">
                  <div className="sbar track-right-div h-2/3 sm:h-full text-customWhite border-8 font-secondaryTypefaceDmSans  border-secondary rounded-md w-5/6 bg-layerBlack bg-opacity-50 space-y-6 sm:space-y-4  p-4 sm:p-8 max-h-[26rem] sm:max-h-full ">
                    <Link href="/about">
                      <div className="flex justify-end top-0 z-50 sticky sm:hidden">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 border-b -mb-6 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                          />
                        </svg>
                      </div>
                    </Link>

                    <div className="flex flex-row items-center space-x-2 py-6 ">
                      <div className="w-full sm:w-1/2 border-r-4 border-white  pr-2">
                        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-wide text-right text-primary font-primaryTypefaceJosefin">
                          NO
                        </h1>
                        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-wide text-right text-primary font-primaryTypefaceJosefin">
                          MORE 
                        </h1>
                      </div>

                      <div className="w-full sm:w-1/2 text-customWhite">
                        <ul>
                          <li className="font-semibold text-sm sm:text-base text-customWhite">
                            Forgery
                          </li>
                          <li className="font-semibold text-sm sm:text-base text-customWhite">
                            Paperwork
                          </li>
                          <li className="font-semibold text-sm sm:text-base text-customWhite">
                            Workforce
                          </li>
                          <li className="font-semibold text-sm sm:text-base text-customWhite">
                            Damage to Documents
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center">
                        <div>
                          <h2 className="text-2xl font-primaryTypefaceJosefin font-semibold text-heading_red mr-4">
                            How it works
                          </h2>
                        </div>
                        <div className="w-20 h-1 bg-gray-200 rounded-lg"></div>
                      </div>
                      <img
                        src="/index_story.svg"
                        className=" w-full sm:p-4 p-10"
                        alt=""
                      />
                      <div className="w-full  flex flex-col sm:flex sm:flex-row space-y-4 sm:space-y-0 mt-5">
                        <div className="w-full sm:w-1/3">
                          <p className=" border-l-4 border-customWhite pl-2 sm:mb-3 rounded-sm ">
                            <span className="uppercase font-extrabold text-sm text-white">
                              Step 1
                            </span>
                            <br />A person rasies a request by adding the
                            necessary requirements.
                          </p>
                        </div>
                        <div className="w-full sm:w-1/3">
                          <p className=" border-l-4 pl-2 sm:mb-3 border-customWhite rounded-sm ">
                            <span className="uppercase font-extrabold text-sm text-white">
                              Step 2
                            </span>
                            <br />
                            The signers either accept or reject the request.
                            Status can be tracked.
                          </p>
                        </div>
                        <div className="w-full sm:w-1/3">
                          <p className=" border-l-4 pl-2 sm:mb-3 border-customWhite rounded-sm ">
                            <span className="uppercase font-extrabold text-sm text-white">
                              Step 3
                            </span>
                            <br />
                            The notification regarding the status of request is
                            sent to the person who raised it.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <div>
                          <h2 className="text-2xl font-semibold font-primaryTypefaceJosefin text-heading_red mr-4">
                            What's in it?
                          </h2>
                        </div>
                        <div className="w-20 h-1 bg-gray-500 rounded-lg"></div>
                      </div>
                      <div>
                        <div>
                          <div className="flex flex-col sm:flex-row-reverse  ">
                            <img
                              src="/track.svg"
                              className="w-full  sm:w-1/4 p-10"
                              alt=""
                            />
                            <p className="text-justify sm:w-3/4 mt-4 sm:mr-4">
                              <span className="text-xl font-primaryTypefaceJosefin font-semibold text-heading_red">
                                Tracking
                              </span>
                              <br />

                              <p>
                                In the traditional procedure, it's tough to
                                track the progress of request raised. Dasthavej,
                                clears the clutter. Our solution can track every
                                detail of raised request. This makes it very
                                clear in addressing the delay which we usually
                                experience in the current procedure.
                              </p>
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="flex flex-col sm:flex-row  ">
                            <img
                              src="/xdc.svg"
                              className="w-full  sm:w-1/4 p-10"
                              alt=""
                            />
                            <p className="text-justify sm:w-3/4 mt-4 sm:ml-4">
                              <span className="text-xl font-primaryTypefaceJosefin font-semibold text-heading_red">
                                Blockchain
                              </span>
                              <br />
                              Every request is a transaction on blockchain.
                              Every user is an account on blockchain. This
                              technology makes our solution unique and leaves no
                              stone unturned in securing the application and the
                              procedure followed.
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="flex flex-col sm:flex-row-reverse  ">
                            <img
                              src="/multisig.svg"
                              className="w-full  sm:w-1/4 p-10"
                              alt=""
                            />
                            <p className="text-justify sm:w-3/4 mt-4 sm:mr-4">
                              <span className="text-xl font-primaryTypefaceJosefin font-semibold text-heading_red">
                                Multisignature Protocol
                              </span>
                              <br />
                              Every request as previously mentioned is a
                              transaction on blockchain ledger which is written
                              only after approval of corresponding
                              authenticators.
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="flex flex-col sm:flex-row  ">
                            <img
                              src="/ipfs.svg"
                              className="w-full  sm:w-1/4 p-10"
                              alt=""
                            />
                            <p className="text-justify sm:w-3/4 mt-4 sm:mr-4">
                              <span className="text-xl font-primaryTypefaceJosefin font-semibold text-heading_red">
                                Inter Planetary File System
                              </span>
                              <br />
                              Inter Planetary File System is an added advantage
                              to our application which makes the data completely
                              immutable. Every request is considered as a
                              transaction under a specific category. The
                              notification is sent to all the signers related to
                              that category Once all signs are done then the txn
                              is written to the ledger
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      }
    />
  );
}

export const getServerSideProps = async (ctx) => {
  const eventId = ctx.query.eventId;
  console.log(eventId);
  return {
    props: {
      eventId: eventId ?? null,
    },
  };
};
