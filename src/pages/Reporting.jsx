import React, { useEffect, useState } from "react";
import { IconButton, useTheme, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import "../assets/css/Reporting.css";
import * as XLSX from 'xlsx';  
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import BackButton from "../components/commons/BackButton";
import DownloadButton from "../components/commons/DownloadButton";
import ViewButton from "../components/commons/ViewButton";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSidebarfalse } from "../redux/reducers/sidebarReducer";
import { login } from "../redux/reducers/authReducer";

function Reporting() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);
  const [allMSMEList,setAllMSMEList] = useState([]);
  const [allMSMEPendingList,setAllMSMEPendingList] = useState([]);
  const [allMSMERejectedList,setAllMSMERejectedList] = useState([]);
  const [allUserList,setAllUserList] = useState([]);
  const [allBSOList,setAllBSOList] = useState([]);

  useEffect(() => {
    const fetchMsmeAllMSME = async () => {
      try {
        const response = await fetch("http://localhost:4000/msme/admin/all/approved", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Login successful", data);
          setAllMSMEList(data.data);
        } else {
          if(!data.isAuthenticated){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {}
    };

    fetchMsmeAllMSME();
  }, []);
  useEffect(() => {
    const fetchMsmeAllMSMEPending = async () => {
      try {
        const response = await fetch("http://localhost:4000/msme/admin/all/pending", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Login successful", data);
          setAllMSMEPendingList(data.data);
        } else {
          if(!data.isAuthenticated){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {}
    };

    fetchMsmeAllMSMEPending();
  }, []);
  useEffect(() => {
    const fetchMsmeAllMSMERejected = async () => {
      try {
        const response = await fetch("http://localhost:4000/msme/admin/all/rejected", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Login successful", data);
          setAllMSMERejectedList(data.data);
        } else {
          if(!data.isAuthenticated){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {}
    };

    fetchMsmeAllMSMERejected();
  }, []);
  useEffect(() => {
    const fetchMsmeAllBSO = async () => {
      try {
        const response = await fetch("http://localhost:4000/bso/admin/all/download", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Login successful", data);
          setAllBSOList(data.data);
        } else {
          if(!data.isAuthenticated){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {}
    };

    fetchMsmeAllBSO();
  }, []);
  useEffect(() => {
    const fetchMsmeAllUsers = async () => {
      try {
        const response = await fetch("http://localhost:4000/system/all/admin/list/download", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Login successful", data);
          setAllUserList(data.data);
        } else {
          if(!data.isAuthenticated){
            dispatch(toggleSidebarfalse());
          dispatch(
            login({
              user: {},
            })
          );
          navigate("/");
          }
        }
      } catch (error) {}
    };

    fetchMsmeAllUsers();
  }, []);
  const columns1 = [
    { field: "registrationName", headerName: "Registration Name", width: isSmallScreen ? 130 : 160 },
    { field: "email", headerName: "Email", width: isSmallScreen ? 140 : 160 },
    { field: "region", headerName: "Region", width: isSmallScreen ? 120 : 160 },
    { field: "town", headerName: "Town", width: isSmallScreen ? 120 : 160},
    { field: "primaryIndustry", headerName: "Primary Industry", width: isSmallScreen ? 120 : 180 },
    { field: "annualTurnover", headerName: "Annual Turnover(N$)", width: isSmallScreen ? 120 : 180 },
    { field: "foundersName", headerName: "Founders Name", width: isSmallScreen ? 120 : 180 },
    { field: "status", headerName: "Status", width: isSmallScreen ? 120 : 140, cellClassName: (params) => {
      switch (params.value) {
        case "Pending":
          return 'status-pending';
        case "Rejected":
          return 'status-rejected';
        case "Approved":
          return 'status-approved';
        default:
          return '';
      }}},
  ];
  const rowsAll = allMSMEList.map((msme) => ({
    id: msme.id,
    registrationName: msme.businessRegistrationName,
    email: msme.contactInfo.email,
    region: msme.region,
    town: msme.town,
    primaryIndustry: msme.primaryIndustry,
    annualTurnover: msme.annualTurnover,
    foundersName: msme.founderInfo.founderName,
    status: msme.status,
  }));
  const columns2 = [
    { field: "registrationName", headerName: "Registration Name", width: isSmallScreen ? 130 : 160 },
    { field: "email", headerName: "Email", width: isSmallScreen ? 140 : 160 },
    { field: "region", headerName: "Region", width: isSmallScreen ? 120 : 160 },
    { field: "town", headerName: "Town", width: isSmallScreen ? 120 : 160},
    { field: "primaryIndustry", headerName: "Primary Industry", width: isSmallScreen ? 120 : 180 },
    { field: "annualTurnover", headerName: "Annual Turnover(N$)", width: isSmallScreen ? 120 : 180 },
    { field: "foundersName", headerName: "Founders Name", width: isSmallScreen ? 120 : 180 },
    { field: "status", headerName: "Status", width: isSmallScreen ? 120 : 140, cellClassName: (params) => {
      switch (params.value) {
        case "Pending":
          return 'status-pending';
        case "Rejected":
          return 'status-rejected';
        case "Approved":
          return 'status-approved';
        default:
          return '';
      }}},
  ];
  const rowsAllPending = allMSMEPendingList.map((msme) => ({
    id: msme.id,
    registrationName: msme.businessRegistrationName,
    email: msme.contactInfo.email,
    region: msme.region,
    town: msme.town,
    primaryIndustry: msme.primaryIndustry,
    annualTurnover: msme.annualTurnover,
    foundersName: msme.founderInfo.founderName,
    status: msme.status,
  }));
  const columns3 = [
    { field: "registrationName", headerName: "Registration Name", width: isSmallScreen ? 130 : 160 },
    { field: "email", headerName: "Email", width: isSmallScreen ? 140 : 160 },
    { field: "region", headerName: "Region", width: isSmallScreen ? 120 : 160 },
    { field: "town", headerName: "Town", width: isSmallScreen ? 120 : 160},
    { field: "primaryIndustry", headerName: "Primary Industry", width: isSmallScreen ? 120 : 180 },
    { field: "annualTurnover", headerName: "Annual Turnover(N$)", width: isSmallScreen ? 120 : 180 },
    { field: "foundersName", headerName: "Founders Name", width: isSmallScreen ? 120 : 180 },
    { field: "status", headerName: "Status", width: isSmallScreen ? 120 : 140, cellClassName: (params) => {
      switch (params.value) {
        case "Pending":
          return 'status-pending';
        case "Rejected":
          return 'status-rejected';
        case "Approved":
          return 'status-approved';
        default:
          return '';
      }}},
  ];
  const rowsRejected = allMSMERejectedList.map((msme) => ({
    id: msme.id,
    registrationName: msme.businessRegistrationName,
    email: msme.contactInfo.email,
    region: msme.region,
    town: msme.town,
    primaryIndustry: msme.primaryIndustry,
    annualTurnover: msme.annualTurnover,
    foundersName: msme.founderInfo.founderName,
    status: msme.status,
  }));
  const column4 = [
    { field: "Name", headerName: "Name", width: isSmallScreen ? 120 : 160 },
    { field: "Type", headerName: "Type", width: isSmallScreen ? 180 : 130 },
    {
      field: "ContactNumber",
      headerName: "Contact Number",
      width: isSmallScreen ? 120 : 160,
    },
    {
      field: "Website",
      headerName: "Website",
      width: isSmallScreen ? 150 : 280,
    },
    {
      field: "EmailAddress",
      headerName: "Email Address",
      width: isSmallScreen ? 150 : 220,
    },
  ];
  const rowsBSO = allBSOList.map((bso) => ({
    id: bso.id,
    Name: bso.name,
    Type: bso.type,
    ContactNumber: bso.contactNumber,
    Website: bso.website,
    EmailAddress: bso.email,
  }));
  const columns5 = [
    { field: "firstName", headerName: "first Name", width: isSmallScreen ? 100 : 160 },
    { field: "lastName", headerName: "Last Name", width: isSmallScreen ? 100 : 150 },
    { field: "email", headerName: "Email", width: isSmallScreen ? 120 : 220 },
    { field: "department", headerName: "Department", width: isSmallScreen ? 150 : 190},
    { field: "role", headerName: "Role",width: isSmallScreen ? 150 : 180 },
    { field: "createdAt", headerName: "Created Date", width: isSmallScreen ? 180 : 250 },
  ];

  const rowsUsers = allUserList.map((admin) =>({
    id: admin.id,
    firstName: admin.firstName,
    lastName: admin.lastName,
    email:admin.email,
    department: admin.department,
    role: admin.role,
    createdAt: admin.createdAt
  }));
  const lines = [
    "All MSMEs(Approved) Report",
    "All MSMEs(Pending) Report",
    "All MSMEs(Rejected) Report",
    "All BSOs Report",
    "All System Users",
  ];

  const columns = [
    { field: "id", headerName: "#", width: isSmallScreen ?50 : 70 },
    { field: "reportName", headerName: "REPORT NAME", width: isSmallScreen ? 350:750 },
    {
      field: "action",
      headerName: "ACTION",
      width:250,
      renderCell: (params) => (
        <ViewButton onClick={() => setActiveTab(params.row.id)}/>
      ),
    },
  ];
  const rows = lines.map((line, index) => ({
    id: index + 1,
    reportName: line,
    action: "",
  }));
  const handleDownloadAllMSME =() =>{
    try{
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(allMSMEList);
      XLSX.utils.book_append_sheet(wb,ws, "All MSMEs List");
      XLSX.writeFile(wb,"All_MSME_List.xlsx");
    }catch(error){
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Check your internet connection and try again!`,
        showConfirmButton: false,
        timer: 3000
      });
    }
  }
  const handleDownloadAllMSMEPending =() =>{
    try{
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(allMSMEPendingList);
      XLSX.utils.book_append_sheet(wb,ws, "All Pending MSMEs List");
      XLSX.writeFile(wb,"All_Pending_MSME_List.xlsx");
    }catch(error){
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Check your internet connection and try again!`,
        showConfirmButton: false,
        timer: 3000
      });
    }
  }
  const handleDownloadAllMSMERejected =() =>{
    try{
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(allMSMERejectedList);
      XLSX.utils.book_append_sheet(wb,ws, "All Rejected MSMEs List");
      XLSX.writeFile(wb,"All_Rejected_MSME_List.xlsx");
    }catch(error){
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Check your internet connection and try again!`,
        showConfirmButton: false,
        timer: 3000
      });
    }
  }
  const handleDownloadAllBSO =() =>{
    try{
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(allBSOList);
      XLSX.utils.book_append_sheet(wb,ws, "All BSO List");
      XLSX.writeFile(wb,"All_BSO_List.xlsx");
    }catch(error){
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Check your internet connection and try again!`,
        showConfirmButton: false,
        timer: 3000
      });
    }
  }
  const handleDownloadAllUsers =() =>{
    try{
      console.log(allUserList)
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(allUserList);
      XLSX.utils.book_append_sheet(wb,ws, "All System User List");
      XLSX.writeFile(wb,"All_System_Users.xlsx");
    }catch(error){
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Check your internet connection and try again!`,
        showConfirmButton: false,
        timer: 3000
      });
    }
  }

  return (
    <div className="container-fluid mt-4">
      <p className="msme">Reports</p>
      <p>Access and view detailed reports about Micro, Small, and Medium Enterprises (MSMEs) and Business Support Organizations (BSOs).</p>
      <div className="mt-1 mt-md-4">
      <Box className="" justifyContent={"space-evenly"}>
        <Box
        marginTop={isSmallScreen ? "1px" : "50px"}
          display="grid"
          gridTemplateColumns={
            isSmallScreen ? "repeat(1, 1fr)" : "repeat(12, 1fr)"
          }
          //gridAutoRows="270px"
          gap={isSmallScreen ? "0px" : "10px"}
        >
          <Box
            gridColumn={isSmallScreen ? "span 12" : "span 12"}
            gridRow="span 3"
          >
            <div className="col-12 p-4 shadow rounded-3 mb-4">
              {
                activeTab === 0 &&<>
                  <div className="col-12 mt-1">
                <p className="list-group">All Reports</p>
                <Box sx={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 6,
                        },
                      },
                    }}
                    pageSizeOptions={[6]}
                    disableRowSelectionOnClick
                      hideFooter
                  />
                </Box>
              </div>
                </>
              }
              {
                activeTab === 1 &&<>
                <div className="col-12 mt-1">
                <p className="list-group text-center">All MSMEs Report</p>
                <div className="w-100 d-flex justify-content-between">
                  <BackButton onClick={() =>setActiveTab(0)}/>
                  <DownloadButton onClick={handleDownloadAllMSME}/>
                </div>
                <Box sx={{ height: 400, width: "100%" , marginTop: "10px"}}>
                  <DataGrid
                    rows={rowsAll}
                    columns={columns1}
                    sx={{
                      '& .status-pending': {
                        color: 'yellow',
                      },
                      '& .status-rejected': {
                        color: 'red',
                      },
                      '& .status-approved': {
                        color: 'green',
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
              }
              {
                activeTab === 2 &&<>
                <div className="col-12 mt-1">
                <p className="list-group text-center">All Pending MSMEs Report</p>
                <div className="w-100 d-flex justify-content-between">
                  <BackButton onClick={() =>setActiveTab(0)}/>
                  <DownloadButton onClick={handleDownloadAllMSMEPending}/>
                </div>
                <Box sx={{ height: 400, width: "100%" , marginTop: "10px"}}>
                  <DataGrid
                    rows={rowsAllPending}
                    columns={columns2}
                    sx={{
                      '& .status-pending': {
                        color: 'yellow',
                      },
                      '& .status-rejected': {
                        color: 'red',
                      },
                      '& .status-approved': {
                        color: 'green',
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
              }
              {
                activeTab === 3 &&<>
                <div className="col-12 mt-1">
                <p className="list-group text-center">All Rejected MSMEs Report</p>
                <div className="w-100 d-flex justify-content-between">
                  <BackButton onClick={() =>setActiveTab(0)}/>
                  <DownloadButton onClick={handleDownloadAllMSMERejected}/>
                </div>
                <Box sx={{ height: 400, width: "100%" , marginTop: "10px"}}>
                  <DataGrid
                    rows={rowsRejected}
                    columns={columns3}
                    sx={{
                      '& .status-pending': {
                        color: 'yellow',
                      },
                      '& .status-rejected': {
                        color: 'red',
                      },
                      '& .status-approved': {
                        color: 'green',
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
              }
              {
                activeTab === 4 &&<>
                <div className="col-12 mt-1">
                <p className="list-group text-center">All BSO Report</p>
                <div className="w-100 d-flex justify-content-between">
                  <BackButton onClick={() =>setActiveTab(0)}/>
                  <DownloadButton onClick={handleDownloadAllBSO}/>
                </div>
                <Box sx={{ height: 400, width: "100%" , marginTop: "10px"}}>
                  <DataGrid
                    rows={rowsBSO}
                    columns={column4}
        
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
              }
              {
                activeTab === 5 &&<>
                <div className="col-12 mt-1">
                <p className="list-group text-center">All System Users</p>
                <div className="w-100 d-flex justify-content-between">
                  <BackButton onClick={() =>setActiveTab(0)}/>
                  <DownloadButton onClick={handleDownloadAllUsers}/>
                </div>
                <Box sx={{ height: 400, width: "100%" , marginTop: "10px"}}>
                  <DataGrid
                    rows={rowsUsers}
                    columns={columns5}
        
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
              }
            </div>
          </Box>
        </Box>{" "}
      </Box>
      </div>
    </div>
  );
}

export default Reporting;
