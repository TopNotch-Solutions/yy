import React, { useEffect, useRef, useState } from "react";
import { IconButton, useTheme, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import "../assets/css/msme.css";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { SlOptionsVertical } from "react-icons/sl";
import Swal from "sweetalert2";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MyButton from "../components/commons/MyButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Stepper from "@mui/material/Stepper";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ModelButton from "../components/commons/ModelButton";
import { useNavigate } from "react-router-dom";
import { updateToken } from "../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebarfalse } from "../redux/reducers/sidebarReducer";
import { login } from "../redux/reducers/authReducer";

const mobileStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "80%",
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

const largeStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "70%",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

const steps = [
  "General business information",
  "Founder's information",
  "Contact information",
  "Business hours",
  "Additional information",
];

function Msme() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const inputRef = useRef();
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);
  const [fileBusinessLogo, setFileBusinessLogo] = useState(null);
  const [fileImage1, setFileImage1] = useState(null);
  const [fileImage2, setFileImage2] = useState(null);
  const [fileImage3, setFileImage3] = useState(null);
  const [fileBuinessLogoDetails, setFileBuinessLogoDetails] = useState(null);
  const [fileImage1Details, setFileImage1Details] = useState(null);
  const [fileImage2Details, setFileImage2Details] = useState(null);
  const [fileImage3Details, setFileImage3Details] = useState(null);

  const [totalRegisteration, setTotalRegistration] = useState("");
  const [pendingRegisteration, setPendingRegistration] = useState("");
  const [rejectedRegisteration, setRejectedRegistration] = useState("");
  const [allMSMEList, setAllMSMEList] = useState([]);
  const [pendingMSMEList, setPendingMSMEList] = useState([]);
  const [rejectedMSMEList, setRejectedMSMEList] = useState([]);
  const [approvedMSMEList, setApprovedMSMEList] = useState([]);
  const [approvedRegisteration, setIApprovedRegistration] = useState("");
  const [stepperCounter, setStepperCounter] = useState(0);
  const [buttonActive, setButonActive] = useState(1);
  const [businessRegistrationName, setBusinessRegistrationName] = useState("");
  const [businessRegistrationNameError, setBusinessRegistrationNameError] =
    useState("");
  const [businessRegistrationNumber, setBusinessRegistrationNumber] =
    useState("");
  const [businessRegistrationNumberError, setBusinessRegistrationNumberError] =
    useState("");
  const [businessDisplayName, setBusinessDisplayName] = useState("");
  const [businessDisplayNameError, setBusinessDisplayNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [typeOfBusiness, setTypeOfBusiness] = useState("");
  const [typeOfBusinessError, setTypeOfBusinessError] = useState("");
  const [region, setRegion] = useState("");
  const [regionError, setRegionError] = useState("");
  const [town, setTown] = useState("");
  const [townError, setTownError] = useState("");
  const [primaryIndustry, setPrimaryIndustry] = useState("");
  const [primaryIndustryError, setPrimaryIndustryError] = useState("");
  const [secondaryIndustry, setSecondaryIndustry] = useState("");
  const [secondaryIndustryError, setSecondaryIndustryError] = useState("");
  const [yearOfEstablishment, setYearOfEstablishment] = useState("");
  const [yearOfEstablishmentError, setYearOfEstablishmentError] = useState("");
  const [annualTurnover, setAnnualTurnover] = useState("");
  const [annualTurnoverError, setAnnualTurnoverError] = useState("");
  const [userId, setUserId] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [regionList, setRegionList] = useState([]);
  const [townList, setTownList] = useState([]);
  const [primaryIndustryList, setPrimaryIndustryList] = useState([]);
  const [secondaryList, setSecondaryList] = useState([]);
  const [allUserList, setAllUserList] = useState([]);
  const [foundersName, setFoundersName] = useState("");
  const [foundersNameError, setFoundersNameError] = useState("");
  const [foundersGender, setFoundersGender] = useState("");
  const [foundersGenderError, setFoundersGenderError] = useState("");
  const [foundersAge, setFoundersAge] = useState("");
  const [foundersAgeError, setFoundersAgeError] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [monday, setMonday] = useState("");
  const [tuesday, setTuesday] = useState("");
  const [wednesday, setWednesday] = useState("");
  const [thursday, setThursday] = useState("");
  const [friday, setFriday] = useState("");
  const [saturday, setSaturday] = useState("");
  const [sunday, setSunday] = useState("");
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [businessLogo, setBusinessLogo] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [businessAddressError, setBusinessAddressError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [whatsAppNumberError, setWhatsAppNumberError] = useState("");
  const [businessEmailError, setBusinessEmailError] = useState("");
  const [websiteLinkError, setWebsiteLinkError] = useState("");
  const [twitterLinkError, setTwitterLinkError] = useState("");
  const [facebookLinkError, setFacebookLinkError] = useState("");
  const [instagramLinkError, setInstagramLinkError] = useState("");
  const [linkedInLinkError, setLinkedInLinkError] = useState("");
  const [mondayError, setMondayError] = useState("");
  const [tuesdayError, setTuesdayError] = useState("");
  const [wednesdayError, setWednesdayError] = useState("");
  const [thursdayError, setThursdayError] = useState("");
  const [fridayError, setFridayError] = useState("");
  const [saturdayError, setSaturdayError] = useState("");
  const [sundayError, setSundayError] = useState("");
  const [numberOfEmployeesError, setNumberOfEmployeesError] = useState("");
  const [businessLogoError, setBusinessLogoError] = useState("");
  const [image1Error, setImage1Error] = useState("");
  const [image2Error, setImage2Error] = useState("");
  const [image3Error, setImage3Error] = useState("");
  const [mondayFrom, setMondayFrom] = useState("");
  const [mondayTo, setMondayTo] = useState("");
  const [tuesdayFrom, setTuesdayFrom] = useState("");
  const [tuesdayTo, setTuesdayTo] = useState("");
  const [wednesdayFrom, setWednesdayFrom] = useState("");
  const [wednesdayTo, setWednesdayTo] = useState("");
  const [thursdayFrom, setThursdayFrom] = useState("");
  const [thursdayTo, setThursdayTo] = useState("");
  const [fridayFrom, setFridayFrom] = useState("");
  const [fridayTo, setFridayTo] = useState("");
  const [saturdayFrom, setSaturdayFrom] = useState("");
  const [saturdayTo, setSaturdayTo] = useState("");
  const [sundayFrom, setSundayFrom] = useState("");
  const [sundayTo, setSundayTo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorFromAPI, setErrorFromAPI] = useState("'");

  const [searchQuery, setSearchQuery] = useState("");
  const [updatingDetails, setUpdatingDetails] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [openModelView, setOpenModelView] = useState(false);

  const [businessRegistrationNameDetails, setBusinessRegistrationNameDetails] =
    useState("");
  const [
    businessRegistrationNameDetailsError,
    setBusinessRegistrationNameDetailsError,
  ] = useState("");
  const [
    businessRegistrationNumberDetails,
    setBusinessRegistrationNumberDetails,
  ] = useState("");
  const [
    businessRegistrationNumberDetailsError,
    setBusinessRegistrationNumberDetailsError,
  ] = useState("");
  const [businessDisplayNameDetails, setBusinessDisplayNameDetails] =
    useState("");
  const [businessDisplayNameDetailsError, setBusinessDisplayNameDetailsError] =
    useState("");
  const [descriptionDetails, setDescriptionDetails] = useState("");
  const [descriptionDetailsError, setDescriptionDetailsError] = useState("");
  const [typeOfBusinessDetails, setTypeOfBusinessDetails] = useState("");
  const [typeOfBusinessDetailsError, setTypeOfBusinessDetailsError] =
    useState("");
  const [regionDetails, setRegionDetails] = useState("");
  const [regionDetailsError, setRegionDetailsError] = useState("");
  const [townDetails, setTownDetails] = useState("");
  const [townDetailsError, setTownDetailsError] = useState("");
  const [primaryIndustryDetails, setPrimaryIndustryDetails] = useState("");
  const [primaryIndustryDetailsError, setPrimaryIndustryDetailsError] =
    useState("");
  const [secondaryIndustryDetails, setSecondaryIndustryDetails] = useState("");
  const [secondaryIndustryDetailsError, setSecondaryIndustryDetailsError] =
    useState("");
  const [yearOfEstablishmentDetails, setYearOfEstablishmentDetails] =
    useState("");
  const [yearOfEstablishmentDetailsError, setYearOfEstablishmentDetailsError] =
    useState("");
  const [annualTurnoverDetails, setAnnualTurnoverDetails] = useState("");
  const [annualTurnoverDetailsError, setAnnualTurnoverDetailsError] =
    useState("");
  const [foundersNameDetails, setFoundersNameDetails] = useState("");
  const [foundersNameDetailsError, setFoundersNameDetailsError] = useState("");
  const [foundersGenderDetails, setFoundersGenderDetails] = useState("");
  const [foundersGenderDetailsError, setFoundersGenderDetailsError] =
    useState("");
  const [foundersAgeDetails, setFoundersAgeDetails] = useState("");
  const [foundersAgeDetailsError, setFoundersAgeDetailsError] = useState("");
  const [businessAddressDetails, setBusinessAddressDetails] = useState("");
  const [phoneNumberDetails, setPhoneNumberDetails] = useState("");
  const [whatsAppNumberDetails, setWhatsAppNumberDetails] = useState("");
  const [businessEmailDetails, setBusinessEmailDetails] = useState("");
  const [websiteLinkDetails, setWebsiteLinkDetails] = useState("");
  const [twitterLinkDetails, setTwitterLinkDetails] = useState("");
  const [facebookLinkDetails, setFacebookLinkDetails] = useState("");
  const [instagramLinkDetails, setInstagramLinkDetails] = useState("");
  const [linkedInLinkDetails, setLinkedInLinkDetails] = useState("");
  const [businessAddressDetailsError, setBusinessAddressDetailsError] =
    useState("");
  const [phoneNumberDetailsError, setPhoneNumberDetailsError] = useState("");
  const [whatsAppNumberDetailsError, setWhatsAppNumberDetailsError] =
    useState("");
  const [businessEmailDetailsError, setBusinessEmailDetailsError] =
    useState("");
  const [websiteLinkDetailsError, setWebsiteLinkDetailsError] = useState("");
  const [twitterLinkDetailsError, setTwitterLinkDetailsError] = useState("");
  const [facebookLinkDetailsError, setFacebookLinkDetailsError] = useState("");
  const [instagramLinkDetailsError, setInstagramLinkDetailsError] =
    useState("");
  const [linkedInLinkDetailsError, setLinkedInLinkDetailsError] = useState("");
  const [mondayDetails, setMondayDetails] = useState("");
  const [tuesdayDetails, setTuesdayDetails] = useState("");
  const [wednesdayDetails, setWednesdayDetails] = useState("");
  const [thursdayDetails, setThursdayDetails] = useState("");
  const [fridayDetails, setFridayDetails] = useState("");
  const [saturdayDetails, setSaturdayDetails] = useState("");
  const [sundayDetails, setSundayDetails] = useState("");
  const [mondayDetailsError, setMondayDetailsError] = useState("");
  const [tuesdayDetailsError, setTuesdayDetailsError] = useState("");
  const [wednesdayDetailsError, setWednesdayDetailsError] = useState("");
  const [thursdayDetailsError, setThursdayDetailsError] = useState("");
  const [fridayDetailsError, setFridayDetailsError] = useState("");
  const [saturdayDetailsError, setSaturdayDetailsError] = useState("");
  const [sundayDetailsError, setSundayDetailsError] = useState("");

  const tokenHeader = currentUser.token;

  const handleOpen = () => setOpenModel(true);
  const handleClose = () => {
    setOpenModel(false);
  };
  const handleOpenView = () => setOpenModelView(true);
  const handleCloseView = () => {
    setUpdatingDetails([]);
    setOpenModelView(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/msme/admin/totalCount",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenHeader}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get('Authorization');
        dispatch(updateToken({
          token: newTokenHeader
        }));

        if (response.ok) {
          console.log("Login successful", data);
          setTotalRegistration(data.count);
        } else {
          if(!currentUser.token){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {
        if(!currentUser.token){
          dispatch(toggleSidebarfalse());
        dispatch(
          login({
            user: {},
          })
        );
        navigate("/");
        }
      }
    };

    fetchTotalCount();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/msme/admin/pendingCount",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenHeader}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get('Authorization');
        dispatch(updateToken({
          token: newTokenHeader
        }));

        if (response.ok) {
          console.log("Login successful", data);
          setPendingRegistration(data.count);
        } else {
          if(!currentUser.token){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {
        if(!currentUser.token){
          dispatch(toggleSidebarfalse());
        dispatch(
          login({
            user: {},
          })
        );
        navigate("/");
        }
      }
    };

    fetchPendingCount();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchRejectedCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/msme/admin/rejectedCount",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenHeader}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get('Authorization');
        dispatch(updateToken({
          token: newTokenHeader
        }));

        if (response.ok) {
          console.log("Login successful", data);
          setRejectedRegistration(data.count);
        } else {
          if(!currentUser.token){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {
        if(!currentUser.token){
          dispatch(toggleSidebarfalse());
        dispatch(
          login({
            user: {},
          })
        );
        navigate("/");
        }
      }
    };

    fetchRejectedCount();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchApprovedCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/msme/admin/approvedCount",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenHeader}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get('Authorization');
        dispatch(updateToken({
          token: newTokenHeader
        }));

        if (response.ok) {
          console.log("Login successful", data);
          setIApprovedRegistration(data.count);
        } else {
          if(!currentUser.token){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {
        if(!currentUser.token){
          dispatch(toggleSidebarfalse());
        dispatch(
          login({
            user: {},
          })
        );
        navigate("/");
        }
      }
    };

    fetchApprovedCount();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchMsmeAllMSME = async () => {
      try {
        const response = await fetch("http://localhost:4000/msme/admin/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenHeader}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      const newTokenHeader = response.headers.get('Authorization');
      dispatch(updateToken({
        token: newTokenHeader
      }));

        if (response.ok) {
          console.log("Login successful", data);
          setAllMSMEList(data.data);
        } else {
          if(!currentUser.token){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {
        if(!currentUser.token){
          dispatch(toggleSidebarfalse());
        dispatch(
          login({
            user: {},
          })
        );
        navigate("/");
        }
      }
    };

    fetchMsmeAllMSME();
  }, [isSubmitting]);
  useEffect(() => {
    const fetchMsmePendingMSME = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/msme/admin/all/pending",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenHeader}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get('Authorization');
        dispatch(updateToken({
          token: newTokenHeader
        }));

        if (response.ok) {
          console.log("Login successful", data);
          setPendingMSMEList(data.data);
        } else {
          if(!currentUser.token){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {
        if(!currentUser.token){
          dispatch(toggleSidebarfalse());
        dispatch(
          login({
            user: {},
          })
        );
        navigate("/");
        }
      }
    };

    fetchMsmePendingMSME();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchMsmeRejectedMSME = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/msme/admin/all/rejected",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenHeader}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get('Authorization');
        dispatch(updateToken({
          token: newTokenHeader
        }));

        if (response.ok) {
          console.log("Login successful", data);
          setRejectedMSMEList(data.data);
        } else {
          if(!currentUser.token){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {
        if(!currentUser.token){
          dispatch(toggleSidebarfalse());
        dispatch(
          login({
            user: {},
          })
        );
        navigate("/");
        }
      }
    };

    fetchMsmeRejectedMSME();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchMsmeApprovedMSME = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/msme/admin/all/approved",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenHeader}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get('Authorization');
        dispatch(updateToken({
          token: newTokenHeader
        }));

        if (response.ok) {
          console.log("Login successful", data);
          setApprovedMSMEList(data.data);
        } else {
          if(!currentUser.token){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {
        if(!currentUser.token){
          dispatch(toggleSidebarfalse());
        dispatch(
          login({
            user: {},
          })
        );
        navigate("/");
        }
      }
    };

    fetchMsmeApprovedMSME();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchAllRegions = async () => {
      try {
        const response = await fetch("http://localhost:4000/region/admin/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenHeader}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      const newTokenHeader = response.headers.get('Authorization');
      dispatch(updateToken({
        token: newTokenHeader
      }));

        if (response.ok) {
          console.log("Login successful", data);
          setRegionList(data.data);
        } else {
          if(!currentUser.token){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {
        if(!currentUser.token){
          dispatch(toggleSidebarfalse());
        dispatch(
          login({
            user: {},
          })
        );
        navigate("/");
        }
      }
    };

    fetchAllRegions();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchAllTowns = async () => {
      try {
        const response = await fetch("http://localhost:4000/town/admin/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenHeader}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      const newTokenHeader = response.headers.get('Authorization');
      dispatch(updateToken({
        token: newTokenHeader
      }));

        if (response.ok) {
          console.log("Login successful", data);
          setTownList(data.data);
        } else {
          if(!currentUser.token){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {
        if(!currentUser.token){
          dispatch(toggleSidebarfalse());
        dispatch(
          login({
            user: {},
          })
        );
        navigate("/");
        }
      }
    };

    fetchAllTowns();
  }, [isSubmitting]);
  useEffect(() => {
    const fetchAllPrimaryIndustryList = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/primaryIndustry/admin/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenHeader}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get('Authorization');
        dispatch(updateToken({
          token: newTokenHeader
        }));

        if (response.ok) {
          console.log("Login successful", data);
          setPrimaryIndustryList(data.data);
        } else {
          if(!currentUser.token){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {
        if(!currentUser.token){
          dispatch(toggleSidebarfalse());
        dispatch(
          login({
            user: {},
          })
        );
        navigate("/");
        }
      }
    };

    fetchAllPrimaryIndustryList();
  }, [isSubmitting]);
  useEffect(() => {
    const fetchAllSeconaryList = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/secondaryIndustry/admin/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenHeader}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get('Authorization');
        dispatch(updateToken({
          token: newTokenHeader
        }));

        if (response.ok) {
          console.log("Login successful", data);
          setSecondaryList(data.data);
        } else {
          if(!currentUser.token){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {
        if(!currentUser.token){
          dispatch(toggleSidebarfalse());
        dispatch(
          login({
            user: {},
          })
        );
        navigate("/");
        }
      }
    };

    fetchAllSeconaryList();
  }, [isSubmitting]);
  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/msme/admin/all/user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenHeader}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get('Authorization');
        dispatch(updateToken({
          token: newTokenHeader
        }));

        if (response.ok) {
          console.log("Login successful", data);
          setAllUserList(data.data);
        } else {
          if(!currentUser.token){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {
        if(!currentUser.token){
          dispatch(toggleSidebarfalse());
        dispatch(
          login({
            user: {},
          })
        );
        navigate("/");
        }
      }
    };

    fetchAllUser();
  }, [isSubmitting]);

  const fields1 = [
    {
      value: businessRegistrationName,
      setError: setBusinessRegistrationNameError,
      name: "Business Registration Name",
    },
    {
      value: businessDisplayName,
      setError: setBusinessDisplayNameError,
      name: "Business Display Name",
    },
    { value: description, setError: setDescriptionError, name: "Description" },
    {
      value: typeOfBusiness,
      setError: setTypeOfBusinessError,
      name: "Type of Business",
    },
    { value: region, setError: setRegionError, name: "Region" },
    { value: town, setError: setTownError, name: "Town" },
    {
      value: primaryIndustry,
      setError: setPrimaryIndustryError,
      name: "Primary Industry",
    },
    {
      value: yearOfEstablishment,
      setError: setYearOfEstablishmentError,
      name: "Year of Establishment",
    },
    {
      value: annualTurnover,
      setError: setAnnualTurnoverError,
      name: "Annual Turnover",
    },
    { value: userId, setError: setUserIdError, name: "User Name" },
  ];
  const fields2 = [
    {
      value: foundersName,
      setError: setFoundersNameError,
      name: "Founder's Name",
    },
    {
      value: foundersGender,
      setError: setFoundersGenderError,
      name: "Founder's Gender",
    },
    {
      value: foundersAge,
      setError: setFoundersAgeError,
      name: "Founder's Age",
    },
  ];
  const fields3 = [
    {
      value: businessAddress,
      setError: setBusinessAddressError,
      name: "Business Address",
    },
    { value: phoneNumber, setError: setPhoneNumberError, name: "Phone Number" },
    { value: businessEmail, setError: setBusinessEmailError, name: "Email" },
  ];
  const fields4 = [
    { value: mondayFrom, setError: setMondayError, name: "Monday From" },
    { value: mondayTo, setError: setMondayError, name: "Monday To" },
    { value: tuesdayFrom, setError: setTuesdayError, name: "Tuesday From" },
    { value: tuesdayTo, setError: setTuesdayError, name: "Tuesday To" },
    {
      value: wednesdayFrom,
      setError: setWednesdayError,
      name: "Wednesday From",
    },
    { value: wednesdayTo, setError: setWednesdayError, name: "Wednesday To" },
    { value: thursdayFrom, setError: setThursdayError, name: "Thursday From" },
    { value: thursdayTo, setError: setThursdayError, name: "Thursday To" },
    { value: fridayFrom, setError: setFridayError, name: "Friday From" },
    { value: fridayTo, setError: setFridayError, name: "Friday To" },
    { value: saturdayFrom, setError: setSaturdayError, name: "Saturday From" },
    { value: saturdayTo, setError: setSaturdayError, name: "Saturday To" },
    { value: sundayFrom, setError: setSundayError, name: "Sunday From" },
    { value: sundayTo, setError: setSundayError, name: "Sunday To" },
  ];
  const fields5 = [
    {
      value: numberOfEmployees,
      setError: setNumberOfEmployeesError,
      name: "Number of Employees",
    },
  ];
  const validateFields1 = () => {
    let isValid = true;
    fields1.forEach((field) => {
      field.setError("");
      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      }
    });
    return isValid;
  };

  const validateFields2 = () => {
    let isValid = true;
    fields2.forEach((field) => {
      field.setError("");
      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      }
    });
    return isValid;
  };
  const validateFields3 = () => {
    let isValid = true;
    fields3.forEach((field) => {
      field.setError("");
      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      }
    });
    return isValid;
  };

  const validateFields4 = () => {
    let isValid = true;
    fields4.forEach((field) => {
      field.setError("");
      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      }
    });
    return isValid;
  };

  const validateFields5 = () => {
    let isValid = true;
    fields5.forEach((field) => {
      field.setError("");
      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      }
    });
    return isValid;
  };
  const isValidURL = (url) => {
    const regex = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!regex.test(url);
  };

  const isValidEmail = (e) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(e);
  };

  const handleStep1 = () => {
    if (typeOfBusiness === "" || typeOfBusiness === "") {
      fields1.push({
        value: businessRegistrationNumber,
        setError: setBusinessRegistrationNumberError,
        name: "Business Registration Number",
      });
    }
    if (validateFields1()) {
      setStepperCounter(1);
    }
  };
  const handleStep2 = () => {
    if (validateFields2()) {
      setStepperCounter(2);
    }
  };
  const handleStep3 = () => {
    if (websiteLink && isValidURL(websiteLink)) {
      fields3.push({
        value: websiteLink,
        setError: setWebsiteLinkError,
        name: "Valid website link",
      });
    }
    if (!isValidEmail(businessEmail)) {
      fields3.push({
        value: businessEmail,
        setError: setBusinessEmailError,
        name: "Valid email",
      });
    }
    if (twitterLink && !isValidURL(twitterLink)) {
      fields3.push({
        value: twitterLink,
        setError: setTwitterLinkError,
        name: "Valid twitter link",
      });
    }
    if (facebookLink && !isValidURL(facebookLink)) {
      fields3.push({
        value: facebookLink,
        setError: setFacebookLinkError,
        name: "Valid facebook link",
      });
    }
    if (instagramLink && !isValidURL(instagramLink)) {
      fields3.push({
        value: instagramLink,
        setError: setInstagramLinkError,
        name: "Valid instagram link",
      });
    }
    if (linkedInLink && !isValidURL(linkedInLink)) {
      fields3.push({
        value: linkedInLink,
        setError: setLinkedInLinkError,
        name: "Valid linkedIn link",
      });
    }
    if (validateFields3()) {
      setStepperCounter(3);
    }
  };
  const handleStep4 = () => {
    if (linkedInLink && !isValidURL(linkedInLink)) {
      fields3.push({
        value: linkedInLink,
        setError: setLinkedInLinkError,
        name: "Valid linkedIn link",
      });
    }
    if (validateFields4()) {
      setStepperCounter(4);
    }
  };
  const handleStep5 = async () => {
    if (validateFields5()) {
      try {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("businessRegistrationName", businessRegistrationName);
        console.log(businessRegistrationName);
        formData.append(
          "businessRegistrationNumber",
          businessRegistrationNumber
        );
        formData.append("businessDisplayName", businessDisplayName);
        formData.append("typeOfBusiness", typeOfBusiness);
        formData.append("description", description);
        formData.append("region", region);
        formData.append("town", town);
        formData.append("yearOfEstablishment", yearOfEstablishment);
        formData.append("primaryIndustry", primaryIndustry);
        formData.append("secondaryIndustry", secondaryIndustry);
        formData.append("annualTurnover", annualTurnover);
        formData.append("userId", userId);
        formData.append("founderName", foundersName);
        formData.append("founderAge", foundersAge);
        formData.append("founderGender", foundersGender);
        formData.append("businessAddress", businessAddress);
        formData.append("phoneNumber", phoneNumber);
        formData.append("whatsAppNumber", whatsAppNumber);
        formData.append("email", businessEmail);
        formData.append("website", websiteLink);
        formData.append("twitter", twitterLink);
        formData.append("facebook", facebookLink);
        formData.append("instagram", instagramLink);
        formData.append("linkedln", linkedInLink);
        formData.append("monday", mondayTo);
        formData.append("tuesday", tuesdayTo);
        formData.append("wednesday", wednesdayTo);
        formData.append("thursday", thursdayTo);
        formData.append("friday", fridayTo);
        formData.append("saturday", saturdayTo);
        formData.append("sunday", sundayTo);
        formData.append("numberOfEmployees", numberOfEmployees);
        if (fileBusinessLogo) {
          formData.append("businessLogo", fileBusinessLogo);
        }
        if (fileImage1) {
          formData.append("image1", fileImage1);
        }
        if (fileImage2) {
          formData.append("image2", fileImage2);
        }
        if (fileImage3) {
          formData.append("image3", fileImage3);
        }

        const response = await fetch(
          "http://localhost:4000/msme/admin/create",
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );

        const data = await response.json();

        if (response.ok) {
          setOpenModel(false);
          setIsSubmitting(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Record successfully inserted",
            showConfirmButton: false,
            timer: 3000,
          });
        } else {
          setIsSubmitting(false);
          setOpenModel(false);
          //await new Promise((resolve) => setTimeout(resolve, 3000));
          await Swal.fire({
            position: "center",
            icon: "error",
            title: `Internal server error: ${data.message}`,
            showConfirmButton: false,
            timer: 3000,
          });
          //setOpenModel(true);
          console.error("Submission failed:", data);
          if(!currentUser.token){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {
        setIsSubmitting(false);
        setOpenModel(false);
        Swal.fire({
          position: "center",
          icon: "question",
          title: `Check your internet connection and try again: ${error}`,
          showConfirmButton: false,
          timer: 3000,
        });
        //setOpenModel(true);
        if(!currentUser.token){
          dispatch(toggleSidebarfalse());
        dispatch(
          login({
            user: {},
          })
        );
        navigate("/");
        }
        console.error("An error occurred:", error);
      }
    }
  };
  const handleStep1Review = () => {
    setStepperCounter(1);
  };
  const handleStep2Review = () => {
    setStepperCounter(2);
  };
  const handleStep3Review = () => {
    setStepperCounter(3);
  };
  const handleStep4Review = () => {
    setStepperCounter(4);
  };
  const handleView = async (id) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        `http://localhost:4000/msme/admin/single/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenHeader}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      const newTokenHeader = response.headers.get('Authorization');
      dispatch(updateToken({
        token: newTokenHeader
      }));
      console.log("Login successful", data.data);
      if (response.ok) {
        console.log("Login successful", data.data);
        setIsSubmitting(false);
        setUpdatingDetails(data.data);

        setBusinessAddressDetails(data.data.businessRegistrationName);
        setBusinessRegistrationNameDetails(data.data.businessRegistrationName);
        setBusinessDisplayNameDetails(data.data.businessDisplayName);
        setDescriptionDetails(data.data.description);
        setTypeOfBusinessDetails(data.data.typeOfBusiness);
        setRegionDetails(data.data.region);
        setTownDetails(data.data.town);
        setPrimaryIndustryDetails(data.data.primaryIndustry);
        setSecondaryIndustryDetails(data.data.secondaryIndustry);
        setYearOfEstablishmentDetails(data.data.yearOfEstablishment);
        setAnnualTurnoverDetails(data.data.annualTurnover);
        setFoundersNameDetails(data.data.founderInfo.founderName);
        setFoundersGenderDetails(data.data.founderInfo.founderGender);
        setFoundersAgeDetails(data.data.founderInfo.founderAge);
        setBusinessAddressDetails(data.data.contactInfo.businessAddress);
        setPhoneNumberDetails(data.data.contactInfo.phoneNumber);
        setWhatsAppNumberDetails(data.data.contactInfo.whatsAppNumber);
        setBusinessEmailDetails(data.data.contactInfo.businessEmail);
        setWebsiteLinkDetails(data.data.contactInfo.website);
        setFacebookLinkDetails(data.data.contactInfo.facebook);
        setTwitterLinkDetails(data.data.contactInfo.twitter);
        setInstagramLinkDetails(data.data.contactInfo.instagram);
        setLinkedInLinkDetails(data.data.contactInfo.linkedln);
        setMondayDetails(data.data.businessHours.monday);
        setTuesdayDetails(data.data.businessHours.tuesday);
        setWednesdayDetails(data.data.businessHours.wednesday);
        setThursdayDetails(data.data.businessHours.thursday);
        setFridayDetails(data.data.businessHours.friday);
        setSaturdayDetails(data.data.businessHours.saturday);
        setSundayDetails(data.data.businessHours.sunday);

        setOpenModelView(true);
      } else {
        setIsSubmitting(false);
        await Swal.fire({
          position: "center",
          icon: "error",
          title: `${data.message}`,
          showConfirmButton: false,
          timer: 4000,
        });
        if(!currentUser.token){
          dispatch(toggleSidebarfalse());
        dispatch(
          login({
            user: {},
          })
        );
        navigate("/");
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Network Error:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Check your internet connection and try again!",
        showConfirmButton: false,
        timer: 3000,
      });
      if(!currentUser.token){
        dispatch(toggleSidebarfalse());
      dispatch(
        login({
          user: {},
        })
      );
      navigate("/");
      }
    }
  };
  const rowsIncomplete = [];

  const columns = [
    {
      field: "registrationName",
      headerName: "Registration Name",
      width: isSmallScreen ? 130 : 160,
    },
    { field: "email", headerName: "Email", width: isSmallScreen ? 140 : 160 },
    { field: "region", headerName: "Region", width: isSmallScreen ? 120 : 160 },
    { field: "town", headerName: "Town", width: isSmallScreen ? 120 : 160 },
    {
      field: "primaryIndustry",
      headerName: "Primary Industry",
      width: isSmallScreen ? 120 : 180,
    },
    {
      field: "annualTurnover",
      headerName: "Annual Turnover(N$)",
      width: isSmallScreen ? 120 : 180,
    },
    {
      field: "foundersName",
      headerName: "Founders Name",
      width: isSmallScreen ? 120 : 180,
    },
    {
      field: "status",
      headerName: "Status",
      width: isSmallScreen ? 100 : 120,
      cellClassName: (params) => {
        switch (params.value) {
          case "Pending":
            return "status-pending";
          case "Rejected":
            return "status-rejected";
          case "Approved":
            return "status-approved";
          default:
            return "";
        }
      },
    },
    {
      field: "isBlocked",
      headerName: "Blocked",
      width: isSmallScreen ? 100 : 120,
      cellClassName: (params) => {
        switch (params.value) {
          case true:
            return "status-rejected";
          case false:
            return "status-approved";
          default:
            return "";
        }
      },
    },
    {
      field: "action",
      headerName: "",
      width: 50,
      renderCell: (params) => (
        <SlOptionsVertical
          style={{
            cursor: "pointer",
          }}
          onClick={() => handleView(params.row.id)}
        />
      ),
    },
  ];
  console.log(allMSMEList);
  const rowsAll = allMSMEList.map((msme) => ({
    id: msme.id,
    registrationName: msme.businessRegistrationName,
    email: msme.contactInfo?.email,
    region: msme.region,
    town: msme.town,
    primaryIndustry: msme.primaryIndustry,
    annualTurnover: msme.annualTurnover,
    foundersName: msme.founderInfo?.founderName,
    status: msme.status,
    isBlocked: msme.isBlocked
  }));
  const filteredRows = rowsAll.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const rowsPending = pendingMSMEList.map((msme) => ({
    id: msme.id,
    registrationName: msme.businessRegistrationName,
    email: msme.contactInfo?.email,
    region: msme.region,
    town: msme.town,
    primaryIndustry: msme.primaryIndustry,
    annualTurnover: msme.annualTurnover,
    foundersName: msme.founderInfo?.founderName,
    status: msme.status,
    isBlocked: msme.isBlocked
  }));
  const rowsRejected = rejectedMSMEList.map((msme) => ({
    id: msme.id,
    registrationName: msme.businessRegistrationName,
    email: msme.contactInfo?.email,
    region: msme.region,
    town: msme.town,
    primaryIndustry: msme.primaryIndustry,
    annualTurnover: msme.annualTurnover,
    foundersName: msme.founderInfo?.founderName,
    status: msme.status,
    isBlocked: msme.isBlocked
  }));
  const rowsApproved = approvedMSMEList.map((msme) => ({
    id: msme.id,
    registrationName: msme.businessRegistrationName,
    email: msme.contactInfo?.email,
    region: msme.region,
    town: msme.town,
    primaryIndustry: msme.primaryIndustry,
    annualTurnover: msme.annualTurnover,
    foundersName: msme.founderInfo?.founderName,
    status: msme.status,
    isBlocked: msme.isBlocked
  }));

  const typeOfBusinessOptions = [
    {
      value: "Proprietary Limited Company (PTY)",
    },
    {
      value: "Close Corporation (CC)",
    },
    {
      value: "Sole Proprietary/Trader",
    },
    {
      value: "Trust",
    },
    {
      value: "Trading As",
    },
    {
      value: "Other",
    },
  ];
  const foundersGenderOptions = [
    {
      value: "Male",
    },
    {
      value: "Female",
    },
  ];
  const numberOfEmployeeOptions = [
    {
      value: "Self-employed",
    },
    {
      value: "1-10 employees",
    },
    {
      value: "11-30 employees",
    },
    {
      value: "31-100 employees",
    },
    {
      value: "100+ employees",
    },
  ];
  const regionOptions = regionList.map((option) => ({
    label: option.regionName,
    value: option.id,
  }));
  console.log(region);
  console.log(townList);
  const filteredTownOptions = townList.map((option) => ({
    value: option.townName,
  }));
  const primatyIndustryOptions = primaryIndustryList.map((option) => ({
    value: option.industryName,
  }));
  const secondaryOptions = secondaryList.map((option) => ({
    value: option.industryName,
  }));
  const userOptions = allUserList.map((option) => ({
    label: `${option.firstName} ${option.lastName}`,
    value: option.id,
  }));

  const approve = () => {
    setOpenModelView(false);
    try {
      setOpenModelView(false);
      Swal.fire({
        title: "Are you sure?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Approve it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setIsSubmitting(true);

            const response = await fetch(
              `http://localhost:4000/msme/admin/status/${updatingDetails.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${tokenHeader}`,
                },
                credentials: "include",
                body: JSON.stringify({
                  status: "Approved",
                }),
              }
            );

            const data = await response.json();
        const newTokenHeader = response.headers.get('Authorization');
        dispatch(updateToken({
          token: newTokenHeader
        }));
            console.log(data);

            if (response.ok) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "MSME Successfully Approved",
                showConfirmButton: false,
                timer: 3000,
              });
              setStepperCounter(0);
              setUpdatingDetails([]);
            } else {
              await Swal.fire({
                position: "center",
                icon: "error",
                title: `${data.message}`,
                showConfirmButton: false,
                timer: 3000,
              });
              if(!currentUser.token){
                dispatch(toggleSidebarfalse());
              dispatch(
                login({
                  user: {},
                })
              );
              navigate("/");
              }
            }
          } catch (error) {
            console.error("Network Error:", error);
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Check your internet connection and try again!",
              showConfirmButton: false,
              timer: 3000,
            });
            if(!currentUser.token){
              dispatch(toggleSidebarfalse());
            dispatch(
              login({
                user: {},
              })
            );
            navigate("/");
            }
          } finally {
            setIsSubmitting(false);
          }
        } else {
          setOpenModelView(true);
        }
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Check your internet connection and try again: ${error}`,
        showConfirmButton: false,
        timer: 4000,
      });
    }
  };
  const reject = () => {
    setOpenModelView(false);
    try {
      setOpenModelView(false);
      Swal.fire({
        title: "Are you sure?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Reject it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setIsSubmitting(true);
            const response = await fetch(
              `http://localhost:4000/msme/admin/status/${updatingDetails.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${tokenHeader}`,
                },
                credentials: "include",
                body: JSON.stringify({
                  status: "Rejected",
                }),
              }
            );

            const data = await response.json();
        const newTokenHeader = response.headers.get('Authorization');
        dispatch(updateToken({
          token: newTokenHeader
        }));
            console.log(data);

            if (response.ok) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "MSME Rejected",
                showConfirmButton: false,
                timer: 3000,
              });
              setStepperCounter(0);
              setUpdatingDetails([]);
            } else {
              await Swal.fire({
                position: "center",
                icon: "error",
                title: `${data.message}`,
                showConfirmButton: false,
                timer: 3000,
              });
              if(!currentUser.token){
                dispatch(toggleSidebarfalse());
              dispatch(
                login({
                  user: {},
                })
              );
              navigate("/");
              }
            }
          } catch (error) {
            console.error("Network Error:", error);
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Check your internet connection and try again!",
              showConfirmButton: false,
              timer: 3000,
            });
            if(!currentUser.token){
              dispatch(toggleSidebarfalse());
            dispatch(
              login({
                user: {},
              })
            );
            navigate("/");
            }
          } finally {
            setIsSubmitting(false);
          }
        } else {
          setOpenModelView(true);
        }
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Check your internet connection and try again: ${error}`,
        showConfirmButton: false,
        timer: 4000,
      });
    }
  };
  const block = () => {
    setOpenModelView(false);
    try {
      setOpenModelView(false);
      Swal.fire({
        title: "Are you sure?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Block it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setIsSubmitting(true);
            const response = await fetch(
              `http://localhost:4000/msme/admin/block/${updatingDetails.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${tokenHeader}`,
                },
                credentials: "include",
                body: JSON.stringify({
                  block: true,
                }),
              }
            );

            const data = await response.json();
        const newTokenHeader = response.headers.get('Authorization');
        dispatch(updateToken({
          token: newTokenHeader
        }));
            console.log(data);

            if (response.ok) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "MSME Block",
                showConfirmButton: false,
                timer: 3000,
              });
              setStepperCounter(0);
              setUpdatingDetails([]);
            } else {
              await Swal.fire({
                position: "center",
                icon: "error",
                title: `${data.message}`,
                showConfirmButton: false,
                timer: 3000,
              });
              if(!currentUser.token){
                dispatch(toggleSidebarfalse());
              dispatch(
                login({
                  user: {},
                })
              );
              navigate("/");
              }
            }
          } catch (error) {
            console.error("Network Error:", error);
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Check your internet connection and try again!",
              showConfirmButton: false,
              timer: 3000,
            });
            if(!currentUser.token){
              dispatch(toggleSidebarfalse());
            dispatch(
              login({
                user: {},
              })
            );
            navigate("/");
            }
          } finally {
            setIsSubmitting(false);
          }
        } else {
          setOpenModelView(true);
        }
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Check your internet connection and try again: ${error}`,
        showConfirmButton: false,
        timer: 4000,
      });
    }
  };
  const unBlock = () => {
    setOpenModelView(false);
    try {
      setOpenModelView(false);
      Swal.fire({
        title: "Are you sure?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Unblock it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setIsSubmitting(true);
            const response = await fetch(
              `http://localhost:4000/msme/admin/block/${updatingDetails.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${tokenHeader}`,
                },
                credentials: "include",
                body: JSON.stringify({
                  block: false,
                }),
              }
            );

            const data = await response.json();
        const newTokenHeader = response.headers.get('Authorization');
        dispatch(updateToken({
          token: newTokenHeader
        }));
            console.log(data);

            if (response.ok) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "MSME Unblock",
                showConfirmButton: false,
                timer: 3000,
              });
              setStepperCounter(0);
              setUpdatingDetails([]);
            } else {
              setIsSubmitting(false);
              await Swal.fire({
                position: "center",
                icon: "error",
                title: `${data.message}`,
                showConfirmButton: false,
                timer: 3000,
              });
              if(!currentUser.token){
                dispatch(toggleSidebarfalse());
              dispatch(
                login({
                  user: {},
                })
              );
              navigate("/");
              }
            }
          } catch (error) {
            console.error("Network Error:", error);
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Check your internet connection and try again!",
              showConfirmButton: false,
              timer: 3000,
            });
            if(!currentUser.token){
              dispatch(toggleSidebarfalse());
            dispatch(
              login({
                user: {},
              })
            );
            navigate("/");
            }
          } finally {
            setIsSubmitting(false);
          }
        } else {
          setOpenModelView(true);
        }
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Check your internet connection and try again: ${error}`,
        showConfirmButton: false,
        timer: 4000,
      });
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setBusinessLogoError("");

    if (selectedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedExtensions.exec(selectedFile.name)) {
        setBusinessLogoError(
          "Please upload a valid image file with .jpg, .jpeg, or .png extension."
        );
        setBusinessLogo(null);
        return;
      }

      if (!validMimeTypes.includes(selectedFile.type)) {
        setBusinessLogoError(
          "Invalid image type. Please upload a .jpg or .png image."
        );
        setBusinessLogo(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setFileBusinessLogo(selectedFile);
      setBusinessLogo(objectUrl);
    }
  };
  const handleFileChangeImage1 = (e) => {
    const selectedFile = e.target.files[0];
    setImage1Error("");

    if (selectedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedExtensions.exec(selectedFile.name)) {
        setImage1Error(
          "Please upload a valid image file with .jpg, .jpeg, or .png extension."
        );
        setImage1(null);
        return;
      }

      if (!validMimeTypes.includes(selectedFile.type)) {
        setImage1Error(
          "Invalid image type. Please upload a .jpg or .png image."
        );
        setImage1(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setFileImage1(selectedFile);
      setImage1(objectUrl);
    }
  };
  const handleFileChangeImage2 = (e) => {
    const selectedFile = e.target.files[0];
    setImage2Error("");

    if (selectedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedExtensions.exec(selectedFile.name)) {
        setImage2Error(
          "Please upload a valid image file with .jpg, .jpeg, or .png extension."
        );
        setImage2(null);
        return;
      }

      if (!validMimeTypes.includes(selectedFile.type)) {
        setImage2Error(
          "Invalid image type. Please upload a .jpg or .png image."
        );
        setImage2(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setFileImage2(selectedFile);
      setImage2(objectUrl);
    }
  };
  const handleFileChangeImage3 = (e) => {
    const selectedFile = e.target.files[0];
    setImage3Error("");

    if (selectedFile) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedExtensions.exec(selectedFile.name)) {
        setImage3Error(
          "Please upload a valid image file with .jpg, .jpeg, or .png extension."
        );
        setImage3(null);
        return;
      }

      if (!validMimeTypes.includes(selectedFile.type)) {
        setImage3Error(
          "Invalid image type. Please upload a .jpg or .png image."
        );
        setImage3(null);
        return;
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setFileImage3(selectedFile);
      setImage3(objectUrl);
    }
  };
  const clearFileInput = () => {
    if (businessLogo) {
      URL.revokeObjectURL(businessLogo);
    }
    inputRef.current.value = "";
    setBusinessLogo(null);
  };
  const clearFileInputImage1 = () => {
    if (image1) {
      URL.revokeObjectURL(image1);
    }
    inputRef1.current.value = "";
    setImage1(null);
  };
  const clearFileInputImage2 = () => {
    if (image2) {
      URL.revokeObjectURL(image2);
    }
    inputRef2.current.value = "";
    setImage2(null);
  };
  const clearFileInputImage3 = () => {
    if (image3) {
      URL.revokeObjectURL(image3);
    }
    inputRef3.current.value = "";
    setImage3(null);
  };

  return (
    <>
      {isSubmitting ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isSubmitting}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div className="container-fluid mt-4">
          <p className="msme">Manage MSMEs</p>
          <p>View, search and manage all MSME registrations and listing</p>

          <Box className="" justifyContent={"space-evenly"}>
            <Box
              display="grid"
              gridTemplateColumns={
                isSmallScreen ? "repeat(1, 1fr)" : "repeat(12, 1fr)"
              }
              gridAutoRows="140px"
              gap={isSmallScreen ? "0px" : "10px"}
            >
              <Box
                marginTop={"10px"}
                gridColumn={isSmallScreen ? "span 12" : "span 3"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <div className="col-12 p-4 shadow rounded-2">
                  <div className="d-flex justify-content-between">
                    <Tooltip title="Registered MSMEs" className="pointer">
                      <p className="text">Registered MSMEs</p>
                    </Tooltip>
                    <ArrowForwardIosIcon />
                  </div>
                  <div className="d-flex justify-content-start">
                    <div className="p-1 border rounded-2 ml-2">
                      <StickyNote2Icon sx={{ color: "rgba(21, 78, 138, 1)" }} />
                    </div>
                    <Tooltip title={totalRegisteration}>
                      <p className="digit text pointer">{totalRegisteration}</p>
                    </Tooltip>
                  </div>
                </div>
              </Box>

              <Box
                marginTop={"10px"}
                gridColumn={isSmallScreen ? "span 12" : "span 3"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <div className="col-12 p-4 shadow rounded-2">
                  <div className="d-flex justify-content-between">
                    <Tooltip title="Pending Approvals" className="pointer">
                      <p className="text">Pending Approvals</p>
                    </Tooltip>

                    <ArrowForwardIosIcon />
                  </div>
                  <div className="d-flex align-items-center justify-content-start text-center">
                    <div className="p-1 border rounded-2">
                      <StickyNote2Icon sx={{ color: "rgba(0, 149, 71, 1)" }} />
                    </div>
                    <Tooltip title={pendingRegisteration}>
                      <p className="digit text pointer">
                        {pendingRegisteration}
                      </p>
                    </Tooltip>
                  </div>
                </div>
              </Box>

              <Box
                marginTop={"10px"}
                gridColumn={isSmallScreen ? "span 12" : "span 3"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <div className="col-12 p-4 shadow rounded-2">
                  <div className="d-flex justify-content-between">
                    <Tooltip title="Rejected MSMEs" className="pointer">
                      <p className="text">Rejected MSMEs</p>
                    </Tooltip>

                    <ArrowForwardIosIcon />
                  </div>
                  <div className="d-flex align-items-center justify-content-start text-center">
                    <div className="p-1 border rounded-2">
                      <StickyNote2Icon sx={{ color: "rgba(210, 31, 53, 1)" }} />
                    </div>
                    <Tooltip title={rejectedRegisteration}>
                      <p className="digit text pointer">
                        {rejectedRegisteration}
                      </p>
                    </Tooltip>
                  </div>
                </div>
              </Box>

              <Box
                marginTop={"10px"}
                gridColumn={isSmallScreen ? "span 12" : "span 3"}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <div className="col-12 p-4 shadow rounded-2">
                  <div className="d-flex justify-content-between">
                    <Tooltip title="Approved Registrations" className="pointer">
                      <p className="text">Approved Registrations</p>
                    </Tooltip>

                    <ArrowForwardIosIcon />
                  </div>
                  <div className="d-flex align-items-center justify-content-start text-center">
                    <div className="p-1 border rounded-2">
                      <StickyNote2Icon
                        sx={{ color: "rgba(251, 177, 34, 1)" }}
                      />
                    </div>
                    <Tooltip title={approvedRegisteration}>
                      <p className="digit text pointer">
                        {approvedRegisteration}
                      </p>
                    </Tooltip>
                  </div>
                </div>
              </Box>

              <Box
                gridColumn={isSmallScreen ? "span 12" : "span 12"}
                gridRow="span 3"
              >
                <div className="col-12 mb-4 listing-msme p-4 shadow rounded-3 mb-4">
                  <div className="container-fluid">
                    <div className="row justify-content-center">
                      <div className="col-12 col-lg-12 col-xxl-10 mx-auto border d-flex flex-wrap justify-content-between p-1">
                        <button
                          className={
                            buttonActive === 1
                              ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                              : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                          }
                          onClick={() => setButonActive(1)}
                        >
                          Registered Msme
                        </button>
                        <button
                          className={
                            buttonActive === 2
                              ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                              : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                          }
                          onClick={() => setButonActive(2)}
                        >
                          Pending Approval
                        </button>
                        <button
                          className={
                            buttonActive === 5
                              ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                              : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                          }
                          onClick={() => setButonActive(5)}
                        >
                          Approved Msme
                        </button>
                        <button
                          className={
                            buttonActive === 3
                              ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                              : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                          }
                          onClick={() => setButonActive(3)}
                        >
                          Rejected Msme
                        </button>
                        <button
                          className={
                            buttonActive === 4
                              ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                              : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                          }
                          onClick={() => setButonActive(4)}
                        >
                          Incomplete Registration
                        </button>
                      </div>
                    </div>
                  </div>

                  {buttonActive === 1 && (
                    <>
                      <div className="col-12 col-lg-12 col-xxl-9 mx-auto mt-4 d-flex justify-content-end">
                        <Box
                          display="flex"
                          backgroundColor="rgba(245, 246, 248, 1)"
                          borderRadius="3px"
                          width="300px"
                          marginRight="10px"
                        >
                          {/* rgba(245, 246, 248, 1) */}
                          <InputBase
                            sx={{ ml: 2, flex: 1 }}
                            placeholder="Search for a MSME"
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <IconButton type="button" sx={{ p: 1 }}>
                            <SearchIcon />
                          </IconButton>
                        </Box>
                        <div onClick={handleOpen}>
                          <MyButton text="Add MSME" />
                        </div>
                      </div>
                      <div className="col-12 mt-1">
                        <p className="list-group">All MSME List</p>
                        <Box sx={{ height: 400, width: "100%" }}>
                          <DataGrid
                            rows={filteredRows}
                            columns={columns}
                            sx={{
                              "& .status-pending": {
                                color: "yellow",
                              },
                              "& .status-rejected": {
                                color: "red",
                              },
                              "& .status-approved": {
                                color: "green",
                              },
                            }}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 5,
                                },
                              },
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                          />
                        </Box>
                      </div>
                    </>
                  )}
                  {buttonActive === 2 && (
                    <>
                      <div className="col-12 col-lg-12 col-xxl-9 mx-auto mt-4 d-flex justify-content-end">
                        <Box
                          display="flex"
                          backgroundColor="rgba(245, 246, 248, 1)"
                          borderRadius="3px"
                          width="300px"
                          marginRight="10px"
                        >
                          {/* rgba(245, 246, 248, 1) */}
                          <InputBase
                            sx={{ ml: 2, flex: 1 }}
                            placeholder="Search for pending MSME"
                            //onChange={handleSearchChange}
                          />
                          <IconButton type="button" sx={{ p: 1 }}>
                            <SearchIcon />
                          </IconButton>
                        </Box>
                        <div onClick={handleOpen}>
                          <MyButton text="Add MSME" />
                        </div>
                      </div>
                      <div className="col-12 mt-1">
                        <p className="list-group">Pending MSME List</p>
                        <Box sx={{ height: 400, width: "100%" }}>
                          <DataGrid
                            rows={rowsPending}
                            columns={columns}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 5,
                                },
                              },
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                          />
                        </Box>
                      </div>
                    </>
                  )}
                  {buttonActive === 3 && (
                    <>
                      <div className="col-12 col-lg-12 col-xxl-9 mx-auto mt-4 d-flex justify-content-end">
                        <Box
                          display="flex"
                          backgroundColor="rgba(245, 246, 248, 1)"
                          borderRadius="3px"
                          width="300px"
                          marginRight="10px"
                        >
                          {/* rgba(245, 246, 248, 1) */}
                          <InputBase
                            sx={{ ml: 2, flex: 1 }}
                            placeholder="Search for a rejected MSME"
                            //onChange={handleSearchChange}
                          />
                          <IconButton type="button" sx={{ p: 1 }}>
                            <SearchIcon />
                          </IconButton>
                        </Box>
                        <div onClick={handleOpen}>
                          <MyButton text="Add MSME" />
                        </div>
                      </div>
                      <div className="col-12 mt-1">
                        <p className="list-group">Rejected MSME List</p>
                        <Box sx={{ height: 400, width: "100%" }}>
                          <DataGrid
                            rows={rowsRejected}
                            columns={columns}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 5,
                                },
                              },
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                          />
                        </Box>
                      </div>
                    </>
                  )}
                  {buttonActive === 4 && (
                    <>
                      <div className="col-12 col-lg-12 col-xxl-9 mx-auto mt-4 d-flex justify-content-end">
                        <Box
                          display="flex"
                          backgroundColor="rgba(245, 246, 248, 1)"
                          borderRadius="3px"
                          width="300px"
                          marginRight="10px"
                        >
                          {/* rgba(245, 246, 248, 1) */}
                          <InputBase
                            sx={{ ml: 2, flex: 1 }}
                            placeholder="Search for a incomplete"
                            //onChange={handleSearchChange}
                          />
                          <IconButton type="button" sx={{ p: 1 }}>
                            <SearchIcon />
                          </IconButton>
                        </Box>
                        <div onClick={handleOpen}>
                          <MyButton text="Add MSME" />
                        </div>
                      </div>
                      <div className="col-12 mt-1">
                        <p className="list-group">Incomplete MSME List</p>
                        <Box sx={{ height: 400, width: "100%" }}>
                          <DataGrid
                            rows={rowsIncomplete}
                            columns={columns}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 5,
                                },
                              },
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                          />
                        </Box>
                      </div>
                    </>
                  )}
                  {buttonActive === 5 && (
                    <>
                      <div className="col-12 col-lg-12 col-xxl-9 mx-auto mt-4 d-flex justify-content-end">
                        <Box
                          display="flex"
                          backgroundColor="rgba(245, 246, 248, 1)"
                          borderRadius="3px"
                          width="300px"
                          marginRight="10px"
                        >
                          {/* rgba(245, 246, 248, 1) */}
                          <InputBase
                            sx={{ ml: 2, flex: 1 }}
                            placeholder="Search for approved msme"
                            //onChange={handleSearchChange}
                          />
                          <IconButton type="button" sx={{ p: 1 }}>
                            <SearchIcon />
                          </IconButton>
                        </Box>
                        <div onClick={handleOpen}>
                          <MyButton text="Add MSME" />
                        </div>
                      </div>
                      <div className="col-12 mt-1">
                        <p className="list-group">Approved MSME List</p>
                        <Box sx={{ height: 400, width: "100%" }}>
                          <DataGrid
                            rows={rowsApproved}
                            columns={columns}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 5,
                                },
                              },
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                          />
                        </Box>
                      </div>
                    </>
                  )}
                </div>
              </Box>
            </Box>{" "}
          </Box>
          <Modal
            open={openModel}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={isSmallScreen ? mobileStyle : largeStyle}>
              <h1 className="text-center">Add New MSME</h1>
              <Box
                sx={{ width: "100%" }}
                style={{ marginTop: "10px", marginBottom: "20px" }}
              >
                <Stepper activeStep={stepperCounter} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              <Grid
                container
                spacing={{ xs: 2, md: 2 }}
                columns={{ xs: 12, sm: 12, md: 12 }}
                style={{ marginTop: "10px" }}
              >
                {stepperCounter === 0 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2">
                          Type of Business: <span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={typeOfBusiness}
                          onChange={(e) => {
                            setTypeOfBusinessError("");
                            setTypeOfBusiness(e.target.value);
                          }}
                        >
                          <option value="" disabled selected>
                            Select business type
                          </option>
                          {typeOfBusinessOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    {(typeOfBusiness === "Proprietary Limited Company (PTY)" ||
                      typeOfBusiness === "Close Corporation (CC)") && (
                      <>
                        <Grid item xs={12} sm={6} md={6}>
                          <div className="form-group pb-3">
                            <label
                              htmlFor="businessRegistrationNumber"
                              className="pb-2"
                            >
                              Registration Number:<span>*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control place-holder"
                              placeholder="Business registration number"
                              autoComplete="off"
                              value={businessRegistrationNumber}
                              name="businessRegistrationNumber"
                              onChange={(e) => {
                                setBusinessRegistrationNumberError("");
                                setBusinessRegistrationNumber(e.target.value);
                              }}
                            />
                            {businessRegistrationNumberError && (
                              <>
                                <p className="error mt-1">
                                  {businessRegistrationNumberError}
                                </p>
                              </>
                            )}
                          </div>
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="registrationName" className="pb-2">
                          Registration Name:<span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="Registration name"
                          autoComplete="off"
                          value={businessRegistrationName}
                          name="registrationName"
                          onChange={(e) => {
                            setBusinessRegistrationNameError("");
                            setBusinessRegistrationName(e.target.value);
                          }}
                        />
                        {businessRegistrationNameError && (
                          <>
                            <p className="error mt-1">
                              {businessRegistrationNameError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="displayNumber" className="pb-2">
                          Display Name:<span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="Display name"
                          value={businessDisplayName}
                          autoComplete="off"
                          name="displayNumber"
                          onChange={(e) => {
                            setBusinessDisplayNameError("");
                            setBusinessDisplayName(e.target.value);
                          }}
                        />
                        {setBusinessDisplayNameError && (
                          <>
                            <p className="error mt-1">
                              {businessDisplayNameError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="description" className="pb-2">
                          Business Description:<span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="Display name"
                          value={description}
                          autoComplete="off"
                          name="description"
                          onChange={(e) => {
                            setDescriptionError("");
                            setDescription(e.target.value);
                          }}
                        />
                        {descriptionError && (
                          <>
                            <p className="error mt-1">{descriptionError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2">
                          Region: <span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={region}
                          onChange={(e) => {
                            setRegionError("");
                            setRegion(e.target.value);
                          }}
                        >
                          <option value="" disabled selected>
                            Select region
                          </option>
                          {regionOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {regionError && (
                          <>
                            <p className="error mt-1">{regionError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2">
                          Town:<span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={town}
                          onChange={(e) => {
                            setTownError("");
                            setTown(e.target.value);
                          }}
                        >
                          <option value="" disabled selected>
                            Select town
                          </option>
                          {filteredTownOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {regionError && (
                          <>
                            <p className="error mt-1">{regionError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2">
                          Primary Industry:<span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={primaryIndustry}
                          onChange={(e) => {
                            setPrimaryIndustryError("");
                            setPrimaryIndustry(e.target.value);
                          }}
                        >
                          <option value="" disabled selected>
                            Select town
                          </option>
                          {primatyIndustryOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {primaryIndustryError && (
                          <>
                            <p className="error mt-1">{primaryIndustryError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2">
                          Secondary Industry:<span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={secondaryIndustry}
                          onChange={(e) => {
                            setSecondaryIndustryError("");
                            setSecondaryIndustry(e.target.value);
                          }}
                        >
                          <option value="" disabled selected>
                            Select town
                          </option>
                          {secondaryOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {secondaryIndustryError && (
                          <>
                            <p className="error mt-1">
                              {secondaryIndustryError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2">
                          Year of Establishment: <span>*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control place-holder"
                          min="1900"
                          max="21000"
                          value={yearOfEstablishment}
                          placeholder="Establishment year"
                          autoComplete="off"
                          name="email"
                          onChange={(e) => {
                            setYearOfEstablishmentError("");
                            setYearOfEstablishment(e.target.value);
                          }}
                        />
                        {yearOfEstablishmentError && (
                          <>
                            <p className="error mt-1">
                              {yearOfEstablishmentError}
                            </p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="turnover" className="pb-2">
                          Annual Turnover: <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          value={annualTurnover}
                          placeholder="30 000"
                          autoComplete="off"
                          name="turnover"
                          onChange={(e) => {
                            setAnnualTurnoverError("");
                            setAnnualTurnover(e.target.value);
                          }}
                        />
                        {annualTurnoverError && (
                          <>
                            <p className="error mt-1">{annualTurnoverError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2">
                          User Name: <span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={userId}
                          onChange={(e) => {
                            setUserIdError("");
                            setUserId(e.target.value);
                          }}
                        >
                          <option value="" disabled selected>
                            Select user
                          </option>
                          {userOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {userIdError && (
                          <>
                            <p className="error mt-1">{userIdError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <div className="d-flex justify-content-end w-100">
                      <ModelButton text="Step 2" onClick={handleStep1} />
                    </div>
                  </>
                )}

                {stepperCounter === 1 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2">
                          Founder's Name:<span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="founder's name"
                          value={foundersName || ""}
                          autoComplete="off"
                          name="email"
                          onChange={(e) => {
                            setFoundersNameError("");
                            setFoundersName(e.target.value);
                          }}
                        />
                        {foundersNameError && (
                          <>
                            <p className="error mt-1">{foundersNameError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2">
                          Founder's Gender:<span>*</span>
                        </label>
                        <select
                          class="form-select"
                          value={foundersGender}
                          onChange={(e) => {
                            setFoundersGenderError("");
                            setFoundersGender(e.target.value);
                          }}
                        >
                          <option value="" disabled selected>
                            Select gender
                          </option>
                          {foundersGenderOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {foundersGenderError && (
                          <>
                            <p className="error mt-1">{foundersGenderError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2">
                          Founder Age: <span>*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control place-holder"
                          min="1"
                          max="110"
                          value={foundersAge}
                          placeholder="age"
                          autoComplete="off"
                          name="email"
                          onChange={(e) => {
                            setFoundersAgeError("");
                            setFoundersAge(e.target.value);
                          }}
                        />
                        {foundersAgeError && (
                          <>
                            <p className="error mt-1">{foundersAgeError}</p>
                          </>
                        )}
                      </div>
                    </Grid>

                    <div className="d-flex justify-content-between w-100">
                      <button
                        className="btn btn-success m-1 p-2 modelButton"
                        onClick={() => setStepperCounter(0)}
                      >
                        Previous
                      </button>
                      <button
                        className="btn btn-success m-1 p-2 modelButton"
                        onClick={handleStep2}
                      >
                        Step 3
                      </button>
                    </div>
                  </>
                )}
                {stepperCounter === 2 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="businessAddress" className="pb-2">
                          Business Address:<span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="address"
                          value={businessAddress}
                          autoComplete="off"
                          name="businessAddress"
                          onChange={(e) => {
                            setBusinessAddressError("");
                            setBusinessAddress(e.target.value);
                          }}
                        />
                        {businessAddressError && (
                          <>
                            <p className="error mt-1">{businessAddressError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="phoneNumber" className="pb-2">
                          Phone Number:<span>*</span>
                        </label>
                        <input
                          type="text"
                          value={phoneNumber}
                          className="form-control place-holder"
                          placeholder="+264 81 000000/ 0810000000"
                          autoComplete="off"
                          name="phoneNumber"
                          onChange={(e) => {
                            setPhoneNumberError("");
                            setPhoneNumber(e.target.value);
                          }}
                        />
                        {phoneNumberError && (
                          <>
                            <p className="error mt-1">{phoneNumberError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="whatsAppNumber" className="pb-2">
                          What's App Number: <span>*</span>
                        </label>
                        <input
                          type="text"
                          value={whatsAppNumber}
                          className="form-control place-holder"
                          placeholder="+264 81 000000/ 0810000000"
                          autoComplete="off"
                          name="whatsAppNumber"
                          onChange={(e) => {
                            setWhatsAppNumberError("");
                            setWhatsAppNumber(e.target.value);
                          }}
                        />
                        {whatsAppNumberError && (
                          <>
                            <p className="error mt-1">{whatsAppNumberError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="businessEmail" className="pb-2">
                          Business email:<span>*</span>
                        </label>
                        <input
                          type="email"
                          value={businessEmail}
                          className="form-control place-holder"
                          placeholder="example@nipdb.com.na"
                          autoComplete="off"
                          name="businessEmail"
                          onChange={(e) => {
                            setBusinessEmailError("");
                            setBusinessEmail(e.target.value);
                          }}
                        />
                        {businessEmailError && (
                          <>
                            <p className="error mt-1">{businessEmailError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="website" className="pb-2">
                          Website Link: <span>*</span>
                        </label>
                        <input
                          type="text"
                          value={websiteLink}
                          className="form-control place-holder"
                          placeholder="www.example.com.na"
                          autoComplete="off"
                          name="website"
                          onChange={(e) => {
                            setWebsiteLinkError("");
                            setWebsiteLink(e.target.value);
                          }}
                        />
                        {websiteLinkError && (
                          <>
                            <p className="error mt-1">{websiteLinkError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="twitter" className="pb-2">
                          Twitter Link:<span>*</span>
                        </label>
                        <input
                          type="text"
                          value={twitterLink}
                          className="form-control place-holder"
                          placeholder="www.example.com.na"
                          autoComplete="off"
                          name="twitter"
                          onChange={(e) => {
                            setTwitterLinkError("");
                            setTwitterLink(e.target.value);
                          }}
                        />
                        {twitterLinkError && (
                          <>
                            <p className="error mt-1">{twitterLinkError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="facebook" className="pb-2">
                          Facebook Link: <span>*</span>
                        </label>
                        <input
                          type="text"
                          value={facebookLink}
                          className="form-control place-holder"
                          placeholder="www.example.com.na"
                          autoComplete="off"
                          name="facebook"
                          onChange={(e) => {
                            setFacebookLinkError("");
                            setFacebookLink(e.target.value);
                          }}
                        />
                        {facebookLinkError && (
                          <>
                            <p className="error mt-1">{facebookLinkError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="instagram" className="pb-2">
                          Instagram Link:
                        </label>
                        <input
                          type="text"
                          value={instagramLink}
                          className="form-control place-holder"
                          placeholder="www.example.com.na"
                          autoComplete="off"
                          name="instagram"
                          onChange={(e) => {
                            setInstagramLinkError("");
                            setInstagramLink(e.target.value);
                          }}
                        />
                        {instagramLinkError && (
                          <>
                            <p className="error mt-1">{instagramLinkError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="linkedIn" className="pb-2">
                          Linkedln Link: <span>*</span>
                        </label>
                        <input
                          type="text"
                          value={linkedInLink}
                          className="form-control place-holder"
                          placeholder="www.example.com.na"
                          autoComplete="off"
                          name="linkedIn"
                          onChange={(e) => {
                            setLinkedInLinkError("");
                            setLinkedInLink(e.target.value);
                          }}
                        />
                        {linkedInLinkError && (
                          <>
                            <p className="error mt-1">{linkedInLinkError}</p>
                          </>
                        )}
                      </div>
                    </Grid>

                    <div className="d-flex justify-content-between w-100">
                      <button
                        className="btn btn-success m-1 p-2 modelButton"
                        onClick={() => setStepperCounter(1)}
                      >
                        Previous
                      </button>
                      <button
                        className="btn btn-success m-1 p-2 modelButton"
                        onClick={handleStep3}
                      >
                        Step 4
                      </button>
                    </div>
                  </>
                )}
                {stepperCounter === 3 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email">
                          Monday:<span>*</span>
                        </label>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 2 }}
                          columns={{ xs: 12, sm: 12, md: 12 }}
                          style={{ marginTop: "0px" }}
                        >
                          <Grid item xs={12} sm={6} md={6}>
                            <div className="form-group pb-3">
                              <label htmlFor="mondayFrom" className="pb-2">
                                From: <span>*</span>
                              </label>
                              <input
                                type="time"
                                className="form-control place-holder"
                                placeholder="08:00"
                                autoComplete="off"
                                name="mondayFrom"
                                value={mondayFrom}
                                onChange={(e) => {
                                  setMondayError("");
                                  setMondayFrom(e.target.value);
                                }}
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <div className="form-group pb-3">
                              <label htmlFor="mondayTo" className="pb-2">
                                To: <span>*</span>
                              </label>
                              <input
                                type="time"
                                className="form-control place-holder"
                                placeholder="15:00"
                                autoComplete="off"
                                name="mondayTo"
                                value={mondayTo}
                                onChange={(e) => {
                                  setMondayError("");
                                  setMondayTo(e.target.value);
                                }}
                              />
                            </div>
                          </Grid>
                        </Grid>
                        {mondayError && (
                          <>
                            <p className="error mt-1">{mondayError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email">
                          Tuesday: <span>*</span>
                        </label>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 2 }}
                          columns={{ xs: 12, sm: 12, md: 12 }}
                          style={{ marginTop: "0px" }}
                        >
                          <Grid item xs={12} sm={6} md={6}>
                            <div className="form-group pb-3">
                              <label htmlFor="tusdayFrom" className="pb-2">
                                From: <span>*</span>
                              </label>
                              <input
                                type="time"
                                className="form-control place-holder"
                                placeholder="08:00"
                                autoComplete="off"
                                name="tusdayFrom"
                                value={tuesdayFrom}
                                onChange={(e) => {
                                  setTuesdayError("");
                                  setTuesdayFrom(e.target.value);
                                }}
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <div className="form-group pb-3">
                              <label htmlFor="tusdayTo" className="pb-2">
                                To: <span>*</span>
                              </label>
                              <input
                                type="time"
                                className="form-control place-holder"
                                placeholder="15:00"
                                autoComplete="off"
                                name="tusdayTo"
                                value={tuesdayTo}
                                onChange={(e) => {
                                  setTuesdayError("");
                                  setTuesdayTo(e.target.value);
                                }}
                              />
                            </div>
                          </Grid>
                        </Grid>
                        {tuesdayError && (
                          <>
                            <p className="error mt-1">{tuesdayError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email">
                          Wednesday:<span>*</span>
                        </label>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 2 }}
                          columns={{ xs: 12, sm: 12, md: 12 }}
                          style={{ marginTop: "0px" }}
                        >
                          <Grid item xs={12} sm={6} md={6}>
                            <div className="form-group pb-3">
                              <label htmlFor="wednesdayFrom" className="pb-2">
                                From: <span>*</span>
                              </label>
                              <input
                                type="time"
                                className="form-control place-holder"
                                placeholder="08:00"
                                autoComplete="off"
                                name="wednesdayFrom"
                                value={wednesdayFrom}
                                onChange={(e) => {
                                  setWednesdayError("");
                                  setWednesdayFrom(e.target.value);
                                }}
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <div className="form-group pb-3">
                              <label htmlFor="wednesdayTo" className="pb-2">
                                To: <span>*</span>
                              </label>
                              <input
                                type="time"
                                className="form-control place-holder"
                                placeholder="15:00"
                                autoComplete="off"
                                name="wednesdayTo"
                                value={wednesdayTo}
                                onChange={(e) => {
                                  setWednesdayError("");
                                  setWednesdayTo(e.target.value);
                                }}
                              />
                            </div>
                          </Grid>
                        </Grid>
                        {wednesdayError && (
                          <>
                            <p className="error mt-1">{wednesdayError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email">
                          Thursday: <span>*</span>
                        </label>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 2 }}
                          columns={{ xs: 12, sm: 12, md: 12 }}
                          style={{ marginTop: "0px" }}
                        >
                          <Grid item xs={12} sm={6} md={6}>
                            <div className="form-group pb-3">
                              <label htmlFor="thursdayFrom" className="pb-2">
                                From: <span>*</span>
                              </label>
                              <input
                                type="time"
                                className="form-control place-holder"
                                placeholder="08:00"
                                autoComplete="off"
                                name="thursdayFrom"
                                value={thursdayFrom}
                                onChange={(e) => {
                                  setThursdayError("");
                                  setThursdayFrom(e.target.value);
                                }}
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <div className="form-group pb-3">
                              <label htmlFor="thursdayTo" className="pb-2">
                                To: <span>*</span>
                              </label>
                              <input
                                type="time"
                                className="form-control place-holder"
                                placeholder="15:00"
                                autoComplete="off"
                                name="thursdayTo"
                                value={thursdayTo}
                                onChange={(e) => {
                                  setThursdayError("");
                                  setThursdayTo(e.target.value);
                                }}
                              />
                            </div>
                          </Grid>
                        </Grid>
                        {thursdayError && (
                          <>
                            <p className="error mt-1">{thursdayError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email">
                          Friday:<span>*</span>
                        </label>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 2 }}
                          columns={{ xs: 12, sm: 12, md: 12 }}
                          style={{ marginTop: "0px" }}
                        >
                          <Grid item xs={12} sm={6} md={6}>
                            <div className="form-group pb-3">
                              <label htmlFor="fridayFrom" className="pb-2">
                                From: <span>*</span>
                              </label>
                              <input
                                type="time"
                                className="form-control place-holder"
                                placeholder="08:00"
                                autoComplete="off"
                                name="fridayFrom"
                                value={fridayFrom}
                                onChange={(e) => {
                                  setFridayError("");
                                  setFridayFrom(e.target.value);
                                }}
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <div className="form-group pb-3">
                              <label htmlFor="fridayTo" className="pb-2">
                                To: <span>*</span>
                              </label>
                              <input
                                type="time"
                                className="form-control place-holder"
                                placeholder="15:00"
                                autoComplete="off"
                                name="fridayTo"
                                value={fridayTo}
                                onChange={(e) => {
                                  setFridayError("");
                                  setFridayTo(e.target.value);
                                }}
                              />
                            </div>
                          </Grid>
                        </Grid>
                        {fridayError && (
                          <>
                            <p className="error mt-1">{fridayError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email">
                          Saturday: <span>*</span>
                        </label>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 2 }}
                          columns={{ xs: 12, sm: 12, md: 12 }}
                          style={{ marginTop: "0px" }}
                        >
                          <Grid item xs={12} sm={6} md={6}>
                            <div className="form-group pb-3">
                              <label htmlFor="saturdayFrom" className="pb-2">
                                From: <span>*</span>
                              </label>
                              <input
                                type="time"
                                className="form-control place-holder"
                                placeholder="08:00"
                                autoComplete="off"
                                name="saturdayFrom"
                                value={saturdayFrom}
                                onChange={(e) => {
                                  setSaturdayError("");
                                  setSaturdayFrom(e.target.value);
                                }}
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <div className="form-group pb-3">
                              <label htmlFor="fridayTo" className="pb-2">
                                To: <span>*</span>
                              </label>
                              <input
                                type="time"
                                className="form-control place-holder"
                                placeholder="15:00"
                                autoComplete="off"
                                name="fridayTo"
                                value={saturdayTo}
                                onChange={(e) => {
                                  setSaturdayError("");
                                  setSaturdayTo(e.target.value);
                                }}
                              />
                            </div>
                          </Grid>
                        </Grid>
                        {saturdayError && (
                          <>
                            <p className="error mt-1">{saturdayError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email">Sunday:</label>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 2 }}
                          columns={{ xs: 12, sm: 12, md: 12 }}
                          style={{ marginTop: "0px" }}
                        >
                          <Grid item xs={12} sm={6} md={6}>
                            <div className="form-group pb-3">
                              <label htmlFor="sundayFrom" className="pb-2">
                                From: <span>*</span>
                              </label>
                              <input
                                type="time"
                                className="form-control place-holder"
                                placeholder="08:00"
                                autoComplete="off"
                                name="sundayFrom"
                                value={sundayFrom}
                                onChange={(e) => {
                                  setSundayError("");
                                  setSundayFrom(e.target.value);
                                }}
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <div className="form-group pb-3">
                              <label htmlFor="sundayTo" className="pb-2">
                                To: <span>*</span>
                              </label>
                              <input
                                type="time"
                                className="form-control place-holder"
                                placeholder="15:00"
                                autoComplete="off"
                                name="sundayTo"
                                value={sundayTo}
                                onChange={(e) => {
                                  setSundayError("");
                                  setSundayTo(e.target.value);
                                }}
                              />
                            </div>
                          </Grid>
                        </Grid>
                        {sundayError && (
                          <>
                            <p className="error mt-1">{sundayError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <div className="d-flex justify-content-between w-100">
                      <button
                        className="btn btn-success m-1 p-2 modelButton"
                        onClick={() => setStepperCounter(2)}
                      >
                        Previous
                      </button>
                      <button
                        className="btn btn-success m-1 p-2 modelButton"
                        onClick={handleStep4}
                      >
                        Step 4
                      </button>
                    </div>
                  </>
                )}
                {stepperCounter === 4 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="numberOfEmployee" className="pb-2">
                          Number of Employees:<span>*</span>
                        </label>
                        <select
                          class="form-select"
                          onChange={(e) => setNumberOfEmployees(e.target.value)}
                        >
                          <option value="" disabled selected>
                            Select number of employed
                          </option>
                          {numberOfEmployeeOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {numberOfEmployeesError && (
                          <>
                            <p className="error mt-1">
                              {numberOfEmployeesError}
                            </p>
                          </>
                        )}
                      </div>
                      {image1 ? (
                        <>
                          <div>
                            <div className="form-group pb-md-2">
                              <label htmlFor="email" className="pb-2">
                                Business image 1: <span>*</span>
                              </label>
                            </div>
                            <div className="col-12 p-1 d-flex flex-column justify-content-center align-items-center b-g me-3 ">
                              <div className="position-relative">
                                <div
                                  className="bg-white rounded-circle position-absolute camera-topp d-flex align-items-center justify-content-center "
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                  }}
                                  onClick={clearFileInputImage1}
                                >
                                  {image1 ? (
                                    <CloseIcon
                                      style={{
                                        width: isSmallScreen ? "18px" : "24px",
                                        height: isSmallScreen ? "18px" : "24px",
                                        color: "#1674BB",
                                      }}
                                    />
                                  ) : (
                                    <CameraAltIcon
                                      style={{
                                        width: isSmallScreen ? "18px" : "24px",
                                        height: isSmallScreen ? "18px" : "24px",
                                        color: "#1674BB",
                                      }}
                                    />
                                  )}
                                </div>
                                <img
                                  src={image1}
                                  className=" img-responsive img-thumbnail"
                                  alt=""
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  ref={inputRef1}
                                  onChange={handleFileChangeImage1}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="form-group pb-md-2">
                            <label htmlFor="email" className="pb-2">
                              Business image 1: <span>*</span>
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              className="form-control place-holder"
                              placeholder="example@nipdb.com.na"
                              autoComplete="off"
                              name="email"
                              onChange={handleFileChangeImage1}
                            />
                            {image1Error && (
                              <>
                                <p className="error mt-1">{image1Error}</p>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      {businessLogo ? (
                        <>
                          <div>
                            <div className="form-group pb-md-2">
                              <label htmlFor="email" className="pb-2">
                                Business Logo: <span>*</span>
                              </label>
                            </div>
                            <div className="col-12 p-1 d-flex flex-column justify-content-center align-items-center b-g me-3 ">
                              <div className="position-relative">
                                <div
                                  className="bg-white rounded-circle position-absolute camera-topp d-flex align-items-center justify-content-center "
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                  }}
                                  onClick={clearFileInput}
                                >
                                  {businessLogo ? (
                                    <CloseIcon
                                      style={{
                                        width: isSmallScreen ? "18px" : "24px",
                                        height: isSmallScreen ? "18px" : "24px",
                                        color: "#1674BB",
                                      }}
                                    />
                                  ) : (
                                    <CameraAltIcon
                                      style={{
                                        width: isSmallScreen ? "18px" : "24px",
                                        height: isSmallScreen ? "18px" : "24px",
                                        color: "#1674BB",
                                      }}
                                    />
                                  )}
                                </div>
                                <img
                                  src={businessLogo}
                                  className=" img-responsive img-thumbnail"
                                  alt=""
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  ref={inputRef}
                                  onChange={handleFileChange}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="form-group pb-md-2">
                            <label htmlFor="email" className="pb-2">
                              Business Logo: <span>*</span>
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              className="form-control place-holder"
                              placeholder="example@nipdb.com.na"
                              autoComplete="off"
                              name="email"
                              onChange={handleFileChange}
                            />
                            {businessLogoError && (
                              <>
                                <p className="error mt-1">
                                  {businessLogoError}
                                </p>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      {image2 ? (
                        <>
                          <div>
                            <div className="form-group pb-md-2">
                              <label htmlFor="email" className="pb-2">
                                Business image 2: <span>*</span>
                              </label>
                            </div>
                            <div className="col-12 p-1 d-flex flex-column justify-content-center align-items-center b-g me-3 ">
                              <div className="position-relative">
                                <div
                                  className="bg-white rounded-circle position-absolute camera-topp d-flex align-items-center justify-content-center "
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                  }}
                                  onClick={clearFileInputImage2}
                                >
                                  {image2 ? (
                                    <CloseIcon
                                      style={{
                                        width: isSmallScreen ? "18px" : "24px",
                                        height: isSmallScreen ? "18px" : "24px",
                                        color: "#1674BB",
                                      }}
                                    />
                                  ) : (
                                    <CameraAltIcon
                                      style={{
                                        width: isSmallScreen ? "18px" : "24px",
                                        height: isSmallScreen ? "18px" : "24px",
                                        color: "#1674BB",
                                      }}
                                    />
                                  )}
                                </div>
                                <img
                                  src={image2}
                                  className=" img-responsive img-thumbnail"
                                  alt=""
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  ref={inputRef2}
                                  onChange={handleFileChangeImage2}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="form-group pb-md-2">
                            <label htmlFor="email" className="pb-2">
                              Business image 2: <span>*</span>
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              className="form-control place-holder"
                              placeholder="example@nipdb.com.na"
                              autoComplete="off"
                              name="email"
                              onChange={handleFileChangeImage2}
                            />
                            {image2Error && (
                              <>
                                <p className="error mt-1">{image2Error}</p>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      {image3 ? (
                        <>
                          <div>
                            <div className="form-group pb-md-2">
                              <label htmlFor="email" className="pb-2">
                                Business image 3: <span>*</span>
                              </label>
                            </div>
                            <div className="col-12 p-1 d-flex flex-column justify-content-center align-items-center b-g me-3 ">
                              <div className="position-relative">
                                <div
                                  className="bg-white rounded-circle position-absolute camera-topp d-flex align-items-center justify-content-center "
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    cursor: "pointer",
                                  }}
                                  onClick={clearFileInputImage3}
                                >
                                  {image3 ? (
                                    <CloseIcon
                                      style={{
                                        width: isSmallScreen ? "18px" : "24px",
                                        height: isSmallScreen ? "18px" : "24px",
                                        color: "#1674BB",
                                      }}
                                    />
                                  ) : (
                                    <CameraAltIcon
                                      style={{
                                        width: isSmallScreen ? "18px" : "24px",
                                        height: isSmallScreen ? "18px" : "24px",
                                        color: "#1674BB",
                                      }}
                                    />
                                  )}
                                </div>
                                <img
                                  src={image3}
                                  className=" img-responsive img-thumbnail"
                                  alt=""
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  ref={inputRef3}
                                  onChange={handleFileChangeImage3}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="form-group pb-md-2">
                            <label htmlFor="email" className="pb-2">
                              Business image 3: <span>*</span>
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              className="form-control place-holder"
                              placeholder="example@nipdb.com.na"
                              autoComplete="off"
                              name="email"
                              onChange={handleFileChangeImage3}
                            />
                            {image3Error && (
                              <>
                                <p className="error mt-1">{image3Error}</p>
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </Grid>

                    <div className="d-flex justify-content-between w-100">
                      <button
                        className="btn btn-success m-1 p-2 modelButton"
                        onClick={() => setStepperCounter(3)}
                      >
                        Previous
                      </button>
                      <button
                        className="btn btn-success m-1 p-2 modelButton"
                        onClick={handleStep5}
                      >
                        Submit
                      </button>
                    </div>
                  </>
                )}
              </Grid>
            </Box>
          </Modal>
          <Modal
            open={openModelView}
            onClose={handleCloseView}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={isSmallScreen ? mobileStyle : largeStyle}>
              <h1 className="text-center">MSME Review</h1>
              <Box
                sx={{ width: "100%" }}
                style={{ marginTop: "10px", marginBottom: "20px" }}
              >
                <Stepper activeStep={stepperCounter} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              <Grid
                container
                spacing={{ xs: 1, md: 2 }}
                columns={{ xs: 12, sm: 12, md: 12 }}
                style={{ marginTop: "10px" }}
              >
                {stepperCounter === 0 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-3">
                        <label htmlFor="email" className="pb-2">
                          Type of Business:
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="founder's name"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={typeOfBusinessDetails}
                          onChange={(e) => {
                            setTypeOfBusinessDetailsError("");
                            setTypeOfBusinessDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    {(updatingDetails?.typeOfBusiness ===
                      "Proprietary Limited Company (PTY)" ||
                      updatingDetails?.typeOfBusiness ===
                        "Close Corporation (CC)") && (
                      <>
                        <Grid item xs={12} sm={6} md={6}>
                          <div className="form-group pb-md-2">
                            <label
                              htmlFor="businessRegistrationNumber"
                              className="pb-2"
                            >
                              Registration Number:
                            </label>
                            <input
                              type="text"
                              className="form-control place-holder"
                              placeholder="founder's name"
                              disabled={
                                currentUser.role === "Super admin"
                                  ? false
                                  : true
                              }
                              value={businessRegistrationNumberDetails}
                              autoComplete="off"
                              onChange={(e) => {
                                setBusinessRegistrationNumberDetailsError("");
                                setBusinessRegistrationNumberDetails(
                                  e.target.value
                                );
                              }}
                              name="email"
                            />
                            {typeOfBusinessError && (
                              <>
                                <p className="error mt-1">
                                  {typeOfBusinessError}
                                </p>
                              </>
                            )}
                          </div>
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="registrationName" className="pb-2">
                          Registration Name:
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="Registration name"
                          autoComplete="off"
                          value={businessRegistrationNameDetails}
                          onChange={(e) => {
                            setBusinessRegistrationNameDetailsError("");
                            setBusinessRegistrationNameDetails(e.target.value);
                          }}
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          name="registrationName"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="displayNumber" className="pb-2">
                          Display Name:
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="Display name"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          onChange={(e) => {
                            setBusinessDisplayNameDetailsError("");
                            setBusinessDisplayNameDetails(e.target.value);
                          }}
                          value={businessDisplayNameDetails}
                          autoComplete="off"
                          name="displayNumber"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="description" className="pb-2">
                          Business Description:
                        </label>
                        <textarea
                          type="text"
                          rows={7}
                          cols={10}
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          className="form-control place-holder"
                          placeholder="Display name"
                          value={descriptionDetails}
                          onChange={(e) => {
                            setDescriptionDetailsError("");
                            setDescriptionDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="description"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="pb-2">
                          Region:
                        </label>
                        <select
                          class="form-select"
                          value={regionDetails}
                          onChange={(e) => {
                            setRegionDetailsError("");
                            setRegionDetails(e.target.value);
                          }}
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                        >
                          <option value="" disabled selected>
                            Select region
                          </option>
                          {regionOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="pb-2">
                          Town:
                        </label>
                        <select
                          class="form-select"
                          value={townDetails}
                          onChange={(e) => {
                            setTownDetailsError("");
                            setTownDetails(e.target.value);
                          }}
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                        >
                          <option value="" disabled selected>
                            Select town
                          </option>
                          {filteredTownOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="pb-2">
                          Primary Industry:
                        </label>
                        <select
                          class="form-select"
                          value={primaryIndustryDetails}
                          onChange={(e) => {
                            setPrimaryIndustryDetailsError("");
                            setPrimaryIndustryDetails(e.target.value);
                          }}
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                        >
                          <option value="" disabled selected>
                            Select town
                          </option>
                          {primatyIndustryOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="pb-2">
                          Secondary Industry:
                        </label>
                        <select
                          class="form-select"
                          value={secondaryIndustryDetails}
                          onChange={(e) => {
                            setSecondaryIndustryDetailsError("");
                            setSecondaryIndustryDetails(e.target.value);
                          }}
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                        >
                          <option value="" disabled selected>
                            Select town
                          </option>
                          {secondaryOptions.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="pb-2">
                          Year of Establishment:
                        </label>
                        <input
                          type="number"
                          className="form-control place-holder"
                          placeholder="Display name"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={yearOfEstablishmentDetails}
                          onChange={(e) => {
                            setYearOfEstablishmentDetailsError("");
                            setYearOfEstablishmentDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="displayNumber"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="turnover" className="pb-2">
                          Annual Turnover:
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="Display name"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={annualTurnoverDetails}
                          onChange={(e) => {
                            setAnnualTurnoverDetailsError("");
                            setAnnualTurnoverDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="displayNumber"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <div className="d-flex justify-content-end w-100">
                      <ModelButton text="Step 2" onClick={handleStep1Review} />
                    </div>
                  </>
                )}

                {stepperCounter === 1 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="pb-2">
                          Founder's Name:
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="founder's name"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={foundersNameDetails}
                          onChange={(e) => {
                            setFoundersNameDetailsError("");
                            setFoundersNameDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="pb-2">
                          Founder's Gender:
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="founder's gender"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={foundersGenderDetails}
                          onChange={(e) => {
                            setFoundersGenderDetailsError("");
                            setFoundersGenderDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email" className="pb-2">
                          Founder Age:
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="founder's name"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={foundersAgeDetails}
                          onChange={(e) => {
                            setFoundersNameDetailsError("");
                            setFoundersNameDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>

                    <div className="d-flex justify-content-between w-100">
                      <button
                        className="btn btn-warning m-1 p-2 modelButton"
                        onClick={() => setStepperCounter(0)}
                      >
                        Previous
                      </button>
                      <button
                        className="btn btn-success m-1 p-2 modelButton"
                        onClick={handleStep2Review}
                      >
                        Step 3
                      </button>
                    </div>
                  </>
                )}
                {stepperCounter === 2 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="businessAddress" className="pb-2">
                          Business Address:
                        </label>
                        <textarea
                          type="text"
                          rows={2}
                          className="form-control place-holder"
                          placeholder="founder's name"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={businessAddressDetails}
                          onChange={(e) => {
                            setBusinessAddressDetailsError("");
                            setBusinessAddressDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="phoneNumber" className="pb-2">
                          Phone Number:
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="founder's name"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={phoneNumberDetails}
                          onChange={(e) => {
                            setPhoneNumberDetailsError("");
                            setPhoneNumberDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    {updatingDetails?.contactInfo?.whatsAppNumber && (
                      <Grid item xs={12} sm={6} md={6}>
                        <div className="form-group pb-md-2">
                          <label htmlFor="whatsAppNumber" className="pb-2">
                            What's App Number:
                          </label>
                          <input
                            type="text"
                            className="form-control place-holder"
                            placeholder="founder's name"
                            disabled={
                              currentUser.role === "Super admin" ? false : true
                            }
                            value={whatsAppNumberDetails}
                            onChange={(e) => {
                              setWhatsAppNumberDetailsError("");
                              setWhatsAppNumberDetails(e.target.value);
                            }}
                            autoComplete="off"
                            name="email"
                          />
                          {typeOfBusinessError && (
                            <>
                              <p className="error mt-1">
                                {typeOfBusinessError}
                              </p>
                            </>
                          )}
                        </div>
                      </Grid>
                    )}

                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="businessEmail" className="pb-2">
                          Business email:
                        </label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="founder's name"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={businessEmailDetails}
                          onChange={(e) => {
                            setBusinessEmailDetailsError("");
                            setBusinessEmailDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    {updatingDetails?.contactInfo?.websiteLink && (
                      <Grid item xs={12} sm={6} md={6}>
                        <div className="form-group pb-md-2">
                          <label htmlFor="website" className="pb-2">
                            Website Link:
                          </label>
                          <input
                            type="text"
                            className="form-control place-holder"
                            placeholder="founder's name"
                            disabled={
                              currentUser.role === "Super admin" ? false : true
                            }
                            value={websiteLinkDetails}
                            onChange={(e) => {
                              setWebsiteLinkDetailsError("");
                              setWebsiteLinkDetails(e.target.value);
                            }}
                            autoComplete="off"
                            name="email"
                          />
                          {typeOfBusinessError && (
                            <>
                              <p className="error mt-1">
                                {typeOfBusinessError}
                              </p>
                            </>
                          )}
                        </div>
                      </Grid>
                    )}

                    {updatingDetails?.contactInfo?.twitterLink && (
                      <Grid item xs={12} sm={6} md={6}>
                        <div className="form-group pb-md-2">
                          <label htmlFor="twitter" className="pb-2">
                            Twitter Link:
                          </label>
                          <input
                            type="text"
                            className="form-control place-holder"
                            placeholder="founder's name"
                            disabled={
                              currentUser.role === "Super admin" ? false : true
                            }
                            value={twitterLinkDetails}
                            onChange={(e) => {
                              setTwitterLinkDetailsError("");
                              setTwitterLinkDetails(e.target.value);
                            }}
                            autoComplete="off"
                            name="email"
                          />
                          {typeOfBusinessError && (
                            <>
                              <p className="error mt-1">
                                {typeOfBusinessError}
                              </p>
                            </>
                          )}
                        </div>
                      </Grid>
                    )}

                    {updatingDetails?.contactInfo?.facebookLink && (
                      <Grid item xs={12} sm={6} md={6}>
                        <div className="form-group pb-md-2">
                          <label htmlFor="facebook" className="pb-2">
                            Facebook Link:
                          </label>
                          <input
                            type="text"
                            className="form-control place-holder"
                            placeholder="founder's name"
                            disabled={
                              currentUser.role === "Super admin" ? false : true
                            }
                            value={facebookLinkDetails}
                            onChange={(e) => {
                              setFacebookLinkDetailsError("");
                              setFacebookLinkDetails(e.target.value);
                            }}
                            autoComplete="off"
                            name="email"
                          />
                          {typeOfBusinessError && (
                            <>
                              <p className="error mt-1">
                                {typeOfBusinessError}
                              </p>
                            </>
                          )}
                        </div>
                      </Grid>
                    )}

                    {updatingDetails?.contactInfo?.instagramLink && (
                      <Grid item xs={12} sm={6} md={6}>
                        <div className="form-group pb-md-2">
                          <label htmlFor="instagram" className="pb-2">
                            Instagram Link:
                          </label>
                          <input
                            type="text"
                            className="form-control place-holder"
                            placeholder="founder's name"
                            disabled={
                              currentUser.role === "Super admin" ? false : true
                            }
                            value={instagramLinkDetails}
                            onChange={(e) => {
                              setInstagramLinkDetailsError("");
                              setInstagramLinkDetails(e.target.value);
                            }}
                            autoComplete="off"
                            name="email"
                          />
                          {typeOfBusinessError && (
                            <>
                              <p className="error mt-1">
                                {typeOfBusinessError}
                              </p>
                            </>
                          )}
                        </div>
                      </Grid>
                    )}

                    {updatingDetails?.contactInfo?.linkedInLink && (
                      <Grid item xs={12} sm={6} md={6}>
                        <div className="form-group pb-md-2">
                          <label htmlFor="linkedIn" className="pb-2">
                            Linkedln Link:
                          </label>
                          <input
                            type="text"
                            className="form-control place-holder"
                            placeholder="founder's name"
                            disabled={
                              currentUser.role === "Super admin" ? false : true
                            }
                            value={linkedInLinkDetails}
                            onChange={(e) => {
                              setLinkedInLinkDetailsError("");
                              setLinkedInLinkDetails(e.target.value);
                            }}
                            autoComplete="off"
                            name="email"
                          />
                          {typeOfBusinessError && (
                            <>
                              <p className="error mt-1">
                                {typeOfBusinessError}
                              </p>
                            </>
                          )}
                        </div>
                      </Grid>
                    )}

                    <div className="d-flex justify-content-between w-100">
                      <button
                        className="btn btn-warning m-1 p-2 modelButton"
                        onClick={() => setStepperCounter(1)}
                      >
                        Previous
                      </button>
                      <button
                        className="btn btn-success m-1 p-2 modelButton"
                        onClick={handleStep3Review}
                      >
                        Step 4
                      </button>
                    </div>
                  </>
                )}
                {stepperCounter === 3 && (
                  <>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email">Monday:</label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="founder's name"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={mondayDetails}
                          onChange={(e) => {
                            setMondayDetailsError("");
                            setMondayDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email">Tuesday:</label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="founder's name"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={tuesdayDetails}
                          onChange={(e) => {
                            setTuesdayDetailsError("");
                            setTuesdayDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email">Wednesday:</label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="founder's name"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={wednesdayDetails}
                          onChange={(e) => {
                            setWednesdayDetailsError("");
                            setWednesdayDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email">Thursday:</label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="founder's name"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={thursdayDetails}
                          onChange={(e) => {
                            setThursdayDetailsError("");
                            setThursdayDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email">Friday:</label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="founder's name"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={fridayDetails}
                          onChange={(e) => {
                            setFridayDetailsError("");
                            setFridayDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email">Saturday:</label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="founder's name"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={saturdayDetails}
                          onChange={(e) => {
                            setSaturdayDetailsError("");
                            setSaturdayDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <div className="form-group pb-md-2">
                        <label htmlFor="email">Sunday:</label>
                        <input
                          type="text"
                          className="form-control place-holder"
                          placeholder="founder's name"
                          disabled={
                            currentUser.role === "Super admin" ? false : true
                          }
                          value={sundayDetails}
                          onChange={(e) => {
                            setSundayDetailsError("");
                            setSundayDetails(e.target.value);
                          }}
                          autoComplete="off"
                          name="email"
                        />
                        {typeOfBusinessError && (
                          <>
                            <p className="error mt-1">{typeOfBusinessError}</p>
                          </>
                        )}
                      </div>
                    </Grid>
                    <div className="d-flex justify-content-between w-100">
                      <button
                        className="btn btn-warning m-1 p-2 modelButton"
                        onClick={() => setStepperCounter(2)}
                      >
                        Previous
                      </button>
                      <button
                        className="btn btn-success m-1 p-2 modelButton"
                        onClick={handleStep4Review}
                      >
                        Step 4
                      </button>
                    </div>
                  </>
                )}
                {stepperCounter === 4 && (
                  <>
                    {updatingDetails?.additionalInfo?.businessLogo && (
                      <Grid item xs={12} sm={6} md={6}>
                        <div className="form-group pb-md-2">
                          <label htmlFor="logo" className="pb-2">
                            Business Logo:
                          </label>
                          <div>
                            <div className="col-12 p-1 d-flex flex-column justify-content-center align-items-center b-g me-3 ">
                              <div className="position-relative">
                                <img
                                  src={
                                    updatingDetails?.additionalInfo
                                      ?.businessLogo &&
                                    `http://localhost:4000/msmes/${updatingDetails?.additionalInfo?.businessLogo}`
                                  }
                                  className=" img-responsive img-thumbnail"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    )}

                    {updatingDetails?.additionalInfo?.image1 && (
                      <Grid item xs={12} sm={6} md={6}>
                        <div className="form-group pb-md-2">
                          <label htmlFor="image1" className="pb-2">
                            Business image 1:
                          </label>
                          <div>
                            <div className="col-12 p-1 d-flex flex-column justify-content-center align-items-center b-g me-3 ">
                              <div className="position-relative">
                                <img
                                  src={
                                    updatingDetails?.additionalInfo?.image1 &&
                                    `http://localhost:4000/msmes/${updatingDetails?.additionalInfo?.image1}`
                                  }
                                  className=" img-responsive img-thumbnail"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    )}

                    {updatingDetails?.additionalInfo?.image2 && (
                      <Grid item xs={12} sm={6} md={6}>
                        <div className="form-group pb-md-2">
                          <label htmlFor="image2" className="pb-2">
                            Business image 2:
                          </label>
                          <div>
                            <div className="col-12 p-1 d-flex flex-column justify-content-center align-items-center b-g me-3 ">
                              <div className="position-relative">
                                <img
                                  src={
                                    updatingDetails?.additionalInfo?.image2 &&
                                    `http://localhost:4000/msmes/${updatingDetails?.additionalInfo?.image2}`
                                  }
                                  className=" img-responsive img-thumbnail"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    )}

                    {updatingDetails?.additionalInfo?.image3 && (
                      <Grid item xs={12} sm={6} md={6}>
                        <div className="form-group pb-md-2">
                          <label htmlFor="image3" className="pb-2">
                            Business image 3:
                          </label>
                          <div>
                            <div className="col-12 p-1 d-flex flex-column justify-content-center align-items-center b-g me-3">
                              <div className="position-relative">
                                <img
                                  src={
                                    updatingDetails?.additionalInfo?.image3 &&
                                    `http://localhost:4000/msmes/${updatingDetails?.additionalInfo?.image3}`
                                  }
                                  className="img-responsive img-thumbnail"
                                  alt="Business Image 3"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <div className="d-flex justify-content-between w-100">
                        <button
                          className="btn btn-warning m-1 p-2 modelButton"
                          onClick={() => setStepperCounter(3)}
                        >
                          Previous
                        </button>
                        {currentUser?.role === "Super admin" && (
                          <div className="">
                            <button
                              className="btn btn-danger m-1 p-2 modelButton"
                              onClick={reject}
                            >
                              Reject
                            </button>
                            <button
                              className="btn btn-success m-1 p-2 modelButton"
                              onClick={approve}
                            >
                              Approve
                            </button>
                          </div>
                        )}
                        {updatingDetails?.status === "Approved" &&
                          updatingDetails?.isBlocked === false &&
                          currentUser?.role === "Super admin" && (
                            <button
                              className="btn btn-danger m-1 p-2 modelButton"
                              onClick={block}
                            >
                              Block
                            </button>
                          )}
                        {updatingDetails?.status === "Approved" &&
                          updatingDetails?.isBlocked === true &&
                          currentUser?.role === "Super admin" && (
                            <button
                              className="btn btn-danger m-1 p-2 modelButton"
                              onClick={unBlock}
                            >
                              Unblock
                            </button>
                          )}
                      </div>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}

export default Msme;
