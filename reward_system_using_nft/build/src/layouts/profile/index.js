

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import image from "./"

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useContext } from 'react';
import { manageFunc } from 'App';
import { getAchievements } from "api/fetchUserFood";
import { useEffect } from 'react';
import { useState } from 'react';
import { claimSemestralAllowance } from "api/operations/minter";
import { claimDeanListAllowance } from './../../api/operations/minter';


function Overview({}) {
  const{ wallet ,balance} = useContext(manageFunc);
  useEffect(() => {
      getBal()
  },[wallet])

    const [result, setResult] = useState([]);

    async function getBal() {
      const res = await getAchievements(wallet);
      setResult(Object.entries(res?.value).map((e)=>({[e[0]]:e[1]})))      
    }
  return (
    <DashboardLayout>
      <MDBox mb={2} />
      <Header wallet={wallet}>
        
        <MDBox pt={2} px={2} lineHeight={1.25}>
        <MDBox my={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
            <DefaultInfoCard
                icon="account_balance"
              title="Semester Allowance"
              description="Available"
              value="+200 NCUT"
            />
            <MDBox  my={1}>
            <MDButton variant="gradient" color="info" onClick={() => {claimSemestralAllowance(wallet)}} fullWidth>Claim</MDButton>
            </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
            <DefaultInfoCard
              icon="account_balance"
              title="Dean's List Allowance"
              description="Not Available"
              value="+200 NCUT"
            />
            <MDBox  my={1}>
            <MDButton variant="gradient" color="info" onClick={() => {claimDeanListAllowance(wallet)}} fullWidth>Claim</MDButton>
            </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
            <DefaultInfoCard
              icon="account_balance"
              title="Special Allowance"
              description="Not Available"
              value="+500 NCUT"
            />
            <MDBox  my={1}>
            <MDButton variant="gradient" color="info" fullWidth>Claim</MDButton>
            </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
            <DefaultInfoCard
              icon="account_balance"
              title="Special Allowance"
              description="Not Available"
              value="+1000 NCUT"
            />
            <MDBox  my={1}>
            <MDButton variant="gradient" color="info" fullWidth>Claim</MDButton>
            </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        </MDBox>
          <MDTypography variant="h6" fontWeight="medium">
            Achievements
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Collection
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
        { result.length>0 && result.map((data, i)=>(
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                address={wallet}
                image={`../../../../assets/NFTs/${data[i]?.symbol}.jpg`}
                label={data[i]?.symbol}
                title={data[i]?.name}
                attributes = {data[i]?.attributes}
                
                action={{
                  type: "external",
                  route: "https://ghostnet.tzkt.io/KT1KU4krNtEbiapDXvjMzL4YJ1WXiMF8MHFy/tokens",
                  color: "info",
                  label: "view on blockchain",
                }}
            />
            
          </Grid>
        ))}
        </Grid>
       

        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
