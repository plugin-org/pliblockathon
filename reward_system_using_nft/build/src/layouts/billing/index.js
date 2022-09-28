
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import MasterCard from "examples/Cards/MasterCard";
// import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// // Billing page components
// import PaymentMethod from "layouts/billing/components/PaymentMethod";
// import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import { useContext } from 'react';
import { manageFunc } from 'App';
import { getUserTransactions } from './../../api/transactions';

function Billing() {
  return (
    <DashboardLayout>
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <Button onClick ={ () => getUserTransactions("tz1dad7vnNGRRxBukQBQ7NCXxXeacwaAabFm")}> hello </Button> */}
              <Transactions />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
