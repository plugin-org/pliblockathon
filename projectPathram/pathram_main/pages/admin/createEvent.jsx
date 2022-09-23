import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
  query,
  collection,
  db,
  setDoc,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  increment,
} from "../../firebase-app";
import nookies from "nookies";

import { firebaseAdmin } from "../../firebase-admin";

import InputWidget from "../../components/widgets/InputWidget";
import RaisedButton from "../../components/widgets/RaisedButton";
import RaisedButtonSecondary from "../../components/widgets/RaisedButtonSecondary";
import TextAreaWidget from "../../components/widgets/TextAreaWidget";
import BackdropWidget from "../../components/widgets/BackdropWidget";
import SnackBarWidget from "../../components/widgets/SnackBarWidget";
import CircularProgressWidget from "../../components/widgets/CircularProgressWidget";
import { useRouter } from "next/router";

export default function Index({ uid }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [eventData, setEventData] = useState([]);
  const [selectedEventTypeId, setSelectedEventTypeId] = useState("");
  const [eventId, setEventId] = useState("");

  const router = useRouter();

  const getEventTypes = async () => {
    setLoading(true);
    const events = [];
    const q = query(collection(db, "event-type"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id != "count") {
        const user = doc.data();
        user.docID = doc.id;

        events.push(user);
      }
    });
    console.log(events);
    setEventData(events);
    setLoading(false);
  };

  useEffect(() => {
    getEventTypes();
  }, []);

  const createEvent = async () => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == false) {
      setError("Invalid Email");
      return;
    }
    if (raisedBy == "" || phoneNumber == "") {
      setError("Please fill all the fields");
      return;
    }
    setError("");
    setSeverity(3);
    let type_title = event.title,
      signers = event.signers,
      pubKey = event.publicKey,
      // secKey = event.secretKey,
      eventTypeID = event.docID,
      // totalUnsignedEvents = event.totalUnsignedEvents,
      ackIPFSTemplate = event.ackIPFSTemplate;

    console.log("EventID: ", eventId);
    let XDR, sequence;

    setLoading(true);
    // call to blockchain to create event
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      publicKey: pubKey,
      // secret: secKey,
      eventID: eventId
      // totalUnsignedEvents: totalUnsignedEvents || 0,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };


    try {
      const response = await fetch("/api/createEventXDC", requestOptions);
      // console.log(response.text());
      const res = JSON.parse(await response.text());
      sequence = res.seq;
      console.log();
      // console.log(res);
      // if (res.xdr == undefined || res.xdr == null) {
      //   setError("Cannot create event on blockchain");

      //   setLoading(false);
      //   return;
      // }
      // (XDR = res.xdr), (sequence = res.sequence);
      // console.log({
      //   XDR,
      //   sequence,
      // });
    } catch (error) {
      setError("Cannot create event on blockchain");
      console.log(error);


      setLoading(false);
      return;
    }

   

    // console.log(signers);

    try {
      const eventRef = doc(db, "events", eventId);

      const newSigners = signers.map((s) => {
        return { ...s, signed: false, signedAt: "" };
      });

      Object.keys(input).forEach((key) => {
        if (ackIPFSTemplate.fields.includes(key)) {
          ackIPFSTemplate.fields = ackIPFSTemplate.fields.replace(
            `${key}PLACEHOLDER`,
            input[key]
          );
        }
      });

      ackIPFSTemplate.fields =
        `<br><b>Event ID:</b>:${eventId}` + ackIPFSTemplate.fields;

      let cid = "";

      await setDoc(eventRef, {
        raisedBy: raisedBy, // applicant name
        email: email,
        phoneNumber: phoneNumber,
        completed: false,
        type: type_title,
        type_id: eventTypeID, //doc id
        signed_up: newSigners, //signers uid {Name,Email,signed:boolean}
        total_signers: newSigners.length,
        total_signed: 0,
        created_date: new Date().toUTCString(),
        id: eventId,
        status: "pending",
        imageUrls: fileUrls,
        remarks: "",
        requiredFieldsValues: input,
        cid: "", // ack
        // 'completed_date':'2020-01-01',
        adminUID: uid, //add
        sequence: parseInt(sequence),
        ackIPFSTemplate: ackIPFSTemplate,
        hierarchy: event.hierarchy
      });

      // send email to user on succesfull event creation

      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          TO: email,
          eventId: eventId,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        let secretHash;

        await fetch("/api/mails/sendEmailEventCreation", requestOptions)
          .then((response) => response.text())
          .then((result) => {})
          .catch((error) => {
            setError("");
          });
      } catch (error) {}

      const eventTypeRef = doc(db, "event-type", eventTypeID);
      await updateDoc(eventTypeRef, {
        totalUnsignedEvents: increment(1),
      });
      // const eventTypeSnap = await getDocs(eventTypeRef);
      // console.log(eventTypeSnap.data());
      // const ackOfEvent = doc(db, "event-type", eventTypeID, "ackIPFSTemplate");
      // console.log(ackOfEvent);
      const countRef = doc(db, "events", "count");
      await updateDoc(countRef, {
        total: increment(1),
      });

      let userEventsRef;
      newSigners.forEach(async (signer) => {
        userEventsRef = doc(db, "users", signer.uid, "request", eventId);
        await setDoc(userEventsRef, {
          document_id: eventId,
          signed: false,
          created_at: new Date().toUTCString(),
          sequence: parseInt(sequence),
          rank: signer.rank,
        });

        // send email to signer
        try {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            TO: signer.email,
            eventId: eventId,
            raisedBy: raisedBy,
          });

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          let secretHash;

          await fetch("/api/mails/sendEmailtoSignersofNewEvent", requestOptions)
            .then((response) => response.text())
            .then((result) => {})
            .catch((error) => {
              setError("");
            });
        } catch (error) {}

        console.log("Added to user request");
      });
      setSeverity(1);
      setError("Event Created Successfully");
      setIsEventSelected(false);
      router.replace("/admin");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const [isEventSelected, setIsEventSelected] = useState(false);
  const [event, setEvent] = useState({});
  const [fileUrls, setFileUrls] = useState({});
  const [input, setInput] = useState({});
  const [severity, setSeverity] = useState(3);
  const [raisedBy, setRaisedBy] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onChangeEventTypeHandler = (e) => {
    setSelectedEventTypeId(e.target.value);
    console.log(e.target.value);
    if (e.target.value == "") {
      setIsEventSelected(false);
      return;
    }
    const id = new Date().getTime().toString();
    console.log(id);
    setEventId(id);
    const eventType = eventData.filter((event) => {
      return event.docID == e.target.value;
    })[0];
    const files = {};
    eventType.filesFields.forEach((f) => {
      files[f] = "";
    });
    const inp = {};
    eventType.requiredFields.forEach((f) => {
      inp[f] = "";
    });
    setInput(inp);
    setFileUrls(files);
    setEvent(eventType);
    console.log(eventType);
    setIsEventSelected(true);
  };

  const [progressPercent, setProgressPercent] = useState(0);

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
          <div className="w-full flex flex-col sm:flex-row bg-secondary">
            <div className="w-full sm:w-1/2 flex flex-col items-center  space-y-2 p-10 sm:px-20 sm:py-10">
              <h1 className=" text-primary font-primaryTypefaceJosefin w-full text-left text-2xl">
                Create Event
              </h1>
              <div className="w-full">
                <h1 className="text-customWhite font-secondaryTypefaceDmSans">
                  Choose Event Type
                </h1>
                <select
                  className="outline-none   text-customWhite focus:shadow-md px-4 py-2 border border-gray-100 rounded-md transition duration-200 focus:scale-100 text-customBlack bg-actionBlack w-full"
                  value={selectedEventTypeId}
                  onChange={onChangeEventTypeHandler}
                >
                  <option value="">Select Event</option>

                  {eventData.map((eventType) => (
                    <option value={eventType.docID}>{eventType.title}</option>
                  ))}
                </select>
              </div>

              <div
                className={`${
                  isEventSelected ? "block" : "hidden"
                } w-full space-y-2`}
              >
                <h1 className="text-xl text-primary font-primaryTypefaceJosefin mt-10">
                  Enter the details below
                </h1>
                <InputWidget
                  onChangeFunction={(e) => setRaisedBy(e.target.value)}
                  placeholder="Name"
                  type="text"
                  value={raisedBy}
                />
                <InputWidget
                  onChangeFunction={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                  value={email}
                />
                <InputWidget
                  onChangeFunction={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  type="text"
                  value={phoneNumber}
                />
                {isEventSelected ? (
                  <div className="space-y-2">
                    {event.requiredFields.map((field) => (
                      <div>
                        <label className="text-customWhite text-sm font-primaryTypefaceJosefin">
                          {field}
                        </label>
                        <InputWidget
                          placeholder={field}
                          value={input[field]}
                          onChangeFunction={(e) => {
                            setInput((fields) => ({
                              ...fields,
                              [field]: e.target.value,
                            }));
                            console.log(input);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {isEventSelected ? (
              <div className="w-full sm:w-1/2 p-10">
                <div
                  className={`${
                    event.filesFields.length > 0 ? "block" : "hidden"
                  } space-y-2 `}
                >
                  <h1 className="text-primary font-primaryTypefaceJosefin text-xl">
                    Attachments
                  </h1>
                  {event.filesFields.map((field) => (
                    <div className="space-x-4 w-full flex items-center">
                      <div className="w-1/3">
                        <label className="text-customBlack text-sm font-primaryTypefaceJosefin ">
                          {field}
                        </label>
                      </div>
                      <div className="w-2/3">
                        <input
                          type="file"
                          className="w-full"
                          onChange={async (event) => {
                            setLoading(true);
                            const f = event.target.files[0];
                            const storageRef = ref(
                              storage,
                              `files/${eventId}/${f.name}`
                            );
                            setProgressPercent(0);
                            const uploadTask = uploadBytesResumable(
                              storageRef,
                              f
                            );
                            await new Promise((resolve, reject) => {
                              uploadTask.on(
                                "state_changed",
                                (snapshot) => {
                                  const progress =
                                    (snapshot.bytesTransferred /
                                      snapshot.totalBytes) *
                                    100;

                                  console.log(progress);
                                  setProgressPercent(progress);
                                },
                                (error) => {
                                  reject(error);
                                  setError(error);
                                },
                                () => {
                                  getDownloadURL(uploadTask.snapshot.ref).then(
                                    (downloadURL) => {
                                      // setImageUrl(downloadURL);
                                      setFileUrls((fields) => ({
                                        ...fields,
                                        [field]: downloadURL,
                                      }));
                                      resolve();
                                    }
                                  );
                                }
                              );
                            });

                            setLoading(false);
                          }}
                          multiple={false}
                        />
                      </div>
                    </div>
                  ))}
                  {/* loader */}
                  <CircularProgressWidget progress={progressPercent} />
                </div>
                <div
                  className={`${
                    event.filesFields.length > 0 ? "block" : "hidden"
                  } space-y-2 mt-10 text-customBlack`}
                >
                  <h1 className="text-primary font-primaryTypefaceJosefin text-xl">
                    Uploaded Files
                  </h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {event.filesFields.map((field) => {
                      if (fileUrls[field] != "") {
                        return (
                          <div className="space-x-4">
                            <a href={fileUrls[field]} target="_blank">
                              <img
                                src={fileUrls[field]}
                                className="h-48"
                                alt="Click Here to View"  
                                srcset=""
                              />
                            </a>
                            <h1>{field}</h1>
                          </div>
                        );
                      } else {
                        return (
                          <div className="h-48 flex items-center justify-center bg-Third ">
                            <h1 className="">{field} Not Uploaded</h1>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
                <div className="mt-4 w-full flex flex-row space-x-2">
                  <RaisedButton
                    buttonName="Submit"
                    onClickFunction={createEvent}
                    width="w-full"
                  />
                  <RaisedButtonSecondary
                    buttonName="Cancel"
                    width="w-full"
                    link="/admin"
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
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
    const role = cookies.role.toString();

    if (cookies.role == "super-admin") {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }

    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const uid = token.uid;
    console.log(role);

    if (role == "Admin") {
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
