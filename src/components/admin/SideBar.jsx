import React, { useEffect, useState } from "react";
import {
  Dashboard as DashboardIcon,
  PeopleAlt as PeopleAltIcon,
  Devices as DevicesIcon,
  CardGiftcard as CardGiftcardIcon,
  BarChart as BarChartIcon,
  CalendarMonth as CalendarMonthIcon,
  CloudUpload as CloudUploadIcon,
  Settings as SettingsIcon,
  HelpOutline as HelpOutlineIcon,
  Close as CloseIcon,
  MonetizationOn as MonetizationOnIcon,
  HeadsetMic as HeadsetMicIcon,
  Assignment as AssignmentIcon,
  DevicesOther as DevicesOtherIcon,
  Slideshow as SlideshowIcon,
} from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Tooltip from '@mui/material/Tooltip';
import "../../assets/css/Sidebar.css";
import { NavLink } from "react-router-dom";
import nipd from '../../assets/images/in4logo.png';
import { useDispatch } from "react-redux";
import { toggleActiveTab } from "../../redux/reducers/tabsReducer";
import { useSelector } from 'react-redux';

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  const dispatch = useDispatch();
  const activeSidebarTab = useSelector((state) => {
    console.log('State:', state);
    return state.tabs.activeTab;
  });
  console.log("Weertyuio",activeSidebarTab)
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [navList, setNavList] = useState(activeSidebarTab);

  const handleResize = () => {
    if (window.innerWidth >= 992) {
      window.location.reload();
    }
    setIsLargeScreen(window.innerWidth >= 992);
  };
  useEffect(() => {
    setNavList(activeSidebarTab);
  }, [activeSidebarTab]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavLinkClick = () => {
    if (!isLargeScreen) {
      OpenSidebar();
    //   dispatch(toggleSidebar());
    }
  };

  const handleSubMenuToggle = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <aside id="sidebar" style={{ width: 250 }} className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      <div className="sidebar-title">
        <div className="sidebar-brand d-flex align-items-center">
          <div className="logo-div d-flex align-items-center">
            <Tooltip title="in4msme portal">
            <NavLink to="/Dashboard" onClick={() =>{
        handleNavLinkClick()
        dispatch(toggleActiveTab({ activeTab: 1 }));
       // setNavList(activeSidebarTab);
      }} style={{textDecoration: 'none'}}><h3 className="title text">in4msme portal</h3></NavLink>
            </Tooltip>
            
          </div>
        </div>
        <span className="close_icon">
          <CloseIcon
            onClick={handleNavLinkClick}
            style={{ fontSize: "2rem",color: "white" }}
          />
        </span>
      </div>
      <hr className="line" />

      <ul className="sidebar-list">
      <NavLink to="/Dashboard" onClick={() =>{
        handleNavLinkClick()
        dispatch(toggleActiveTab({ activeTab: 1 }));
        //setNavList(activeSidebarTab);
        //setNavList("1");
      }} >
        <li className={navList  === 1 ? "backNav": "sidebar-list-item"}>
          <DashboardIcon /> Dashboard
        </li>
      </NavLink>
      <NavLink to="/Msme" onClick={() =>{
        handleNavLinkClick()
        dispatch(toggleActiveTab({ activeTab: 2 }));
        //setNavList(activeSidebarTab);
        //setNavList("2");
      }}>
        <li className={navList  === 2 ? "backNav": "sidebar-list-item"}>
          <AddBusinessIcon /> Manage MSMEs
        </li>
      </NavLink>
      <NavLink to="/Users" onClick={() =>{
        handleNavLinkClick()
        dispatch(toggleActiveTab({ activeTab: 3 }));
        //setNavList(activeSidebarTab);
        //setNavList("3");
      }}>
        <li className={navList  === 3 ? "backNav": "sidebar-list-item"}>
          <PeopleAltIcon /> Manage USERs
        </li>
      </NavLink>
      <NavLink to="/Bso" onClick={() =>{
        handleNavLinkClick()
        dispatch(toggleActiveTab({ activeTab: 4 }));
        //setNavList(activeSidebarTab);
        //setNavList("4");
      }}>
        <li className={navList  === 4 ? "backNav": "sidebar-list-item"}>
          <DevicesOtherIcon /> Manage BSOs
        </li>
      </NavLink>
      <NavLink to="/Content" onClick={() =>{
        handleNavLinkClick()
        dispatch(toggleActiveTab({ activeTab: 5 }));
       // setNavList(activeSidebarTab);
        //setNavList("5");
      }}>
        <li className={navList  === 5 ? "backNav": "sidebar-list-item"}>
          <AssignmentIcon /> Manage Content
        </li>
      </NavLink>
      <NavLink to="/Notifications" onClick={() =>{
        handleNavLinkClick()
        dispatch(toggleActiveTab({ activeTab: 6 }));
        //setNavList(activeSidebarTab);
        //setNavList("6");
      }}>
        <li className={navList  === 6 ? "backNav": "sidebar-list-item"}>
          <NotificationsIcon /> Notifications
        </li>
      </NavLink>
      <NavLink to="/Reporting" onClick={() =>{
        handleNavLinkClick()
        dispatch(toggleActiveTab({ activeTab: 7 }));
        //setNavList(activeSidebarTab);
        //setNavList("7");
      }}>
        <li className={navList  === 7 ? "backNav": "sidebar-list-item"}>
          <PictureAsPdfIcon /> Reporting
        </li>
      </NavLink>

        {/* {role === 3 && renderUserLinks()}  */}
        <NavLink to="/Profile" onClick={() =>{
        handleNavLinkClick()
        dispatch(toggleActiveTab({ activeTab: 8 }));
        //setNavList(activeSidebarTab);
        //setNavList("8");
      }}>
          <li className={navList  === 8 ? "backNav": "sidebar-list-item"}>
            <AccountCircleIcon /> Profile
          </li>
        </NavLink>
      </ul>
    </aside>
  );
};

export default Sidebar;