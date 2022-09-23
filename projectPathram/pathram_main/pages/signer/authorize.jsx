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
import Web3 from "xdc3";
import Link from "next/link";
import BackdropWidget from "../../components/widgets/BackdropWidget";
import SnackBarWidget from "../../components/widgets/SnackBarWidget";
import InputWidget from "../../components/widgets/InputWidget";
import RaisedButton from "../../components/widgets/RaisedButton";
import RaisedButtonSecondary from "../../components/widgets/RaisedButtonSecondary";
import { useRouter } from "next/router";
import ModalComponent from "../../components/ModalComponent";
import { sendError } from "next/dist/server/api-utils";
// import {ethers} from "./ethers.js"
// import Web3 from "xdc3";
// import Web3Modal from "web3modal";



export default function Authorize({
  secretKey,
  requestID,
  eventID,
  email,
  imageUrls,
  phoneNumber,
  raisedBy,
  requiredFieldsValues,
  total_signers,
  total_signed,
  uid,
  eventTypeSecretKey,
  signers,
  eventTypeID,
  ackIPFSTemplate,
  address,
  publicKey,
  seq
}) {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const router = useRouter();
  const [secret, setSecret] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isApprove, setIsApprove] = useState(true);
  const [remarks, setRemarks] = useState("");
  const [severity, setSeverity] = useState(3);


  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Xinfin browser detected. You should consider trying XDCpay"
      );
    }
    window.ethereum.on('accountsChanged', function (accounts) {
      // Time to reload your interface with accounts[0]!
      console.log(accounts[0])
     });
  };
  useEffect(()=>{
    loadWeb3();
    return undefined;
  })
  const rejectEvent = async () => {
    if (secret == "" || userPassword == "" || remarks == "") {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    setSeverity(3);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      // type: "dec",
      // cipher: secret,
      // key: userPassword,
      inpText: secret,
      inpKey: userPassword.trim(),
      sleBlockSize: 256,
      direction: "Encrypt",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let secretHash;

    await fetch("https://rgu-hub1.herokuapp.com/enc", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // const res = JSON.parse(result);
        secretHash = result.toString();
      })
      .catch((error) => {
        setError("Try again.");
        setLoading(false);
        return;
      });

    if (secretHash != secretKey) {
      setError("Invalid secret key or password");
      setLoading(false);
      return;
    }

    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        xdr: xdr,
        secret: secret,
        secretEventType: eventTypeSecretKey,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      try {
        const response = await fetch("/api/cancelEvent", requestOptions);
        // console.log(response.text());
        const res = JSON.parse(await response.text());
        console.log(res);
        // if (res.xdr == undefined || res.xdr == null) {
        //   setError("Cannot sign event on blockchain 1");
        //   setWorkFlow('')
        //   setLoading(false);
        //   return;
        // }
        xdr = res.xdr;
        console.log(xdr);
      } catch (error) {
        setError("Cannot sign event on blockchain 2");
        setLoading(false);
        return;
      }
      const eventTypeRef = doc(db, "events", eventID);
      await updateDoc(eventTypeRef, {
        XDR: xdr,
        completed: true,
        status: "rejected",
        remarks: remarks,
      });
      signers.forEach(async (signer) => {
        const ref = doc(db, "users", signer.uid, "request", eventID);
        await updateDoc(ref, {
          signed: true,
        });
      });

      const eventTypeRef_ = doc(db, "event-type", eventTypeID);
      await updateDoc(eventTypeRef_, {
        totalUnsignedEvents: increment(-1),
      });

      setLoading(false);
      setSeverity(1);
      setError("Event Rejected successfully.");
      router.reload();
    } catch (error) {
      setError("Something happened try again.");
      setLoading(false);
    }
  };
  const accept = async()=> {

      
}

  const approveEvent = async () => {
    // await accept()
    const abi = [
      {
        "inputs": [
          {
            "internalType": "address[]",
            "name": "_owners",
            "type": "address[]"
          },
          {
            "internalType": "string",
            "name": "_eventTypeName",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "name": "Confirmation",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Deposit",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "name": "Execution",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "name": "ExecutionFailure",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "a",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "i",
            "type": "uint256"
          }
        ],
        "name": "Received",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "name": "Submission",
        "type": "event"
      },
      {
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "acceptance",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "name": "confirmTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "name": "confirmTransactionReject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "confirmations",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "deployer",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "eventTypeName",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "name": "executeTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "name": "isConfirmed",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "isDeployer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "isOwner",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "owners",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "required",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "name": "revokeConfirmation",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "destination",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "eventId",
            "type": "string"
          }
        ],
        "name": "submitTransaction",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "transactionId",
            "type": "uint256"
          }
        ],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "transactionCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "transactions",
        "outputs": [
          {
            "internalType": "bool",
            "name": "executed",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "accepted",
            "type": "bool"
          },
          {
            "internalType": "address",
            "name": "destination",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "data",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      }
    ]
    const contractAddress = address;
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0].toUpperCase());
    console.log(publicKey.toUpperCase());
    if(accounts[0].toUpperCase()!==publicKey.toUpperCase()){
      setError("Please login with your account");
      return;
    }

    console.log(web3);
    const multisig = new web3.eth.Contract(
      abi,
      contractAddress
    );
    // console.log(multisig);
    // const trxns = await multisig.methods.transactionCount().call();
    // console.log(trxns.toString());
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    let checkSign = await multisig.methods.confirmations(seq,accounts[0]).call();
    console.log(checkSign);
    if(!checkSign){
      const doConfirm = multisig.methods.confirmTransaction(seq).send({from:accounts[0]});
      console.log(doConfirm);
      do {
        await sleep(2000)
        checkSign = await multisig.methods.confirmations(seq,accounts[0]).call();
        console.log(checkSign);
      } while (!checkSign);
    }
    else{
      setError("Signer already authorized the event. Please refresh the page.");
      router.reload();
      return;
    }
    // return ""
    setLoading(true);
    setSeverity(3);

    try {
    // update signers
    console.log("Hello World");
      const updatedSigners = signers.map((signer) => {
        if (signer.uid == uid) {
          return {
            ...signer,
            signed: true,
            signedAt: new Date().toUTCString(),
          };
        }
        return signer;
      });

      const eventTypeRef = doc(db, "events", eventID);
      await updateDoc(eventTypeRef, {
        
        total_signed: total_signed + 1,
        signed_up: updatedSigners,
      });
      const reqRef = doc(db, "users", uid, "request", requestID);
      await updateDoc(reqRef, {
        signed: true,
      });
      console.log("hii");

      // setLoading(false);
    } catch (error) {
      setError("Something happened try again.");
      setLoading(false);
    }

    if (total_signed + 1 == total_signers) {
      try {
        let cid = "";
        try {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            fields: ackIPFSTemplate.fields, //
            template: ackIPFSTemplate.template, //
          });

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          await fetch(
            "https://rgu-hub1.herokuapp.com/ipfsUpload",
            requestOptions
          )
            .then((response) => response.text())
            .then((result) => {
              cid = result;
            })
            .catch((error) => console.log("error", error));
        } catch (error) {
          setError(error);
          setLoading(false);
          return;
        }
        const eventTypeRef = doc(db, "events", eventID);
        await updateDoc(eventTypeRef, {
          completed: true,
          status: "approved",
          cid: cid,
        });

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          TO: email,
          eventId: eventID,
          raisedBy: raisedBy,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch(
          "/api/mails/sendEmailtoUsersAfterSucessfullAuthorization",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {})
          .catch((error) => {
            setError("");
          });

        setLoading(false);
        router.reload();
      } catch (error) {
        alert(
          "Error while submitting. Please contact admin.\n" +
            "Reference Token: " +
            eventID
        );
      }
    } else {
      setLoading(false);
      setSeverity(1);
      setError("Event signed successfully.");
      router.reload();
    }
  };

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
          <ModalComponent
            secretValue={secret}
            onChangeSecret={(e) => setSecret(e.target.value)}
            passwordValue={userPassword}
            onChangePassword={(e) => setUserPassword(e.target.value)}
            closeModal={() => setOpenModal(false)}
            openModal={openModal}
            onSubmit={isApprove ? approveEvent : rejectEvent}
            onChangeRemarks={(e) => setRemarks(e.target.value)}
            remarks={!isApprove}
            remarksValue={remarks}
          />
          <div className="w-full flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2 flex flex-col items-center  space-y-2 p-10 sm:px-20 sm:py-10">
              <h1 className=" text-primary font-primaryTypefaceJosefin w-full text-left text-2xl">
                Authorize Event
              </h1>

              <div className={`w-full space-y-2`}>
                <h1 className="text-xl text-primary font-primaryTypefaceJosefin mt-10">
                  View the details below
                </h1>
                <label className="text-customBlack text-sm font-primaryTypefaceJosefin">
                  Event ID: <span>{eventID}</span>
                </label>
                <label className="text-customBlack text-sm font-primaryTypefaceJosefin">
                  Raised By
                </label>
                <InputWidget type="text" value={raisedBy} disabled={true} />
                <label className="text-customBlack text-sm font-primaryTypefaceJosefin">
                  Email
                </label>
                <InputWidget type="email" value={email} disabled={true} />
                <label className="text-customBlack text-sm font-primaryTypefaceJosefin">
                  Phone Number
                </label>
                <InputWidget type="text" value={phoneNumber} disabled={true} />
                <div className="space-y-2">
                  {Object.keys(requiredFieldsValues).map((field) => (
                    <div>
                      <label className="text-customBlack text-sm font-primaryTypefaceJosefin">
                        {field}
                      </label>
                      <InputWidget
                        value={requiredFieldsValues[field]}
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
                  {Object.keys(imageUrls).map((field) => {
                    if (imageUrls[field] != "") {
                      console.log(imageUrls[field]);
                      return (
                        <div className="space-y-4">
                          <a href={imageUrls[field]} target="_blank">
                            <img
                              src={imageUrls[field]}
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
                  buttonName="Approve"
                  onClickFunction={() => {
                    // setIsApprove(true);
                    // setOpenModal(true);
                    approveEvent()
                  }}
                  width="w-full"
                />
                <RaisedButtonSecondary
                  buttonName="Disapprove"
                  width="w-full"
                  onClickFunction={() => {
                    setIsApprove(false);
                    setOpenModal(true);
                  }}
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
    if (cookies.role == "signer") {
      console.log("Cookies: ", cookies);

      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
      const uid = token.uid;
      console.log(uid);

      // requests, docId, events, secretKey, docIdMap

      // const uid = "04zNlaHpwhcIxp46r25oYmZmnMh2";

      // const userRef = doc(db, "users", uid);
      const docSnap = await firebaseAdmin
        .firestore()
        .collection("users")
        .doc(uid)
        .get();
      console.log(docSnap.exists);
      if (docSnap.exists == false) {
        console.log("User not found 1");
        nookies.set(ctx, "message", "You don't have any events to sign.", {
          path: "/",
        });
        return {
          redirect: {
            permanent: false,
            destination: "/signer",
          },
        };
      }
      // setSecretKey(docSnap.get('secretKey'))
      const secretKey = docSnap.get("secretKey");
      const publicKey = docSnap.get('publicKey');
      console.log(docSnap.get("secretKey"));

      // const q = query(
      //   collection(db, "users", uid, "request"),
      //   where("signed", "==", false),
      //   orderBy("created_at"),
      //   limit(1)
      // );
      let querySnapshotData = (
        await firebaseAdmin
          .firestore()
          .collection("users")
          .doc(uid)
          .collection("request")
          .where("signed", "==", false)
          .orderBy("sequence")
          .limit(1)
          .get()
      ).docs;

      if (querySnapshotData.length == 0) {
        console.log("User not found 2");

        nookies.set(ctx, "message", "You don't have any events to sign.", {
          path: "/",
        });
        return {
          redirect: {
            permanent: false,
            destination: "/signer",
          },
        };
      }

      querySnapshotData = querySnapshotData[0];
      console.log(querySnapshotData);
      const requestID = querySnapshotData.id;
      const eventID = querySnapshotData.get("document_id");
      const reqRank = querySnapshotData.get("rank");

      // const eventRef = doc(db, "events", eventID);
      const eventSnap = (
        await firebaseAdmin.firestore().collection("events").doc(eventID).get()
      ).data();

      const eventRank = eventSnap.total_signed;
      const hierarchy = eventSnap.hierarchy;

      console.log({
        eventRank,
        hierarchy
      });

      if (hierarchy == "hierarchical" && eventRank != reqRank) {
        console.log("User not found 3");

        nookies.set(ctx, "message", "Your subordinates are not yet signed.", {
          path: "/",
        });
        return {
          redirect: {
            permanent: false,
            destination: "/signer",
          },
        };
      }

      const eventTypeID = eventSnap.type_id;

      const eventTypeSnap = (
        await firebaseAdmin
          .firestore()
          .collection("event-type")
          .doc(eventTypeID)
          .get()
      ).data();

      // const eventTypeSecretKey = eventTypeSnap.secretKey;

      const email = eventSnap.email;
      const imageUrls = eventSnap.imageUrls;
      const phoneNumber = eventSnap.phoneNumber;
      const raisedBy = eventSnap.raisedBy;
      const requiredFieldsValues = eventSnap.requiredFieldsValues;
      // const xdr = eventSnap.XDR;
      const total_signers = eventSnap.total_signers;
      const total_signed = eventSnap.total_signed;
      const signers = eventSnap.signed_up;
      const ackIPFSTemplate = eventSnap.ackIPFSTemplate;
      const address = eventTypeSnap.publicKey;
      const seq = eventSnap.sequence;

      console.log({ requiredFieldsValues });

      return {
        props: {
          secretKey,
          requestID,
          eventID,
          email,
          imageUrls,
          phoneNumber,
          raisedBy,
          requiredFieldsValues,
          total_signers,
          total_signed,
          uid,
          signers,
          eventTypeID,
          ackIPFSTemplate,
          address,
          publicKey,
          seq,
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
