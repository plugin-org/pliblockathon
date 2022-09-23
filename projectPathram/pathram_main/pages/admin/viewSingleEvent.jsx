import HeadComponent from "../../components/HeadComponent";
import Layout from "../../components/Layout";
import nookies from "nookies";
import { firebaseAdmin } from "../../firebase-admin";
import { useEffect, useState } from "react";
import {
  query,
  collection,
  db,
  getDocs,
  where,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  limit,
  increment,
} from "../../firebase-app";
import Link from "next/link";
import BackdropWidget from "../../components/widgets/BackdropWidget";
import SnackBarWidget from "../../components/widgets/SnackBarWidget";
import InputWidget from "../../components/widgets/InputWidget";
import RaisedButton from "../../components/widgets/RaisedButton";
import RaisedButtonSecondary from "../../components/widgets/RaisedButtonSecondary";
import { useRouter } from "next/router";
import ModalComponent from "../../components/ModalComponent";

export default function Authorize({ dataSnap }) {
  return (
    <Layout
      Component={
        <>
          <div className="w-full flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2 flex flex-col items-center  space-y-2 p-10 sm:px-20 sm:py-10">
              <h1 className=" text-primary font-primaryTypefaceJosefin w-full text-left text-2xl">
                Event Details - {dataSnap.id}
              </h1>

              <div className={`w-full space-y-2`}>
                <label className="text-customBlack text-sm font-primaryTypefaceJosefin">
                  Raised By
                </label>
                <InputWidget
                  type="text"
                  value={dataSnap.raisedBy}
                  disabled={true}
                />
                <label className="text-customBlack text-sm font-primaryTypefaceJosefin">
                  Email
                </label>
                <InputWidget
                  type="email"
                  value={dataSnap.email}
                  disabled={true}
                />
                <label className="text-customBlack text-sm font-primaryTypefaceJosefin">
                  Phone Number
                </label>
                <InputWidget
                  type="text"
                  value={dataSnap.phoneNumber}
                  disabled={true}
                />
                <label className="text-customBlack text-sm font-primaryTypefaceJosefin">
                  Status
                </label>
                <InputWidget
                  type="text"
                  value={dataSnap.status}
                  disabled={true}
                />
                <div className="space-y-2">
                  {Object.keys(dataSnap.requiredFieldsValues).map((field) => (
                    <div>
                      <label className="text-customBlack text-sm font-primaryTypefaceJosefin">
                        {field}
                      </label>
                      <InputWidget
                        value={dataSnap.requiredFieldsValues[field]}
                        disabled={true}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full sm:w-1/2 p-10">
              <div className={` space-y-2 mt-10 text-customBlack`}>
                <h1 className="text-primary font-primaryTypefaceJosefin text-xl">
                  Attachments
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.keys(dataSnap.imageUrls).map((field) => {
                    if (dataSnap.imageUrls[field] != "") {
                      console.log(dataSnap.imageUrls[field]);
                      return (
                        <div className="space-y-4">
                          <a href={dataSnap.imageUrls[field]} target="_blank">
                            <img
                              src={dataSnap.imageUrls[field]}
                              className="h-48"
                              alt="Click Here to View"
                            />
                          </a>
                          <h1>{field}</h1>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="mt-4 w-full flex flex-row space-x-2">
                <RaisedButton
                  buttonName="Track Event"
                  link={`/?eventId=${dataSnap.id}`}
                  width="w-full"
                />
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}

export const getServerSideProps = async (ctx) => {
  console.log("Signer");
  try {
    console.log("Enterd AuthCheck");
    const cookies = nookies.get(ctx);
    if (
      cookies.token == undefined ||
      cookies.token == null ||
      cookies.token == "" ||
      cookies.role == undefined ||
      cookies.role == null ||
      cookies.role == ""
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
      const eventID = ctx.query.eventID;
      if (eventID == undefined) {
        return {
          notFound: true,
        };
      }

      const dataSnap = (
        await firebaseAdmin.firestore().collection("events").doc(eventID).get()
      ).data();

      return {
        props: {
          dataSnap,
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
    console.log(err);
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};
