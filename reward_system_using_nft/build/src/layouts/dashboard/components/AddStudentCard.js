

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// Billing page components

function AddStudentCard({allowanceType,disabled}) {
    let btn;
    if(disabled=='True'){
        btn = <MDInput variant="outlined" label="Input amount to be granted" disabled />
      } else {
        btn = <MDInput variant="outlined" label="Input amount to be granted"  />
      }
  return (
    <>
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Add Allowance
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <MDTypography variant="h3" my={0} >{allowanceType}</MDTypography>
          <MDTypography variant="body2" my={1}>1 NCU Token ~ 1Rs cash equivalent</MDTypography>
          <MDInput variant="outlined" label="Input ID" />
          <MDBox my={1} />
          {btn}
          <MDBox my={2} >
          <MDButton variant="gradient" color="info" fullWidth>Add</MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
    </>
  );
}

export default AddStudentCard;
