import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { firebaseAdmin } from "../../firebase-admin";
import { db, deleteDoc, doc } from "../../firebase-app";
import SnackBarWidget from "../../components/widgets/SnackBarWidget";

function Index({ secret, uid, password }) {
  const deleteDocument = async () => {
    await deleteDoc(doc(db, "keys", uid));
  };
  useEffect(() => {
    deleteDocument();
  }, []);

  const [open, setOpen] = useState(false);
  return (
    <>
      <SnackBarWidget
        handleClose={() => {
          setOpen(false);
        }}
        message="Copied to clipboard."
        open={open}
        severityNumber={1}
      />
      <div className="max-w-6xl mx-auto px-5 sm:px-0 py-4 h-[82vh] flex  justify-center flex-col">
        <div className="w-full p-[1rem] space-x-5  bg-red-200 rounded-md flex items-center">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className=" text-red-800">
            <b>NOTE: </b> Make sure to copy your personal access token now. You
            won’t be able to see it again!
          </div>
        </div>
        <div className="flex flex-col  my-10 space-y-6  text-customBlack">
          <div className="flex  text-xs sm:text-xl space-x-2 items-center ">
            <div>
              <h1 className="font-primaryTypefaceJosefin text-primary">
                Secret:{" "}
              </h1>
              <h2 className="font-primaryTypefaceJosefin">{secret}</h2>
            </div>
            <div>
              <Tooltip title="Copy" placement="right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-Third cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  onClick={() => {
                    setOpen(true);
                    navigator.clipboard.writeText(secret);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </Tooltip>
            </div>
          </div>
          <div className="flex  text-xs sm:text-xl space-x-2   items-center">
            <div>
              <h1 className="font-primaryTypefaceJosefin text-primary">
                Password:{" "}
              </h1>
              <h2 className="font-primaryTypefaceJosefin">{password}</h2>
            </div>
            <div>
              <Tooltip title="Copy" placement="right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-Third cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  onClick={() => {
                    setOpen(true);
                    navigator.clipboard.writeText(password);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Keys({ secret, uid, password }) {
  return (
    <Layout
      Component={<Index secret={secret} uid={uid} password={password} />}
    />
  );
}

export default Keys;

export const getServerSideProps = async (context) => {
  console.log(context.query.slug.split("&")[1]);
  const uid = context.query.slug.split("&")[1];
  if (!uid) {
    return {
      notFound: true,
    };
  }
  const data = await firebaseAdmin
    .firestore()
    .collection("keys")
    .doc(uid)
    .get();
  console.log(data.data());

  if (data.data() == undefined) {
    return {
      notFound: true,
    };
  }

  const secret = data.get("secret");
  const password = data.get("password");
  console.log(secret);
  return {
    props: {
      secret,
      uid,
      password,
    },
  };
};
