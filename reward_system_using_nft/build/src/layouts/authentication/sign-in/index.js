

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useContext } from 'react';
import { manageFunc } from 'App';
import { ConnectWalletAPI } from './../../../api/operations/wallet';
import { getUserBalanceByRpc } from './../../../api/balance';

function Basic() {
  const {wallet, setWallet, setBalance} = useContext(manageFunc);
  const [rememberMe, setRememberMe] = useState(false);

  const handleConnectWallet = async () => {
    const wal  = await ConnectWalletAPI();
    setWallet(wal.wallet)
    fetchBal(wal.wallet);
  };
  const fetchBal = async (address) => {
    const res = await getUserBalanceByRpc(address);
    // const tez = await getTezBalance(address);
    setBalance(res.balance);
  };  

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Connect Wallet
          </MDTypography>
          
          <MDBox textAlign="center" my={1} >
            {wallet?
            <>
            <MDTypography variant="caption" color="white">
              Wallet already connected.
            </MDTypography>
            </>:
            <>
            <MDTypography variant="caption" color="white">
              Connect to your Tezos wallet
            </MDTypography>
            </>}
          </MDBox>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            {wallet?<>
              <MDBox mt={4} mb={1} component={Link} to="/profile">
                <MDButton variant="gradient" color="info" fullWidth>
                  Go to Profile
                </MDButton>
              </MDBox>
            </>:<>
              <MDBox mt={4} mb={1} >
                <MDButton variant="gradient" color="info" onClick={()=>handleConnectWallet()} fullWidth>
                  Connect Wallet
                </MDButton>
              </MDBox>
            </>}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
