import { Autocomplete, TextField } from "@mui/material";
import nookies from "nookies";
import { useEffect, useState } from "react";
import ConfirmModalComponent from "../../components/ConfirmModalComponent";
import Layout from "../../components/Layout";
import ModalComponent from "../../components/ModalComponent";
import BackdropWidget from "../../components/widgets/BackdropWidget";
import InputWidget from "../../components/widgets/InputWidget";
import RaisedButton from "../../components/widgets/RaisedButton";
import RaisedButtonSecondary from "../../components/widgets/RaisedButtonSecondary";
import SnackBarWidget from "../../components/widgets/SnackBarWidget";
import TextAreaWidget from "../../components/widgets/TextAreaWidget";
import {
  collection,
  getDocs,
  doc,
  db,
  query,
  setDoc,
  updateDoc,
  increment,
} from "../../firebase-app";

function EditEventType() {
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ack, setAck] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newField, setNewField] = useState("");
  const [selectedFields, setSelectedFields] = useState({
    "AADHAR CARD": false,
    "PAN CARD": false,
    "APPLICANT NAME": false,
    "APPLICANT CONTACT NUMBER": false,
    "APPLICANT ADDRESS": false,
    "APPLICANT ISSUE": false,
    "APPLICANT DOB": false,
  });
  const [severity, setSeverity] = useState(3);
  const [modalOpen, setModalOpen] = useState(false);
  const [ackFields, setAckFields] = useState([]);
  const [isEventSelected, setIsEventSelected] = useState(false);
  const [fieldsList, setFieldsList] = useState({});

  useEffect(() => {
    getEventTypes();
  }, []);

  const getEventTypes = async () => {
    setLoading(true);
    const allEvents = [];
    const q = query(collection(db, "event-type"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id != "count") {
        const eventType = {
          ack: doc.data().ack,
          ackFields: doc.data().ackFields,
          description: doc.data().description,
          requiredFields: doc.data().requiredFields,
          title: doc.data().title,
          docID: doc.id,
        };
        allEvents.push(eventType);
      }
    });
    console.log(allEvents);
    setEventTypes(allEvents);
    setLoading(false);
  };

  const checkRequiredFieldsSelection = () => {
    Object.keys(fieldsList).forEach((key) => {
      if (fieldsList[key]) {
        return true;
      }
    });

    return false;
  };

  const updateEventType = async () => {
    if (
      title.trim().length == 0 ||
      description.trim().length == 0 ||
      ack.trim().length == 0 ||
      checkRequiredFieldsSelection() ||
      ackFields.length == 0
    ) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    //
    const checkedFields = Object.keys(fieldsList).filter((key) => {
      if (fieldsList[key]) {
        return key;
      }
    });

    //

    setSeverity(3);

    //end
    try {
      const ACK = {
        template: ack,
        fields: "",
      };

      console.log(ack);

      let str = "";
      ackFields.forEach((fieldName) => {
        str += `<br><b>${fieldName}</b>:${fieldName}PLACEHOLDER`;
      });
      str += `<br><br><img scr="https://dasthavej-main.vercel.app/logo.svg">`;
      console.log(ack);
      ACK.fields = str;
      const eventTypeRef = doc(db, "event-type", selectedEventTypeId);
      await updateDoc(eventTypeRef, {
        title: title.trim(),
        description: description,
        ack: ack,
        requiredFields: checkedFields,
        ackFields: ackFields,
        ackIPFSTemplate: ACK,
        filesFields: filesFields,
      });

      // incrementing documents count

      setSeverity(1);
      setError("Event Type Updated Successfully.");

      const updatedEventTypes = eventTypes.filter((eventType) => {
        if (eventType.docID != selectedEventTypeId) {
          return eventType;
        }
      });

      setEventTypes(updatedEventTypes);

      setLoading(false);
      setTitle("");
      setDescription("");
      setAck("");
      setIsEventSelected(false);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  // const fields = ;

  const onSelectFields = (fieldName) => {
    setFieldsList((fields) => ({
      ...fields,
      [fieldName]: !fields[fieldName],
    }));
  };

  const [selectedEventTypeId, setSelectedEventTypeId] = useState("");
  const [filesFields, setFilesFields] = useState([]);

  const onChangeEventTypeHandler = (e) => {
    setSelectedEventTypeId(e.target.value);
    console.log(e.target.value);
    if (e.target.value == "") {
      setIsEventSelected(false);
      return;
    }
    const eventType = eventTypes.filter((event) => {
      return event.docID == e.target.value;
    })[0];
    setTitle(eventType.title);
    setDescription(eventType.description);
    setFilesFields(eventType.filesFields);
    //

    //
    setAck(eventType.ack);
    setAckFields(eventType.ackFields);
    const newMap = {
      "AADHAR CARD": false,
      "PAN CARD": false,
      "APPLICANT NAME": false,
      "APPLICANT CONTACT NUMBER": false,
      "APPLICANT ADDRESS": false,
      "APPLICANT ISSUE": false,
      "APPLICANT DOB": false,
    };
    eventType.requiredFields.forEach((f) => {
      newMap[f] = true;
    });
    setFieldsList(newMap);
    setIsEventSelected(true);
  };

  return (
    <Layout
      Component={
        <>
          <ConfirmModalComponent
            cancelOnClick={() => {
              setModalOpen(false);
            }}
            title="Do you want to Create Event Type?"
            confirmOnClick={() => {
              setModalOpen(false);
              //   addEventType();
              updateEventType();
            }}
            openModal={modalOpen}
          />
          <SnackBarWidget
            severityNumber={severity}
            handleClose={() => setError("")}
            message={error}
            open={error.length > 0}
          />
          <BackdropWidget open={loading} />
          <ModalComponent
            openModal={openModal}
            closeModal={() => {
              setOpenModal(!openModal);
            }}
            value={newField}
            onChange={(e) => {
              setNewField(e.target.value.toUpperCase());
            }}
            onSubmit={() => {
              setFieldsList((fields) => ({
                ...fields,
                [newField]: true,
              }));
              setNewField("");
              setOpenModal(false);
            }}
          />
          <div className="w-full bg-secondary flex flex-col-reverse sm:flex-row">
            <div className="w-full sm:w-1/2 my-5 space-y-2 p-10 sm:p-20 text-justify font-secondaryTypefaceDmSans text-sm text-customBlack">
              <h1 className="text-primary font-primaryTypefaceJosefin text-2xl">
                Event Type and Event in Dasthavej
              </h1>
              <p className="text-customWhite">
                Event Type here refers to a templated schema for a document,
                which requires signatures of a particular{" "}
                <b>set of officials</b> to be accepted as a legitimate record.
                This can be technically referred to as Class. Event is the
                object of the Event Type class.
              </p>
              <p className="text-customWhite">
                Every Event Type is an <b>account in the blockchain</b> enabled
                with <b>multisignature protocol</b> which is the crux of our
                solution.
              </p>
              <p className="text-customWhite">
                Every Event is a transaction under the corresponding Event Type
                account which is added to the ledger only after a certain
                threshold of signatures is reached.
              </p>

              <h1 className="text-primary font-primaryTypefaceJosefin text-2xl pt-5">
                Event Type Addition Flow
              </h1>
              <div>
                <img src="/addEventType.svg" alt="" srcset="" />
              </div>
              <h1 className="text-primary font-primaryTypefaceJosefin text-xl pt-5">
                What happens when you add event type?
              </h1>
              <div className="text-xs text-customWhite">
                <p>1. Data is sent to server which executes further process.</p>
                <p>
                  2. A Keypair on Blockchain is generated and Account is funded
                  and created.
                </p>
                <p>
                  3. The generated account is multisigned with the selected
                  signers for Event Type.
                </p>
                <p>
                  4. The required data is stored in the database in encrypted
                  format.
                </p>
                <p>
                  5. A templated event type (flow of document) will then be
                  ready to use.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-2/3 flex flex-col items-center my-5 space-y-2 p-10 sm:px-20 sm:py-10 bg-actionBlack">
              <div className="w-full">
                <h1 className="text-xl text-primary font-primaryTypefaceJosefin">
                  Choose an Event Type
                </h1>
                <select
                  className="outline-none  focus:shadow-md px-4 py-2  text-customWhite rounded-md transition duration-200 focus:scale-100 text-customBlack bg-secondary w-full"
                  value={selectedEventTypeId}
                  onChange={onChangeEventTypeHandler}
                >
                  <option value="">Select Event</option>

                  {eventTypes.map((eventType) => (
                    <option value={eventType.docID}>{eventType.title}</option>
                  ))}
                </select>
              </div>
              <div
                className={`${
                  isEventSelected ? "block" : "hidden"
                } w-full space-y-2 pt-10`}
              >
                <h1 className="text-2xl text-primary font-primaryTypefaceJosefin w-full text-left">
                  Add Event Type
                </h1>

                <InputWidget
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChangeFunction={(e) => setTitle(e.target.value)}
                />

                <InputWidget
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChangeFunction={(e) => setDescription(e.target.value)}
                />

                <h1 className="w-full text-left text-primary text-xl font-primaryTypefaceJosefin pt-10">
                  Select Required Details
                </h1>

                <div className=" w-full grid grid-cols-2 gap-2">
                  {Object.keys(fieldsList).map((field) => (
                    <>
                      <div className="flex justify-between items-center bg-secondary p-5 rounded-md w-full">
                        <h1 className="font-secondaryTypefaceDmSans">
                          {field}
                        </h1>
                        <input
                          type="checkbox"
                          className="h-5 accent-primary w-5"
                          name=""
                          id=""
                          checked={fieldsList[field]}
                          onChange={() => onSelectFields(field)}
                        />
                      </div>
                    </>
                  ))}
                </div>
                <RaisedButtonSecondary
                  buttonName="Add Custom Field"
                  onClickFunction={() => {
                    setOpenModal(true);
                  }}
                  width="w-full"
                />

                <h1 className="w-full text-left text-primary text-xl font-primaryTypefaceJosefin pt-10">
                  Acknowledgement Template
                </h1>
                <TextAreaWidget
                  type="text"
                  placeholder="Acknowledgement Template"
                  value={ack}
                  onChangeFunction={(e) => setAck(e.target.value)}
                />
                {/* Ack Fields Dropdown */}

                <Autocomplete
                  multiple
                  id="tags-outlined"
                  onChange={(event, newValue) => {
                    setAckFields(newValue);
                  }}
                  options={Object.keys(fieldsList).filter((key) => {
                    if (fieldsList[key]) {
                      return key;
                    }
                  })}
                  fullWidth
                  size="small"
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Ack Fields"
                      placeholder="Fields.."
                    />
                  )}
                />

                {/* Ack Fields Dropdown End */}

                {/* Required Files Dropdown */}
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  onChange={(event, newValue) => {
                    setFilesFields(newValue);
                  }}
                  options={Object.keys(fieldsList).filter((key) => {
                    if (fieldsList[key]) {
                      return key;
                    }
                  })}
                  fullWidth
                  size="small"
                  getOptionLabel={(option) => option}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Files"
                      placeholder="Files.."
                    />
                  )}
                />
                {/* Required Files Dropdown End */}

                <div className="flex space-x-2 w-full">
                  <RaisedButton
                    disabled={loading ? true : false}
                    onClickFunction={() => {
                      setModalOpen(true);
                    }}
                    buttonName={loading ? "Loading..." : "Update Event Type"}
                    width="w-full"
                  />
                  <RaisedButtonSecondary
                    buttonName="Cancel"
                    width="w-full"
                    link="/"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}

export default EditEventType;

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
