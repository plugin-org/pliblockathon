import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { auth, signOut } from "../firebase-app";
import { useAuth } from "../provider/useAuth";

import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { doc, getDoc, db } from "../firebase-app";
import RaisedButton from "./widgets/RaisedButton";

const settings = ["Dashboard", "Logout"];

function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const authLogout = async () => {
    await signOut(auth);
    destroyCookie("", "role");
    destroyCookie("", "token");
    router.replace("/login");
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [admin, setAdmin] = React.useState({
    designation: "",
    superAdminName: "",
    imageUrl: "",
  });

  const fetchAdminData = async () => {
    const adminRef = doc(db, "organisation", "data");
    const adminData = await getDoc(adminRef);
    setAdmin({
      designation: adminData.get("designation"),
      superAdminName: adminData.get("superAdminName"),
      imageUrl: adminData.get("imageUrl"),
    });
  };

  React.useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="sticky top-0 z-50  px-4 py-2    bg-secondary">
      <div className="mx-auto flex max-w-7xl items-center justify-between ">
        <Link href="/">
          <div className="space-x-2 flex items-center cursor-pointer">
            <img src="/Logo 1.svg" className="h-8" alt="" />
          </div>
        </Link>

        <div>
          {user == null ? (
            <RaisedButton buttonName="Login" link="/login" />
          ) : (
            <div className="flex space-x-4 items-center">
              <div className="">
                <h1 className="-mb-1 font-secondaryTypefaceDmSans text-customWhite">
                  {admin.superAdminName}
                </h1>
                <p className="text-xs font-secondaryTypefaceDmSans text-customWhite text-opacity-60">
                  {admin.designation}
                </p>
              </div>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={admin.superAdminName} src={admin.imageUrl} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        if (setting == "Logout") {
                          authLogout();
                        }
                        if (setting == "Dashboard") {
                          router.replace("/");
                        }
                      }}
                    >
                      <Typography fontFamily="DM Sans" textAlign="center">
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
