

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useState } from 'react';
import { payFine } from './../../../../api/operations/canteen';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {Link} from "@mui/material";

import loader from "../../../../assets/images/icons/loader.gif"

// Billing page components

function BillingInformation() {

  const [cost, setCost] = useState(null);
  const [fine, setFine] = useState(null);

  const [open, setOpen] = useState(false);
  const [invoice, setInvoice] = useState(false);
  const [opID, setopID] = useState("");


  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseinvoice = () => {
    setInvoice(false);
  };
  const handlePay = async (wallet,cost) =>{
    setOpen(true);
    const burn = await payFine("wallet",cost);
    if(burn.success){
      setopID("https://ghostnet.tzkt.io/"+burn.operationId);
      console.log(opID,burn.operationId)
      setOpen(false);
      setInvoice(true);
    }
  }


  return (
    <>
  {/* popup */}
      <Dialog
        open={invoice}
        onClose={handleCloseinvoice}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your Invoice"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You've paid fine successfully, verify your hash below:
            <br/> <Link href={opID} target="_blank"color="blue"> Click here</Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
              <Button onClick={handleCloseinvoice} autoFocus>
                Done
              </Button>
            }
          
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your Invoice"}s
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{textAlign:"center"}}>
            Your invoice is being generated, please wait for few seconds.<br/><br/>
            <img src={loader} style={{margin:"-20px 0"}} alt="loading..." />
          </DialogContentText>
        </DialogContent>
      </Dialog>
  
  {/*  */}
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Billing Information
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <MDTypography variant="h3" my={0} >Pay Library due</MDTypography>
          <MDTypography variant="body2" my={1}>1 NCU Token ~ 1Rs cash equivalent</MDTypography>
          <MDInput variant="outlined" value={cost }label="Input token amount to send" onChange={evt => setCost(parseInt(evt.target.value))} />
          <MDBox my={1} >
          <MDButton variant="gradient" color="info" onClick={()=> handlePay("wallet",cost)} fullWidth>Send</MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
    <br/>
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Billing Information
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <MDTypography variant="h3" my={0} >Pay Fine due</MDTypography>
          <MDTypography variant="body2" my={1}>1 NCU Token ~ 1Rs cash equivalent</MDTypography>
          <MDInput variant="outlined" value={fine} label="Input token amount to send" onChange={evt => setFine(parseInt(evt.target.value))}/>
          <MDBox my={1} >
          <MDButton variant="gradient" color="info" onClick={()=> handlePay("wallet",fine)} fullWidth>Send</MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
    </>
  );
}

export default BillingInformation;
