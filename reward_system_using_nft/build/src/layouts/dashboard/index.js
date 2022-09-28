

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import AddStudentCard from "./components/AddStudentCard";
import { useState } from 'react';
import { addStudent } from "api/operations/minter";
import { removeStudent } from "api/operations/minter";
import { addDeansStudent } from "api/operations/minter";
import { updateAmount } from "api/operations/minter";
import Web3 from "xdc3";



function Dashboard({wallet,balance}) {
  const { sales, tasks } = reportsLineChartData;
  const [addStud, setaddStudent] = useState('');
  const [removeStud, setremoveStudent] = useState('');
  const [deanList, setdeanList] = useState('');
  const [amount, setAmount] = useState('');
  const loadWeb3 = async () => 
  { if (window.ethereum) {

    window.web3= new Web3(window.ethereum); 
  } else if (window.web3) { 
    window.web3= new Web3(window.web3.currentProvider); 
  } else { window.alert("Non-Xinfin browser detected. You should consider trying XDCpay");
}};
    
    //Call the above function in useEffect() or componentdidmount() so to create window.web3
    
    LoadBlockchainData = async () => {
    const abi = [
      {
       "inputs": [
        {
         "internalType": "address",
         "name": "receiver",
         "type": "address"
        },
        {
         "internalType": "uint256",
         "name": "amount",
         "type": "uint256"
        }
       ],
       "name": "mint",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
      },
      {
       "inputs": [
        {
         "internalType": "address",
         "name": "receiver",
         "type": "address"
        },
        {
         "internalType": "uint256",
         "name": "amount",
         "type": "uint256"
        }
       ],
       "name": "send",
       "outputs": [],
       "stateMutability": "nonpayable",
       "type": "function"
      },
      {
       "inputs": [],
       "stateMutability": "nonpayable",
       "type": "constructor"
      },
      {
       "anonymous": false,
       "inputs": [
        {
         "indexed": false,
         "internalType": "address",
         "name": "from",
         "type": "address"
        },
        {
         "indexed": false,
         "internalType": "address",
         "name": "to",
         "type": "address"
        },
        {
         "indexed": false,
         "internalType": "uint256",
         "name": "amount",
         "type": "uint256"
        }
       ],
       "name": "Sent",
       "type": "event"
      },
      {
       "inputs": [
        {
         "internalType": "address",
         "name": "",
         "type": "address"
        }
       ],
       "name": "balances",
       "outputs": [
        {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
        }
       ],
       "stateMutability": "view",
       "type": "function"
      },
      {
       "inputs": [],
       "name": "minter",
       "outputs": [
        {
         "internalType": "address",
         "name": "",
         "type": "address"
        }
       ],
       "stateMutability": "view",
       "type": "function"
      }
     ]
     
    const web3= window.web3; const accounts = await web3.eth.getAccounts(); if (accounts.length === 0) {
    
    } else 

    let accountBalance = await web3.eth.getBalance(accounts[0]); accountBalance = web3.utils.fromwet(accountBalance, "Ether"); console.log("accountBalance", accountBalance) const contractInstance = new web3.eth.Contract(

      abi,
      "0x7c9861bEc084Cc9d40bbf0094EEbBAd47cF8f7b8")
  
  return (
    <DashboardLayout>
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={3}>
                  <Card id="delete-account">
                    <MDBox pt={3} px={2}>
                      <MDTypography variant="h6" fontWeight="medium">
                        Add Allowance
                      </MDTypography>
                    </MDBox>
                    <MDBox pt={1} pb={2} px={2}>
                      <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                        <MDTypography variant="h3" my={0} >Add Student</MDTypography>
                        <MDTypography variant="body2" my={1}>Add new student to claim tokens</MDTypography>
                        <MDInput variant="outlined" label="Input tz Address" value={addStud} onChange={evt => setaddStudent(evt.target.value)}/>
                        <MDBox my={2} >
                        <MDButton variant="gradient" color="info" onClick={()=> addStudent("wallet",addStud)} fullWidth>Add</MDButton>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={3}>
              <Card id="delete-account">
                  <MDBox pt={3} px={2}>
                    <MDTypography variant="h6" fontWeight="medium">
                      Add Allowance
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={1} pb={2} px={2}>
                    <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                      <MDTypography variant="h3" my={0} >Dean's List</MDTypography>
                      <MDTypography variant="body2" my={1}>Add dean's list student</MDTypography>
                      <MDInput variant="outlined" label="Input tz Address" value={deanList} onChange={evt => setdeanList(evt.target.value)} />
                      <MDBox my={2} >
                      <MDButton variant="gradient" color="info"  onClick={()=> addDeansStudent("wallet",deanList)} fullWidth>Add</MDButton>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={3}>
              <Card id="delete-account">
                  <MDBox pt={3} px={2}>
                    <MDTypography variant="h6" fontWeight="medium">
                    Remove Allowance
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={1} pb={2} px={2}>
                    <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                      <MDTypography variant="h3" my={0} >Remove Student</MDTypography>
                      <MDTypography variant="body2" my={1}>Remove student from claiming</MDTypography>
                      <MDInput variant="outlined" label="Input tz Address" value={removeStud} onChange={evt => setremoveStudent(evt.target.value)} />
                      <MDBox my={2} >
                      <MDButton variant="gradient" color="info" onClick={()=> removeStudent("wallet",removeStud)} fullWidth>Remove</MDButton>
                      </MDBox>
                    </MDBox>
                    
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={3}>
                  <Card id="delete-account">
                    <MDBox pt={3} px={2}>
                      <MDTypography variant="h6" fontWeight="medium">
                        Edit Allowance
                      </MDTypography>
                    </MDBox>
                    <MDBox pt={1} pb={2} px={2}>
                      <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                        <MDTypography variant="h3" my={0} >Edit Amount</MDTypography>
                        <MDTypography variant="body2" my={1}>Edit claimable amount of NCUT</MDTypography>
                        <MDInput variant="outlined" label="Input value" value={amount} onChange={evt => setAmount(parseInt(evt.target.value))} />
                        <MDBox my={2} >
                        <MDButton variant="gradient" color="info" onClick={()=> updateAmount("wallet",amount)}fullWidth>Update</MDButton>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
