import React, { useEffect, useState } from "react";
import { Box, IconButton, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/images/nipdb-logo.jpg";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "@mui/material/Badge";
import { BsPersonGear, BsGear, BsBoxArrowRight } from "react-icons/bs";
import "../../assets/css/TopBar.css";
import { useDispatch, useSelector } from "react-redux";
import { CapitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { toggleSidebarfalse } from "../../redux/reducers/sidebarReducer";
import { login } from "../../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { toggleActiveTab } from "../../redux/reducers/tabsReducer";
import Swal from "sweetalert2";

const Topbar = ({ OpenSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  let fullName = currentUser?.firstName + currentUser?.lastName;
  const [allNotificationsCount,setAllNotificationsCount] = useState(0);
  let firstLetter = CapitalizeFirstLetter(currentUser?.firstName);
  let secondLetter = CapitalizeFirstLetter(currentUser?.lastName);

  useEffect(() => {
    const fetchAllAdminNotificationsCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/notifications/admin/totalNotificationCount`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok) {
          console.log("Login successful", data);
          setAllNotificationsCount(data.count);
        } else {
        }
      } catch (error) {}
    };

    fetchAllAdminNotificationsCount();
  }, [isSubmitting]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/auth/admin/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful", data);

        dispatch(toggleSidebarfalse());
        dispatch(
          login({
            user: {},
          })
        );
        navigate("/");
      } else {
        dispatch(toggleSidebarfalse());
        dispatch(
          login({
            user: {},
          })
        );
        navigate("/");
      }
    } catch (error) {
      // Handle the network error
      // For example, show an error message
      // toast.error("Network error. Please check your network connection and try again");
    }
  };
  console.log(currentUser)
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      borderBottom="1px solid #DCDCDC"
    >
      <div className="d-none d-lg-block">
        <Box display="flex" borderRadius="3px" height={"45px"}>
          <img rounded-full w-8 h-8 src={logo} alt="user-profile" />
        </Box>
      </div>
      <div className="d-block d-lg-none" style={{ cursor: "pointer" }}>
        <MenuIcon style={{ fontSize: "1.8rem" }} onClick={OpenSidebar} />
      </div>

      <Box display="flex" alignItems="center">
        {
          allNotificationsCount === 0 ?<>
          <div className="mtop" href="/notifications" onClick={() =>{
             dispatch(toggleActiveTab({ activeTab: 6 }));
             navigate('/notifications')
          }}>
          <IconButton>
              <NotificationsOutlinedIcon />
          </IconButton>
        </div>
          </>: <>
          <div className="mtop" href="/notifications" onClick={() =>{

             dispatch(toggleActiveTab({ activeTab: 6 }));
             navigate('/notifications')
          }}>
          <IconButton>
            <Badge badgeContent={allNotificationsCount} max={99} color="primary">
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>
        </div>
          </>
        }

        <div className="d-none d-sm-inline-flex">
          <div
            className="wapper-topbar"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            <p className="username-text">
              {fullName.length <= 14
                ? currentUser?.firstName + " " + currentUser?.lastName
                : currentUser?.lastName}
            </p>
            <p className="role-text">{currentUser?.role}</p>
          </div>
        </div>
        
        {currentUser?.profileImage ? (
          <Avatar alt="User Profile" src={currentUser?.profileImage} />
        ) : (
          <Avatar
            sx={{ bgcolor: "#1976d2" }}
          >{`${firstLetter}${secondLetter}`}</Avatar>
        )}

        <Dropdown className="dropdown" autoClose="outside">
          <Dropdown.Toggle variant="" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu">
            <Dropdown.Item  href="/profile" onClick={() =>{
               dispatch(toggleActiveTab({ activeTab: 8 }));
            }}>
              <BsPersonGear style={{ marginRight: "10px" }} />
              Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>
              <BsBoxArrowRight style={{ marginRight: "10px" }} />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Box>
    </Box>
  );
};

export default Topbar;
