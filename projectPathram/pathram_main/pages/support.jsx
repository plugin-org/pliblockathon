import { useState } from "react";
import Layout from "../components/Layout";
import BackdropWidget from "../components/widgets/BackdropWidget";
import InputWidget from "../components/widgets/InputWidget";
import RaisedButtonSecondary from "../components/widgets/RaisedButtonSecondary";
import SnackBarWidget from "../components/widgets/SnackBarWidget";
import TextAreaWidget from "../components/widgets/TextAreaWidget";
import * as React from "react";
import { styled } from "@mui/material/styles";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import RaisedButton from "../components/widgets/RaisedButton";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:"rgba(255, 255, 255, .05)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function Support() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState(3);

  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSubmit = async () => {
    if (name.trim().length < 1) {
      setError("Name is required.");
      return;
    }
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) == false) {
      setError("Invalid Email.");
      return;
    }
    if (message.trim().length < 1) {
      setError("Message is required.");
      return;
    }

    setLoading(true);
    setSeverity(3);

    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        email: email,
        name: name,
        message: message,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch("/api/mails/sendEmailOnContactRequested", requestOptions);
      setSeverity(1);
      setError("Email sent successfully.");
    } catch (error) {
      setError("Cannot send email.");
    }

    setLoading(false);
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
          <div className="bg-secondary   ">
            <div className=" flex flex-col sm:flex sm:flex-row text-gray-800 sm:h-[45rem] h-full ">
              <div className="sm:w-1/3 mt-10 sm:mt-20 w-full sm:pl-10 ">
                <div className="px-10 pb-5">
                  <h1 className="text-2xl font-semibold font-primaryTypefaceJosefin text-primary">
                    Contact Us
                  </h1>
                </div>
                <div className="flex justify-center ">
                  <div className=" w-5/6 bg-layerBlack bg-opacity-50  rounded-md px-8 py-6 space-y-4 flex flex-col justify-center">
                    <div className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-customWhite"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <h2 className="text-customWhite">Leave a Message</h2>
                    </div>

                    <InputWidget
                      type="text"
                      placeholder="Enter Your Name"
                      value={name}
                      onChangeFunction={(e) => {
                        setName(e.target.value);
                      }}
                    />

                    <InputWidget
                      type="text"
                      placeholder="Enter Your Email"
                      value={email}
                      onChangeFunction={(e) => {
                        setEmail(e.target.value);
                      }}
                    />

                    <TextAreaWidget
                      type="text"
                      placeholder="Enter Your Message"
                      value={message}
                      onChangeFunction={(e) => {
                        setMessage(e.target.value);
                      }}
                    />

                    <div className="w-full">
                      <RaisedButton
                        buttonName="Submit"
                        width="w-full"
                        onClickFunction={handleSubmit}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:w-2/3 w-full  sm:my-20 mt-10 flex justify-center  ">
                <div className="sbar track-right-div h-full  sm:h-full text-customBlack border-8 font-secondaryTypefaceDmSans  border-secondary rounded-md w-5/6 bg-layerBlack bg-opacity-50 space-y-6 sm:space-y-4  p-4 sm:p-8 max-h-[26rem] sm:max-h-full ">
                  <div>
                    <Accordion
                      expanded={expanded === "panel1"}
                      onChange={handleChange("panel1")}
                    >
                      <AccordionSummary
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                      >
                        <Typography>Collapsible Group Item #1</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Suspendisse malesuada lacus ex, sit amet blandit
                          leo lobortis eget. Lorem ipsum dolor sit amet,
                          consectetur adipiscing elit. Suspendisse malesuada
                          lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expanded === "panel2"}
                      onChange={handleChange("panel2")}
                    >
                      <AccordionSummary
                        aria-controls="panel2d-content"
                        id="panel2d-header"
                      >
                        <Typography>Collapsible Group Item #2</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Suspendisse malesuada lacus ex, sit amet blandit
                          leo lobortis eget. Lorem ipsum dolor sit amet,
                          consectetur adipiscing elit. Suspendisse malesuada
                          lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      expanded={expanded === "panel3"}
                      onChange={handleChange("panel3")}
                    >
                      <AccordionSummary
                        aria-controls="panel3d-content"
                        id="panel3d-header"
                      >
                        <Typography>Collapsible Group Item #3</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Suspendisse malesuada lacus ex, sit amet blandit
                          leo lobortis eget. Lorem ipsum dolor sit amet,
                          consectetur adipiscing elit. Suspendisse malesuada
                          lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}

export default Support;
