

// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";


// Billing page components
import Transaction from "layouts/billing/components/Transaction";
import { useContext } from 'react';
import { manageFunc } from 'App';
import { getUserTransactions } from './../../../../api/transactions';
import { useState } from 'react';
import { useEffect } from 'react';

function Transactions() {
  const {wallet} = useContext(manageFunc);
  const [txs, setTxs] = useState(null);
  const fetchTx = async () =>{
    const txss = await getUserTransactions(wallet);
    setTxs(txss.transactions.slice(0,6))
  }
  useEffect(()=>(
    fetchTx()
  ),[wallet])
  return (
    <Card sx={{ height: "100%" , maxHeight: "100%"  }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Your Transaction&apos;s
        </MDTypography>
        <MDBox display="flex" alignItems="flex-start">
          <MDBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </MDBox>
          <MDTypography variant="button" color="text" fontWeight="regular">
            Last 6 Transactions
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            recent interactions
          </MDTypography>
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" , alignItems:"stretch"}}
        >
         {txs && txs.map((data,i)=> (
          <>
          <Transaction
            color="success"
            icon="done"
            hash = {data.hash}
            name={data.entrypoint}
            description={data.time.toString()}
            value="View on tzkt"
          />
          </>

         ))}
          {/* <Transaction
            color="error"
            icon="expand_more"
            name="Netflix"
            description="27 March 2020, at 12:30 PM"
            value=""
          />
          
          <Transaction
            color="success"
            icon="done"
            name="Webflow"
            description="26 March 2020, at 05:00 AM"
            value="Pending"
          /> */}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Transactions;
