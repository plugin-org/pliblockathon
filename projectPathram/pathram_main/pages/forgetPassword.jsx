import { useState } from "react";
import Layout from "../components/Layout";
import BackdropWidget from "../components/widgets/BackdropWidget";
import InputWidget from "../components/widgets/InputWidget";
import RaisedButton from "../components/widgets/RaisedButton";
import SnackBarWidget from "../components/widgets/SnackBarWidget";
import { db, setDoc, doc } from "../firebase-app";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState(3);
  const sendForgetPasswordMail = async () => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == false) {
      setError("Invalid email address");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be atleast 6 characters long");
      return;
    }

    setSeverity(3);
    setOpen(true);
    try {
      const fpRef = doc(db, "forgetPassword", email);
      await setDoc(fpRef, {
        email: email,
        timestamp: new Date().toUTCString(),
        newPassword: newPassword,
      });
      setSeverity(1);
      setError("Request sent to user admin");
    } catch (error) {
      setError(error.message);
    }
    setOpen(false);
  };
  return (
    <Layout
      Component={
        <>
          <BackdropWidget open={open} />
          <SnackBarWidget
            severityNumber={severity}
            handleClose={() => setError("")}
            message={error}
            open={error.length > 0}
          />
          <div className="max-w-xl space-y-2 mx-auto py-10 px-5 sm:px-0">
            <InputWidget
              value={email}
              onChangeFunction={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter Email"
              type="email"
            />
            <InputWidget
              value={newPassword}
              onChangeFunction={(e) => {
                setNewPassword(e.target.value);
              }}
              placeholder="Enter New Password"
              type="password"
            />
            <RaisedButton
              buttonName="Send Recovery Email"
              onClickFunction={sendForgetPasswordMail}
              width="w-full"
            />
          </div>
        </>
      }
    />
  );
}

export default ForgetPassword;
