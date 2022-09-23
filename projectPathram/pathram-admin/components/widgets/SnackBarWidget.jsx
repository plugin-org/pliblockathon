import React, { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackBarWidget({ open, handleClose, message, severityNumber,width="100%" }) {
  const severity = { 0: "info", 1: "success", 2: "warning", 3: "error" };
  
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
    >
      <Alert
        onClose={handleClose}
        severity={severity[severityNumber]}
        sx={{ width: `${width}`}}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackBarWidget;
