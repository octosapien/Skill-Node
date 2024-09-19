import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import isAuth, { userType } from "../modules/isAuth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = (location) => {
    console.log(location);
    navigate(location);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#232323", // Dark background color
        boxShadow: "none", // Remove shadow for a flat design
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: "#00b140", // Green text color for branding
            fontWeight: "bold",
          }}
        >
          Job Portal
        </Typography>
        <Box>
          {isAuth() ? (
            userType() === "recruiter" ? (
              <>
                <Button
                  color="inherit"
                  onClick={() => handleClick("/home")}
                  sx={{
                    color: "#fff", // White text color for all buttons
                    '&:hover': {
                      backgroundColor: "#00b140", // Green hover effect
                      color: "#fff",
                    },
                  }}
                >
                  Home
                </Button>
                <Button
                  color="inherit"
                  onClick={() => handleClick("/addjob")}
                  sx={{
                    color: "#fff",
                    '&:hover': {
                      backgroundColor: "#00b140",
                      color: "#fff",
                    },
                  }}
                > Add Jobs </Button>

                <Button color="inherit" onClick={() => handleClick("/frequently")}>
                Frequently Hired Together
                </Button>

                <Button
                  color="inherit"
                  onClick={() => handleClick("/myjobs")}
                  sx={{
                    color: "#fff",
                    '&:hover': {
                      backgroundColor: "#00b140",
                      color: "#fff",
                    },
                  }}
                >
                  My Jobs
                </Button>
                <Button
                  color="inherit"
                  onClick={() => handleClick("/employees")}
                  sx={{
                    color: "#fff",
                    '&:hover': {
                      backgroundColor: "#00b140",
                      color: "#fff",
                    },
                  }}
                >
                  Employees
                </Button>
                <Button
                  color="inherit"
                  onClick={() => handleClick("/profile")}
                  sx={{
                    color: "#fff",
                    '&:hover': {
                      backgroundColor: "#00b140",
                      color: "#fff",
                    },
                  }}
                >
                  Profile
                </Button>
                <Button
                  color="inherit"
                  onClick={() => handleClick("/logout")}
                  sx={{
                    color: "#fff",
                    '&:hover': {
                      backgroundColor: "#00b140",
                      color: "#fff",
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => handleClick("/home")}
                  sx={{
                    color: "#fff",
                    '&:hover': {
                      backgroundColor: "#00b140",
                      color: "#fff",
                    },
                  }}
                >
                  Home
                </Button>
                <Button
                  color="inherit"
                  onClick={() => handleClick("/applications")}
                  sx={{
                    color: "#fff",
                    '&:hover': {
                      backgroundColor: "#00b140",
                      color: "#fff",
                    },
                  }}
                >
                  Applications
                </Button>

                <Button 
                sx={{
                  color: "#fff",
                  '&:hover': {
                    backgroundColor: "#00b140",
                    color: "#fff",
                  },
                }}
                color="inherit" onClick={() => handleClick("/frequently")}>
                Frequently Hired Together
                </Button>

                <Button
                  color="inherit"
                  onClick={() => handleClick("/profile")}
                  sx={{
                    color: "#fff",
                    '&:hover': {
                      backgroundColor: "#00b140",
                      color: "#fff",
                    },
                  }}
                >
                  Profile
                </Button>
                <Button
                  color="inherit"
                  onClick={() => handleClick("/logout")}
                  sx={{
                    color: "#fff",
                    '&:hover': {
                      backgroundColor: "#00b140",
                      color: "#fff",
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            )
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => handleClick("/login")}
                sx={{
                  color: "#fff",
                  '&:hover': {
                    backgroundColor: "#00b140",
                    color: "#fff",
                  },
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                onClick={() => handleClick("/signup")}
                sx={{
                  color: "#fff",
                  '&:hover': {
                    backgroundColor: "#00b140",
                    color: "#fff",
                  },
                }}
              >
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;