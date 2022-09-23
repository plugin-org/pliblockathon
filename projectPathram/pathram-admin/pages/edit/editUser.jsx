import {
  collection,
  query,
  where,
  getDocs,
  db,
  doc,
  updateDoc,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../../firebase-app";
import Layout from "../../components/Layout";
import InputWidget from "../../components/widgets/InputWidget";
import RaisedButton from "../../components/widgets/RaisedButton";
import { useState } from "react";
import RaisedButtonSecondary from "../../components/widgets/RaisedButtonSecondary";
import nookies from "nookies";
import SnackBarWidget from "../../components/widgets/SnackBarWidget";
import BackdropWidget from "../../components/widgets/BackdropWidget";
import ConfirmModalComponent from "../../components/ConfirmModalComponent";
import LinearWithValueLabel from "../../components/widgets/LinearProgressWithLabel";
import LinearProgressWithValueLabel from "../../components/widgets/LinearProgressWithLabel";

function EditUser() {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState(3);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgressPercent] = useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const editUserDetailsInFirebase = async () => {
    if (name.trim().length == 0 || designation.trim().length == 0) {
      setError("All fields required.");
      return;
    }
    console.log({ name, designation, imageUrl });

    setLoading(true);
    setSeverity(3);

    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        name: name,
        designation: designation,
        imageUrl: imageUrl,
      });
      setSeverity(1);
      setError("User details updated successfully.");
      setName("");
      setDesignation("");
      setImageUrl("");
      setOpen(false);
      setUid("");
      setEmail("");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
    setIsFilePicked(false);
    setImageUrl();
  };

  const searchUser = async () => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == false) {
      setError("Invalid Email.");
      return;
    }

    setLoading(true);
    setOpen(false);
    try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const userSnapshot = (await getDocs(q)).docs[0];
      if (!userSnapshot) {
        setError("User not found");
        setLoading(false);
        return;
      }
      setName(userSnapshot.get("name"));
      setDesignation(userSnapshot.get("designation"));
      setImageUrl(userSnapshot.get("imageUrl"));
      setUid(userSnapshot.get("uid"));
      setOpen(true);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const uploadImageToFirebase = async (event) => {
    const f = event.target.files[0];
    const storageRef = ref(storage, `profile/${uid}`);
    const uploadTask = uploadBytesResumable(storageRef, f);
    setLoading(true);
    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(progress);
          setProgressPercent(progress);
        },
        (error) => {
          setError(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
            resolve();
          });
        }
      );
    });
    setLoading(false);
    setIsFileUploading(false);
  };

  const changeHandler = async (event) => {
    event.preventDefault();
    setSelectedFile(null);
    setLoading(true);
    setIsFileUploading(true);
    setSelectedFile(event.target.files[0]);
    // console.log(event.target.files[0]);
    // console.log(URL.createObjectURL(event.target.files[0]));

    // let reader = new FileReader();

    // reader.readAsDataURL(event.target.files[0]);
    await uploadImageToFirebase();
  };

  return (
    <Layout
      Component={
        <>
          <ConfirmModalComponent
            cancelOnClick={() => {
              setModalOpen(false);
            }}
            title="Do you want to update the user details?"
            confirmOnClick={() => {
              setModalOpen(false);
              editUserDetailsInFirebase();
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
          <div className="flex bg-secondary flex-col-reverse sm:flex-row">
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
            <div className="w-full sm:w-1/2 flex flex-col items-center m-5  rounded-md space-y-10 p-10 sm:p-20 bg-actionBlack">
              <div className="w-full space-y-2">
                <h1 className="text-xl  text-left font-primaryTypefaceJosefin text-primary  w-full">
                  Search User
                </h1>

                <InputWidget
                  type="email"
                  placeholder="Enter Email Address Of User"
                  value={email}
                  onChangeFunction={(e) => setEmail(e.target.value)}
                />

                <RaisedButton
                  buttonName="Search"
                  width="w-full"
                  onClickFunction={searchUser}
                />
              </div>
              <div
                className={`space-selectedFiley-2  w-full ${
                  open ? "block" : "hidden"
                }`}
              >
                <h1 className="text-xl  text-left font-primaryTypefaceJosefin text-primary  w-full">
                  Edit User
                </h1>
                <p className="text-customWhite font-secondaryTypefaceDmSans">
                  Please fill the new details below.
                </p>{" "}
                <br />
                <p className="text-customWhite font-primaryTypefaceJosefin">
                  Name
                </p>
                <InputWidget
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChangeFunction={(e) => setName(e.target.value)}
                />
                <p className="text-customWhite font-primaryTypefaceJosefin">
                  Designation
                </p>
                <InputWidget
                  type="text"
                  placeholder="Designation"
                  value={designation}
                  onChangeFunction={(e) => setDesignation(e.target.value)}
                />
                <div className="w-full">
                  <p className="text-customWhite w-full font-primaryTypefaceJosefin">
                    Profile Picture
                  </p>
                  <input
                    type="file"
                    className="w-full"
                    onChange={uploadImageToFirebase}
                    accept="image/*"
                    multiple={false}
                  />
                </div>
                {/* <div className={`${isFileUploading ? "block" : "hidden"}`}> */}
                {loading ? (
                  <LinearProgressWithValueLabel progress={progress} />
                ) : (
                  <></>
                )}
                {/* </div> */}
                {/* <div className={`${imageUrl ? "block" : "hidden"}`}> */}
                {imageUrl == "" ? (
                  <></>
                ) : (
                  <img
                    src={imageUrl}
                    className="h-40 w-40  m-5 shadow-sm rounded-full"
                  />
                )}
                {/* </div> */}
                <div className="flex space-x-2 w-full mt-4">
                  <RaisedButton
                    buttonName="Update User"
                    width="w-full"
                    onClickFunction={() => {
                      setModalOpen(true);
                    }}
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

export default EditUser;

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
