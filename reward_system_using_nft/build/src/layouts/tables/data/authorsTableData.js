/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import BUrgerimg from "../../../assets/NFTs/Burger.jpeg"
import Dosaimg from "../../../assets/NFTs/Idli.jpeg"
import Samosaimg from "../../../assets/NFTs/Samosa.jpeg"
import Pizzaimg from "../../../assets/NFTs/Pizza.jpeg"
import MDButton from "components/MDButton";
import { mintFood } from './../../../api/operations/canteen';

export default function data() {
  
  

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "item", accessor: "author", width: "45%", align: "left" },
      { Header: "price", accessor: "function", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        author: <Author image={BUrgerimg} name="Burger" email="" />,
        function: <Job title="50 NCU Tokens" description="" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Available" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            11/01/19
          </MDTypography>
        ),
        action: (
          <MDButton onClick={() => { mintFood("wallet",0,50000000) }}>
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            
              Buy Now
           
          </MDTypography>
          </MDButton>
        ),
      },
      {
        author: <Author image={Dosaimg} name="Dosa Sambhar" email="" />,
        function: <Job title="70 NCU Tokens" description="" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Available" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            19/09/17
          </MDTypography>
        ),
        action: (
          <MDButton onClick={() => { mintFood("wallet",1,70000000) }}>
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            
              Buy Now
           
          </MDTypography>
          </MDButton>
        ),
      },
      {
        author: <Author image={Pizzaimg} name="Pizza" email="" />,
        function: <Job title="100 NCU Tokens" description="" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Available" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            24/12/08
          </MDTypography>
        ),
        action: (
          <MDButton onClick={() => { mintFood("wallet",2,100000000) }}>
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            
              Buy Now
           
          </MDTypography>
          </MDButton>
        ),
      },
      {
        author: <Author image={Samosaimg} name="Samosa" email="" />,
        function: <Job title="40 NCU Tokens" description="" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Available" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            04/10/21
          </MDTypography>
        ),
        action: (
          <MDButton onClick={() => { mintFood("wallet",3,40000000) }}>
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            
              Buy Now
           
          </MDTypography>
          </MDButton>
        ),
      },
    ],
  };
}
