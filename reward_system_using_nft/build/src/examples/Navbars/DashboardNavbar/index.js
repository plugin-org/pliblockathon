

import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes, { number } from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import NCUicon from "assets/images/icons/icon.png"


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";


// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

import {
  ConnectWalletAPI,
  FetchWalletAPI,
  DisconnectWalletAPI,
} from "api/operations/wallet";
import MDButton from "components/MDButton";
import { getUserBalanceByRpc } from "api/balance";

import { getTezBalance } from "api/balance";
import { useContext } from 'react';
import { manageFunc } from "App";

// setWallet ,setBalance , balance , wallet

function DashboardNavbar({ absolute, light, isMini}) {
  const {setWallet ,setBalance , balance , wallet} = useContext(manageFunc);
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });
  // wallet function

  // const [balance, setBalance] = useState(null);
  // const [wallet, setWallet] = useState(null);
  let res = null;
  const nwallet = null;
  const fetchBal = async (address) => {
    res = await getUserBalanceByRpc(address);
    // const tez = await getTezBalance(address);
    setBalance(res.balance);
  };  

  useEffect(() => {
    if(wallet && wallet != null) {
      localStorage.setItem( 'wallet', wallet );
    }  
  }, [wallet]);
  
  const handleConnectWallet = async () => {
    const wal  = await ConnectWalletAPI();
    setWallet(wal.wallet)
    fetchBal(wal.wallet);
  };
  const handleDisconnectWallet = async () => {
    const { nwallet } = await DisconnectWalletAPI();
    setWallet(nwallet);
    setBalance(null);
  };

  // useEffect(() => {
  //   const func = async () => {
  //     const account = await FetchWalletAPI();
  //     if (account) {
  //       setWallet(account.address);
  //     }
  //   };
  //   func();
  // }, []);



  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
           
            {
              balance ? 
              <MDBox display="flex" alignItems="center" mr={3}>
                {<MDBox component="img" src={NCUicon} alt="Brand" width="2rem" mr={1} />}
                <MDBox
                  width={"100%"}
                  
                >
                  <MDTypography component="h6" variant="button" fontWeight="medium" >
                    {balance}
                  </MDTypography>
                </MDBox>
              </MDBox>
            : <></>
            }
            <MDButton
              variant="contained" color="info"
              onClick={wallet ? handleDisconnectWallet : handleConnectWallet}
              className="bg-red-500 px-6 py-2 rounded-sm text-xs font-semibold text-white cursor-pointer"
            >
              
              <MDBox mr={2}>
              <img src="https://img.icons8.com/pastel-glyph/64/FFFFFF/card-wallet--v1.png" width={18} />
              </MDBox>
              {" "}
              {wallet
                ? wallet.slice(0, 4) +
                  "..." +
                  wallet.slice(wallet.length - 4, wallet.length)
                : "Connect"}
            </MDButton>
            <MDBox color={light ? "white" : "inherit"}>
              {/* <Link to="/authentication/sign-in/basic">
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle}>account_circle</Icon>
                </IconButton>
              </Link> */}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>
              {/* <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton> */}
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
