

// react-router-dom components
import Link from '@mui/material/Link';

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import CERTimg from "../../../../assets/NFTs/CERT.jpg"
import DEGimg from "../../../../assets/NFTs/DEG.jpg"
import TROPHimg from "../../../../assets/NFTs/TROPH.jpg"
import BUrgerimg from "../../../../assets/NFTs/Burger.jpeg"
import Dosaimg from "../../../../assets/NFTs/Idli.jpeg"
import Samosaimg from "../../../../assets/NFTs/Samosa.jpeg"
import Pizzaimg from "../../../../assets/NFTs/Pizza.jpeg"
import loader from "../../../../assets/images/icons/loader.gif"
import { burnFood } from "api/operations/canteen";
// 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import Button from '@mui/material/Button';

function DefaultProjectCard({ image, label, title, description, action, authors , attributes ,address , foodid}) {
  if(label ==="DEG"){
    image = DEGimg
  } else if (label ==="CERT"){
    image = CERTimg
  } else if (label ==="TROPH"){
    image = TROPHimg
  } else if (label ==="Burger"){
    image = BUrgerimg
    label = ''
  } else if (label ==="Dosa Sambhar"){
    image = Dosaimg
    label = ''
  } else if (label ==="Samosa"){
    image = Samosaimg
    label = ''
  } else  {
    image = Pizzaimg
    label = ''
  }
  const [opID, setopID] = useState("");
  
  const [open, setOpen] = useState(false);
  const [invoice, setInvoice] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseinvoice = () => {
    setInvoice(false);
  };

  const handleBurn = async (wallet,id,amount) =>{
    setOpen(true);
    const burn = await burnFood(wallet,id,amount);
    if(burn.success){
      setopID("https://ghostnet.tzkt.io/"+burn.operationId);
      setOpen(false);
      setInvoice(true);
    }
  }
  
  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      
      <MDAvatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <Dialog
        open={invoice}
        onClose={handleCloseinvoice}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your Invoice"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You've burnt a FoodNFT, verify your hash below:
            {console.log(opID)}
            <br/> <Link href={opID} target="_blank"color="blue"> Click here</Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
              <Button onClick={handleCloseinvoice} autoFocus>
                Done
              </Button>
            }
          
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your Invoice"}s
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{textAlign:"center"}}>
            Your invoice is being generated, please wait for few seconds.<br/><br/>
            <img src={loader} style={{margin:"-20px 0"}} alt="loading..." />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
              opID?<>
              <Button onClick={handleClose} autoFocus>
                Done
              </Button>
              </>:<></>
            }
          
        </DialogActions>
      </Dialog>
      <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          title={title}
          sx={{
            maxWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </MDBox>
      <MDBox mt={1} mx={0.5}>

        <MDBox mb={1}>
          {action.type === "internal" ? (
            <MDTypography
              to={action.route}
              variant="h5"
              textTransform="capitalize"
            >
              {title} 
              <MDTypography variant="caption" ml={1}>
              {label}
              </MDTypography>
            </MDTypography>
          ) : (
            <MDTypography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          )}
        </MDBox>
        <MDBox mb={3} lineHeight={0}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {/* {description} */}
            {attributes && attributes.length>0 && attributes.map((data,i)=>(
              <>
              <MDTypography variant="caption">{data.name}:{data.value} </MDTypography> <br />
              </>
            ))}
          </MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          {action.type === "internal" && address ? (
            <MDButton
              // to={action.route}
              onClick={()=>{handleBurn(address,foodid,1)}}
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </MDButton>
          ) : (
            <MDButton
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </MDButton>
          )}
          <MDBox display="flex">{renderAuthors}</MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
};

export default DefaultProjectCard;
