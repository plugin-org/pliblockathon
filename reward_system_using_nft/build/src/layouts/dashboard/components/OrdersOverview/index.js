

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Add Food Item
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox my={1} mx={2} >
        <MDInput type="text" label="Item Name"  fullWidth/>
      </MDBox>
      <MDBox my={1} mx={2} mb={0}>
        <MDInput type="text" label="Item Price"  fullWidth/>
      </MDBox>
      <MDBox my={1} mx={2} >
        <MDTypography variant="caption">
          Add Food Image
        </MDTypography>
        <MDInput type="file" fullWidth/>
      </MDBox>
      <MDBox my={2} mx={2}  >
          <MDButton variant="gradient" color="info" fullWidth>Add</MDButton>
      </MDBox>
    </Card>

  );
}

export default OrdersOverview;
