

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
// import ProjectsTableData from "layouts/tables/data/ProjectsTableData";

// 

import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import { getFoodBal } from './../../api/fetchUserFood';
import { useContext } from 'react';
import { manageFunc } from 'App';
import { useState , useEffect } from 'react';

function Tables() {
  const{ wallet ,balance} = useContext(manageFunc);
  const { columns, rows } = authorsTableData();
  
  useEffect(() => {
    getBal()
 },[wallet])

  const [result, setResult] = useState(null);

  async function getBal() {
    const res = await getFoodBal(wallet);
    setResult(res.value)
  }


  
  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Canteen Items
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Your Items
                </MDTypography>
              </MDBox>
              <MDBox pt={2} mx={2} py={3}
                px={2}>
                  
                <Grid container spacing={6}>
                  { result!=null && wallet?
                    result[0]!=0 ?
                    <>
                    <Grid item xs={12} md={6} xl={3}>
                      <DefaultProjectCard
                        address={wallet}
                        foodid={0}
                        image={homeDecor1}
                        label="Burger"
                        title={`Burger x${result[0]}`}
                        description="Burn this to get a Burger invoice. (Valid for an hour)"
                        action={{
                          type: "internal",
                          route: "",
                          color: "info",
                          label: "Burn Now",
                        }}
                      />
                    </Grid>
                    </>
                    : <></>
                    : <></>
                  }
                  { result!=null ?
                    result[1]!=0 ?
                    <>
                    <Grid item xs={12} md={6} xl={3}>
                      <DefaultProjectCard
                        address={wallet}
                        foodid={1}
                        image={homeDecor1}
                        label="Dosa Sambhar"
                        title={`Dosa Sambhar x${result[1]}`}
                        description="Burn this to get a Dosa Sambhar invoice. (Valid for an hour)"
                        action={{
                          type: "internal",
                          route: "",
                          color: "info",
                          label: "Burn Now",
                        }}
                      />
                    </Grid>
                    </>
                    : <></>
                    : <></>
                  }
                  { result!=null ?
                    result[2]!=0 ?
                    <>
                    <Grid item xs={12} md={6} xl={3}>
                      <DefaultProjectCard
                      address={wallet}
                        image={homeDecor1}
                        foodid={2}
                        label="Pizza"
                        title={`Pizza x${result[2]}`}
                        description="Burn this to get a Pizza invoice. (Valid for an hour)"
                        action={{
                          type: "internal",
                          route: "w",
                          color: "info",
                          label: "Burn Now",
                        }}
                      />
                    </Grid>
                    </>
                    : <></>
                    : <></>
                  }
                  { result!=null ?
                    result[3]!=0 ?
                    <>
                    <Grid item xs={12} md={6} xl={3}>
                      <DefaultProjectCard
                      address={wallet}
                      foodid={3}
                        image={homeDecor1}
                        label="Samosa"
                        title={`Samosa x${result[3]}`}
                        description="Burn this to get a Samosa invoice. (Valid for an hour)"
                        action={{
                          type: "internal",
                          route: "",
                          color: "info",
                          label: "Burn Now",
                        }}
                      />
                    </Grid>
                    </>
                    : <></>
                    : <></>
                  }
                  
                    {/* <MDTypography>
                    
                      no of burgers : {result[0]}<br/>
                      no of idli : {result[1]}<br/>
                      no of pizza : {result[2]}<br/>
                      no of samosa : {result[3]}<br/>
                    </MDTypography> */}
                  {/* <Grid item xs={12} md={6} xl={3}>
                    <DefaultProjectCard
                      image={homeDecor1}
                      label="project #2"
                      title="modern"
                      description="As Uber works through a huge amount of internal management."
                      action={{
                        type: "internal",
                        route: "/pages/profile/profile-overview",
                        color: "info",
                        label: "view on blockchain",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} xl={3}>
                    <DefaultProjectCard
                      image={homeDecor2}
                      label="project #1"
                      title="scandinavian"
                      description="Music is something that everyone has their own specific opinion about."
                      action={{
                        type: "internal",
                        route: "/pages/profile/profile-overview",
                        color: "info",
                        label: "view on blockchain",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} xl={3}>
                    <DefaultProjectCard
                      image={homeDecor3}
                      label="project #3"
                      title="minimalist"
                      description="Different people have different taste, and various types of music."
                      action={{
                        type: "internal",
                        route: "/pages/profile/profile-overview",
                        color: "info",
                        label: "view on blockchain",
                      }}
                    />
                  </Grid> */}
                  
                </Grid>
{/*  */}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
