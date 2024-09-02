import React, { useEffect, useState } from "react";
import { IconButton, useTheme, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import "../assets/css/Dashboard.css";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { SlOptionsVertical } from "react-icons/sl";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import MyButton from "../components/commons/MyButton";
import Modal from "@mui/material/Modal";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ModelButton from "../components/commons/ModelButton";
import TopCategories from "../components/admin/TopCategories";
import { ResponsivePie } from "@nivo/pie";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Line as RCLine } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as RCTooltip, Legend as RCLegend } from 'chart.js';
import { toggleSidebarfalse } from "../redux/reducers/sidebarReducer";
import { updateToken } from "../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, RCTooltip, RCLegend);

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

function Dashboard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [totalRegisteration, setTotalRegistration] = useState("");
  const [pendingRegisteration, setPendingRegistration] = useState("");
  const [rejectedRegisteration, setRejectedRegistration] = useState("");
  const [approvedRegisteration, setIApprovedRegistration] = useState("");

  const [allMSMEList, setAllMSMEList] = useState([]);

  const [stepperCounter, setStepperCounter] = useState(0);
  const [buttonActive, setButonActive] = useState(1);
  const [businessRegistrationName, setBusinessRegistrationName] = useState("");
  const [businessRegistrationNameError, setBusinessRegistrationNameError] =
    useState("");
  const [businessDisplayName, setBusinessDisplayName] = useState("");
  const [businessDisplayNameError, setBusinessDisplayNameError] = useState("");
  const [typeOfBusiness, setTypeOfBusiness] = useState("");
  const [typeOfBusinessError, setTypeOfBusinessError] = useState("");
  const [region, setRegion] = useState("");
  const [regionError, setRegionError] = useState("");
  const [town, setTown] = useState("");
  const [townError, setTownError] = useState("");
  const [primaryIndustry, setPrimaryIndustry] = useState("");
  const [primaryIndustryError, setPrimaryIndustryError] = useState("");
  const [secondaryIndustry, setSecondaryIndustry] = useState("");
  const [yearOfEstablishment, setYearOfEstablishment] = useState("");
  const [yearOfEstablishmentError, setYearOfEstablishmentError] = useState("");
  const [annualTurnover, setAnnualTurnover] = useState("");
  const [annualTurnoverError, setAnnualTurnoverError] = useState("");
  const [userId, setUserId] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [topCategory, setTopCategory] = useState([]);
  const [firstElement, setFirstElement] = useState({});
  const [secondElement, setSecondElement] = useState({});
  const [thirdElement, setThirdElement] = useState({});
  const [fourthElement, setFourthElement] = useState({});
  const [fifthElement, setFifthElement] = useState({});
  const [lineData, setLineData] = useState([]);

  const currentUser = useSelector((state) => state.auth.user);
  const tokenHeader = currentUser.token;

  const datamy = lineData;
  console.log(lineData)

  const [openModel, setOpenModel] = useState(false);
  const handleOpen = () => setOpenModel(true);
  const handleClose = () => setOpenModel(false);
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/msme/admin/monthly/registeration",
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
        console.log("Header header",newTokenHeader,tokenHeader,currentUser);
        if (response.ok) {
          console.log("Login successful", data);
          setLineData(data.data);
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
    const fetchLineGraph = async () => {
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

    fetchLineGraph();
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
    const fetchTop5 = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/msme/admin/top5/categories",
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
          setTopCategory(data.data);

          setFirstElement(data.data[0]);
          setSecondElement(data.data[1]);
          setThirdElement(data.data[2]);
          setFourthElement(data.data[3]);
          setFifthElement(data.data[4]);

          console.log("First Element:", data.data[0]);
          console.log("Second Element:", data.data[1]);
          console.log("Third Element:", data.data[2]);
          console.log("Fourth Element:", data.data[3]);
          console.log("Fifth Element:", data.data[4]);
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

    fetchTop5();
  }, [isSubmitting]);

  const columns = [
    {
      field: "registrationName",
      headerName: "Registration Name",
      width: isSmallScreen ? 130 : 160,
    },
    { field: "email", headerName: "Email", width: isSmallScreen ? 140 : 180 },
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
      width: isSmallScreen ? 120 : 140,
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
      width: isSmallScreen ? 120 : 140,
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
  ];
  console.log(allMSMEList);
  const rows = allMSMEList.map((msme) => ({
    id: msme.id,
    registrationName: msme.businessRegistrationName,
    email: msme.contactInfo.email,
    region: msme.region,
    town: msme.town,
    primaryIndustry: msme.primaryIndustry,
    annualTurnover: msme.annualTurnover,
    foundersName: msme.founderInfo.founderName,
    status: msme.status,
    isBlocked: msme.isBlocked
  }));
  const data = [
    {
      id: firstElement?.primaryIndustry,
      label: firstElement?.primaryIndustry,
      value: firstElement?.industryCount,
      color: "hsl(83, 70%, 50%)",
    },
    {
      id: secondElement?.primaryIndustry,
      label: secondElement?.primaryIndustry,
      value: secondElement?.industryCount,
      color: "hsl(155, 70%, 50%)",
    },
    {
      id: thirdElement?.primaryIndustry,
      label: thirdElement?.primaryIndustry,
      value: thirdElement?.industryCount,
      color: "hsl(276, 70%, 50%)",
    },
    {
      id: fourthElement?.primaryIndustry,
      label: fourthElement?.primaryIndustry,
      value: fourthElement?.industryCount,
      color: "hsl(147, 70%, 50%)",
    },
    {
      id: fifthElement?.primaryIndustry,
      label: fifthElement?.primaryIndustry,
      value: fifthElement?.industryCount,
      color: "hsl(193, 70%, 50%)",
    },
  ];
  console.log("data", data, fourthElement)
  return (
    <div className="container-fluid mt-4">
      <p className="msme">Dashboard</p>
      <p>View and manage all System Performance and Analytics</p>

      <Box className="" justifyContent={"space-evenly"}>
        <Box
          display="grid"
          gridTemplateColumns={
            isSmallScreen ? "repeat(1, 1fr)" : "repeat(12, 1fr)"
          }
          //gridAutoRows="270px"
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
                  <p className="text">Registrated MSMEs</p>
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
                  <p className="digit text pointer">{pendingRegisteration}</p>
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
                  <p className="digit text pointer">{rejectedRegisteration}</p>
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
                  <StickyNote2Icon sx={{ color: "rgba(251, 177, 34, 1)" }} />
                </div>
                <Tooltip title={approvedRegisteration}>
                  <p className="digit text pointer">{approvedRegisteration}</p>
                </Tooltip>
              </div>
            </div>
          </Box>
          <Box
            marginTop={"10px"}
            gridColumn={isSmallScreen ? "span 12" : "span 7"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <div className="col-12 p-4 shadow rounded-2">
              <div className="d-flex justify-content-between align-items-center border-bottom ">
                <h6>MSMEs Registration</h6>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-between ">
                    <div
                      class="circle "
                      style={{ backgroundColor: "rgba(21, 78, 138, 1)" }}
                    ></div>
                    <p className="small-padding">Current</p>
                  </div>
                  <div className="d-flex justify-content-between  padding-right">
                    <div
                      class="circle"
                      style={{ backgroundColor: "rgba(210, 31, 53, 1)" }}
                    ></div>
                    <p className="small-padding">Previous</p>
                  </div>
                </div>
              </div>
              <div className="row">
                        <div className="col-12">
                          <ResponsiveContainer width="100%" height={301}>
                            <LineChart data={datamy}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line type="monotone" dataKey="currentMonth" stroke="rgba(21, 78, 138, 1)" activeDot={{ r: 8 }} />
                              <Line type="monotone" dataKey="previousMonth" stroke="rgba(210, 31, 53, 1)" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                       
                      </div>
              
            </div>
          </Box>
          <Box
            marginTop={"10px"}
            gridColumn={isSmallScreen ? "span 12" : "span 5"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <div className="col-12 p-4 shadow rounded-2">
              <div className="d-flex justify-content-between align-items-center border-bottom ">
                <h6 className="header-padding">Top 5 performing categories</h6>
              </div>
              <div style={{ height: 300 }}>
                <ResponsivePie
                  data={data}
                  margin={{ top: 10, right: 40, bottom: 10, left: 40 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  borderWidth={1}
                  borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                  }}
                  arcLinkLabelsSkipAngle={360}
                  arcLinkLabelsTextColor="#333333"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: "color" }}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 8]],
                  }}
                  defs={[
                    {
                      id: "dots",
                      type: "patternDots",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      size: 4,
                      padding: 1,
                      stagger: true,
                    },
                    {
                      id: "lines",
                      type: "patternLines",
                      background: "inherit",
                      color: "rgba(255, 255, 255, 0.3)",
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10,
                    },
                  ]}
                  fill={[
                    {
                      match: {
                        id: "ruby",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "c",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "go",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "python",
                      },
                      id: "dots",
                    },
                    {
                      match: {
                        id: "scala",
                      },
                      id: "lines",
                    },
                    {
                      match: {
                        id: "lisp",
                      },
                      id: "lines",
                    },
                    {
                      match: {
                        id: "elixir",
                      },
                      id: "lines",
                    },
                    {
                      match: {
                        id: "javascript",
                      },
                      id: "lines",
                    },
                  ]}
                  
                />
              </div>
            </div>
          </Box>

          <Box
            gridColumn={isSmallScreen ? "span 12" : "span 12"}
            gridRow="span 3"
          >
            <div className="col-12 listing-msme p-4 shadow rounded-3 mb-4">
              <div className="col-12 mt-1">
                <p className="list-group">All MSME List</p>
                <Box sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={rows}
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
            </div>
          </Box>
        </Box>{" "}
      </Box>
    </div>
  );
}

export default Dashboard;
