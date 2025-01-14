import React, { useEffect, useState } from "react";
import { IconButton, useTheme, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import "../assets/css/msme.css";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import { toggleIsSubmittingTrue,toggleIsSubmittingfalse } from "../redux/reducers/submittingReducer";
import Box from "@mui/material/Box";
import { CgCloseR } from "react-icons/cg";
import { DataGrid } from "@mui/x-data-grid";
import UpdateButton from "../components/commons/UpdateButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import "../assets/css/User.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MyButton from "../components/commons/MyButton";
import Modal from "@mui/material/Modal";
import { toggleSidebarfalse } from "../redux/reducers/sidebarReducer";
import { useNavigate } from "react-router-dom";
import { updateToken } from "../redux/reducers/authReducer";
import DeleteButton from "../components/commons/DeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/reducers/authReducer";
import handleAuthFailure from "../utils/handleAuthFailure";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '95%',
    sm: '90%', 
    md: '70%',
    xl: '50%',
    xxl: '30%'
  },
  height: "80%",
  bgcolor: 'background.paper',
  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
  p: 4,
  overflowY: 'auto'
};

function User() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const serverToken = useSelector((state) => state.server.serverToken);

  const [totalSystemUsers, setTotalSystemUsers] = useState("");
  const [totalSuperUser, setTotalSuperUser] = useState("");
  const [totalAdmins, setTotalAdmins] = useState("");
  const [totalAppUsers, setTotalAppUsers] = useState("");
  const [adminList, setAdminList] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setlastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [role, setRole] = useState("");
  const [roleError, setRoleError] = useState("");

  const [firstNameDetails, setFirstNameDetails] = useState("");
  const [firstNameDetailsError, setFirstNameDetailsError] = useState("");
  const [lastNameDetails, setLastNameDetails] = useState("");
  const [lastNameDetailsError, setlastNameDetailsError] = useState("");
  const [emailDetails, setEmailDetails] = useState("");
  const [emailDetailsError, setEmailDetailsError] = useState("");
  const [departmentDetails, setDepartmentDetails] = useState("");
  const [departmentDetailsError, setDepartmentDetailsError] = useState("");
  const [contactNumberDetails, setContactNumberDetails] = useState("");
  const [contactNumberDetailsError, setContactNumberDetailsError] =
    useState("");
  const [roleDetails, setRoleDetails] = useState("");
  const [roleDetailsError, setRoleDetailsError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updatingDetails, setUpdatingDetails] = useState([]);

  const [updatingFail, setUpdatingFail] = useState("");
  const tokenHeader = currentUser.token;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const namibiaPhoneRegex = /^(?:\+264|0)(\s?\d{2})\s?\d{3}\s?\d{4}$/;

  const [searchQuery, setSearchQuery] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const [openModelEditing, setOpenModelEditing] = useState(false);
  const handleOpen = () => setOpenModel(true);
  const handleClose = () => {
    setFirstNameError("");
    setlastNameError("");
    setEmailError("");
    setContactNumberError("");
    setDepartmentError("");
    setRoleError("");
    setOpenModel(false);
  };

  const handleCloseEditing = () => {
    setFirstNameDetails("");
    setLastNameDetails("");
    setEmailDetails("");
    setContactNumberDetails("");
    setDepartmentDetails("");
    setRoleDetails("");
    setFirstNameDetailsError("");
    setlastNameDetailsError("");
    setEmailDetailsError("");
    setContactNumberDetailsError("");
    setDepartmentDetailsError("");
    setRoleDetailsError("");
    setUpdatingFail("");
    setOpenModelEditing(false);
  };
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/system/all/system-users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${serverToken}`,
              'x-access-token': `${tokenHeader}`
            },
            
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get("x-access-token");

        if (newTokenHeader) {
          dispatch(
            updateToken({
              token: newTokenHeader,
            })
          );
        }

        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setTotalSystemUsers(data.count);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchTotalCount();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/system/all/super-admin-count",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${serverToken}`,
              'x-access-token': `${tokenHeader}`
            },
            
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get("x-access-token");

        if (newTokenHeader) {
          dispatch(
            updateToken({
              token: newTokenHeader,
            })
          );
        }

        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setTotalSuperUser(data.count);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchPendingCount();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchRejectedCount = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/system/all/admin-count",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${serverToken}`,
              'x-access-token': `${tokenHeader}`
            },
            
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get("x-access-token");

        if (newTokenHeader) {
          dispatch(
            updateToken({
              token: newTokenHeader,
            })
          );
        }

        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setTotalAdmins(data.count);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchRejectedCount();
  }, [isSubmitting]);

  useEffect(() => {
    const fetchApprovedCount = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/system/all/app-user-count",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${serverToken}`,
              'x-access-token': `${tokenHeader}`
            },
            
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get("x-access-token");

        if (newTokenHeader) {
          dispatch(
            updateToken({
              token: newTokenHeader,
            })
          );
        }

        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setTotalAppUsers(data.count);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
      }
    };

    fetchApprovedCount();
  }, [isSubmitting]);
  useEffect(() => {
    const fetchApprovedCount = async () => {
      try {
        dispatch(toggleIsSubmittingTrue());
        const response = await fetch(
          "https://dt.mtc.com.na:4000/system/all/admin/list",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${serverToken}`,
              'x-access-token': `${tokenHeader}`
            },
            
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get("x-access-token");

        if (newTokenHeader) {
          dispatch(
            updateToken({
              token: newTokenHeader,
            })
          );
        }

        if (response.ok) {
          dispatch(toggleIsSubmittingfalse());
          setAdminList(data.data);
        } else {
          dispatch(toggleIsSubmittingfalse());
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }
      } catch (error) {
        dispatch(toggleIsSubmittingfalse());
        handleAuthFailure({ dispatch, navigate, type: "network" });
      }
    };

    fetchApprovedCount();
  }, [isSubmitting]);

  const handleUpdate = async (email) => {
    try {
      const response = await fetch(
        "https://dt.mtc.com.na:4000/auth/admin/update/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${serverToken}`,
            'x-access-token': `${tokenHeader}`
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      const newTokenHeader = response.headers.get("x-access-token");
      
      if (newTokenHeader) {
        dispatch(
          updateToken({
            token: newTokenHeader,
          })
        );
      }else{
        handleAuthFailure({ dispatch, navigate, type: "auth" });
      }

      if (response.ok) {
        setUpdatingDetails(data.data);
        setFirstNameDetails(data.data.firstName);
        setLastNameDetails(data.data.lastName);
        setEmailDetails(data.data.email);
        setDepartmentDetails(data.data.department);
        setRoleDetails(data.data.role);
        setContactNumberDetails(data.data.contactNumber);
        setOpenModelEditing(true);
        //setAdminList(data.data);
      } else {
        await Swal.fire({
          position: "center",
          icon: "error",
          title: `${data.message}`,
          showConfirmButton: false,
          timer: 4000,
        });
        
      }
    } catch (error) {
      handleAuthFailure({ dispatch, navigate, type: "network" });
    }
    //setOpenModelEditing(true)
  };
  const handleDeletion = async (email) => {
    if (currentUser.email === email) {
      Swal.fire({
        title: "Are you sure?",
        text: "Your Account will be removed from the system completely!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setIsSubmitting(true);

            const response = await fetch(
              "https://dt.mtc.com.na:4000/auth/admin/delete",
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${serverToken}`,
                  'x-access-token': `${tokenHeader}`
                },
                
                body: JSON.stringify({ email }),
              }
            );

            const data = await response.json();
            const newTokenHeader = response.headers.get("x-access-token");
            
            if (newTokenHeader) {
              dispatch(
                updateToken({
                  token: newTokenHeader,
                })
              );
            }else{
              handleAuthFailure({ dispatch, navigate, type: "auth" });
            }
            if (response.ok) {
              dispatch(toggleSidebarfalse());
              dispatch(
                login({
                  user: {},
                })
              );
              navigate("/");
            } else {
              await Swal.fire({
                position: "center",
                icon: "error",
                title: `${data.message}`,
                showConfirmButton: false,
                timer: 4000,
              });
              
            }
          } catch (error) {
            handleAuthFailure({ dispatch, navigate, type: "network" });
          } finally {
            setIsSubmitting(false);
          }
        }
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "Account will be removed from the system completely!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setIsSubmitting(true);

            const response = await fetch(
              "https://dt.mtc.com.na:4000/auth/admin/delete",
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${serverToken}`,
                  'x-access-token': `${tokenHeader}`
                },
                
                body: JSON.stringify({ email }),
              }
            );

            const data = await response.json();
            const newTokenHeader = response.headers.get("x-access-token");
           
            if (newTokenHeader) {
              dispatch(
                updateToken({
                  token: newTokenHeader,
                })
              );
            }else{
              handleAuthFailure({ dispatch, navigate, type: "auth" });
            }
            if (response.ok) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Admin Successfully Deleted",
                showConfirmButton: false,
                timer: 4000,
              });
            } else {
              await Swal.fire({
                position: "center",
                icon: "error",
                title: `${data.message}`,
                showConfirmButton: false,
                timer: 4000,
              });
              
            }
          } catch (error) {
            handleAuthFailure({ dispatch, navigate, type: "network" });
          } finally {
            setIsSubmitting(false);
          }
        }
      });
    }
  };

  const columns = [
    {
      field: "firstName",
      headerName: "first Name",
      width: isSmallScreen ? 100 : 160,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: isSmallScreen ? 100 : 150,
    },
    { field: "email", headerName: "Email", width: isSmallScreen ? 120 : 220 },
    {
      field: "department",
      headerName: "Department",
      width: isSmallScreen ? 130 : 150,
    },
    { field: "role", headerName: "Role", width: isSmallScreen ? 130 : 130 },
    {
      field: "createdAt",
      headerName: "Created Date",
      width: isSmallScreen ? 180 : 180,
    },
    {
      field: "action",
      headerName: "",
      width: isSmallScreen ? 230 : 350,
      renderCell: (params) => (
        <>
          {currentUser.role === "Super admin" && (
            <>
              <UpdateButton onClick={() => handleUpdate(params.row.email)} />
              <DeleteButton onClick={() => handleDeletion(params.row.email)} />
            </>
          )}
        </>
      ),
    },
  ];

  const rows = adminList.map((admin) => ({
    id: admin.id,
    firstName: admin.firstName,
    lastName: admin.lastName,
    email: admin.email,
    department: admin.department,
    role: admin.role,
    createdAt: admin.createdAt,
  }));

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const companyDepartmentsOptions = [
    { value: "Human Resources" },
    { value: "Finance and Accounting" },
    { value: "Marketing" },
    { value: "Sales" },
    { value: "Operations" },
    { value: "Information Technology" },
    { value: "Legal" },
    { value: "Research and Development (R&D)" },
    { value: "Customer Service" },
    { value: "Administration" },
    { value: "Procurement" },
    { value: "Public Relations" },
    { value: "Product Management" },
    { value: "Quality Assurance" },
    { value: "Logistics" },
    { value: "Health and Safety" },
    { value: "Corporate Strategy" },
    { value: "Training and Development" },
    { value: "Compliance" },
    { value: "Facilities Management" },
    { value: "Environmental Management" },
    { value: "Business Development" },
    { value: "Investor Relations" },
    { value: "Event Management" },
    { value: "Security" },
    { value: "Internal Audit" },
    { value: "Supply Chain Management" },
    { value: "Technical Support" },
    { value: "Creative Services" },
    { value: "Legal Compliance" },
  ];

  const roleOptions = [
    {
      value: "Super admin",
    },
    {
      value: "Admin",
    },
  ];

  const fields1 = [
    { value: firstName, setError: setFirstNameError, name: "First Name" },
    { value: lastName, setError: setlastNameError, name: "Last Name" },
    { value: email, setError: setEmailError, name: "Email" },
    { value: department, setError: setDepartmentError, name: "Department" },
    { value: role, setError: setRoleError, name: "Role" },
    {
      value: contactNumber,
      setError: setContactNumberError,
      name: "Contact Number",
    },
  ];
  const validateFields1 = () => {
    let isValid = true;
    fields1.forEach((field) => {
      field.setError("");
      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      }else{
        if (field.name === "Email" && field.value) {
          if (!emailRegex.test(field.value)) {
            field.setError("Invalid email format.");
            isValid = false;
          }
        }
        if (field.name === "Contact Number" && field.value) {
          if (!namibiaPhoneRegex.test(field.value)) {
            field.setError("Invalid phone number.");
            isValid = false;
          }
        }
      }
    });
    return isValid;
  };

  const fields2 = [
    {
      value: firstNameDetails,
      setError: setFirstNameDetailsError,
      name: "First Name",
    },
    {
      value: lastNameDetails,
      setError: setlastNameDetailsError,
      name: "Last Name",
    },
    { value: emailDetails, setError: setEmailDetailsError, name: "Email" },
    {
      value: departmentDetails,
      setError: setDepartmentDetailsError,
      name: "Department",
    },
    { value: roleDetails, setError: setRoleDetailsError, name: "Role" },
    {
      value: contactNumberDetails,
      setError: setContactNumberDetailsError,
      name: "Contact Number",
    },
  ];
  const validateFields2 = () => {
    let isValid = true;
    fields2.forEach((field) => {
      field.setError("");
      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      }else{
        if (field.name === "Email" && field.value) {
          if (!emailRegex.test(field.value)) {
            field.setError("Invalid email format.");
            isValid = false;
          }
        }
  
        if (field.name === "Contact Number" && field.value) {
          if (!namibiaPhoneRegex.test(field.value)) {
            field.setError("Invalid phone number.");
            isValid = false;
          }
        }
      }
    });
    return isValid;
  };

  const handleSubmitUpdate = async () => {
    if (
      updatingDetails.firstName === firstNameDetails &&
      updatingDetails.lastName === lastNameDetails &&
      updatingDetails.email === emailDetails &&
      updatingDetails.department === departmentDetails &&
      updatingDetails.role === roleDetails &&
      updatingDetails.contactNumber === contactNumberDetails
    ) {
      setUpdatingFail("You have not made any changes");
    } else {
      if (validateFields2()) {
        try {
          setIsSubmitting(true);
          const requestData = {
            firstName: firstNameDetails,
            lastName: lastNameDetails,
            email: emailDetails,
            department: departmentDetails,
            contactNumber: contactNumberDetails,
            role: roleDetails,
          };
          const response = await fetch(
            `https://dt.mtc.com.na:4000/auth/admin/update/user/details/${updatingDetails.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `${serverToken}`,
                'x-access-token': `${tokenHeader}`
              },
              
              body: JSON.stringify(requestData),
            }
          );

          const data = await response.json();
          const newTokenHeader = response.headers.get("x-access-token");
          
          if (newTokenHeader) {
            dispatch(
              updateToken({
                token: newTokenHeader,
              })
            );
          }else{
            handleAuthFailure({ dispatch, navigate, type: "auth" });
          }

          if (response.ok) {
            setOpenModelEditing(false);
            setIsSubmitting(false);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Admin Details Successfully Updated",
              showConfirmButton: false,
              timer: 4000,
            });
            setFirstNameDetails("");
            setLastNameDetails("");
            setEmailDetails("");
            setContactNumberDetails("");
            setDepartmentDetails("");
            setRoleDetails("");
          } else {
            setIsSubmitting(false);
            setOpenModelEditing(false);
            await Swal.fire({
              position: "center",
              icon: "error",
              title: `${data.message}`,
              showConfirmButton: false,
              timer: 4000,
            });
            setFirstNameDetails("");
            setLastNameDetails("");
            setEmailDetails("");
            setContactNumberDetails("");
            setDepartmentDetails("");
            setRoleDetails("");
          }
        } catch (error) {
          setIsSubmitting(false);
          setOpenModelEditing(false);
          handleAuthFailure({ dispatch, navigate, type: "network" });
        }
      }
    }
  };
  const handleSubmit = async () => {
    if (validateFields1()) {
      try {
        setIsSubmitting(true);
        const requestData = {
          firstName,
          lastName,
          email,
          department,
          contactNumber,
          role,
        };

        const response = await fetch(
          "https://dt.mtc.com.na:4000/auth/admin/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${serverToken}`,
              'x-access-token': `${tokenHeader}`
            },
            
            body: JSON.stringify(requestData),
          }
        );

        const data = await response.json();
        const newTokenHeader = response.headers.get("x-access-token");
        
        if (newTokenHeader) {
          dispatch(
            updateToken({
              token: newTokenHeader,
            })
          );
        }else{
          handleAuthFailure({ dispatch, navigate, type: "auth" });
        }

        if (response.ok) {
          setOpenModel(false);
          setIsSubmitting(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Admin Successfully Added",
            showConfirmButton: false,
            timer: 4000,
          });
          setFirstName("");
          setLastName("");
          setEmail("");
          setContactNumber("");
          setDepartment("");
          setRole("");
        } else {
          setIsSubmitting(false);
          setOpenModel(false);
          await Swal.fire({
            position: "center",
            icon: "error",
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 4000,
          });
          setFirstName("");
          setLastName("");
          setEmail("");
          setContactNumber("");
          setDepartment("");
          setRole("");
        }
      } catch (error) {
        setIsSubmitting(false);
        setOpenModel(false);
        handleAuthFailure({ dispatch, navigate, type: "network" });
      }
    }
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
          <p className="msme">Manage Users</p>
          <p>View, search and manage all System users</p>

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
                    <Tooltip title="Total Users" className="pointer">
                      <p className="text">Total Users</p>
                    </Tooltip>
                    <ArrowForwardIosIcon />
                  </div>
                  <div className="d-flex justify-content-start">
                    <div className="p-1 border rounded-2 ml-2">
                      <StickyNote2Icon sx={{ color: "rgba(21, 78, 138, 1)" }} />
                    </div>
                    <Tooltip title={totalSystemUsers}>
                      <p className="digit text pointer">{totalSystemUsers}</p>
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
                    <Tooltip title="Super admins" className="pointer">
                      <p className="text">Super Admins</p>
                    </Tooltip>

                    <ArrowForwardIosIcon />
                  </div>
                  <div className="d-flex align-items-center justify-content-start text-center">
                    <div className="p-1 border rounded-2">
                      <StickyNote2Icon sx={{ color: "rgba(0, 149, 71, 1)" }} />
                    </div>
                    <Tooltip title={totalSuperUser}>
                      <p className="digit text pointer">{totalSuperUser}</p>
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
                    <Tooltip title="Admins" className="pointer">
                      <p className="text">Admins</p>
                    </Tooltip>

                    <ArrowForwardIosIcon />
                  </div>
                  <div className="d-flex align-items-center justify-content-start text-center">
                    <div className="p-1 border rounded-2">
                      <StickyNote2Icon sx={{ color: "rgba(210, 31, 53, 1)" }} />
                    </div>
                    <Tooltip title={totalAdmins}>
                      <p className="digit text pointer">{totalAdmins}</p>
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
                    <Tooltip title="Mobile App Users" className="pointer">
                      <p className="text">Mobile App Users</p>
                    </Tooltip>

                    <ArrowForwardIosIcon />
                  </div>
                  <div className="d-flex align-items-center justify-content-start text-center">
                    <div className="p-1 border rounded-2">
                      <StickyNote2Icon
                        sx={{ color: "rgba(251, 177, 34, 1)" }}
                      />
                    </div>
                    <Tooltip title={totalAppUsers}>
                      <p className="digit text pointer">{totalAppUsers}</p>
                    </Tooltip>
                  </div>
                </div>
              </Box>

              <Box
                gridColumn={isSmallScreen ? "span 12" : "span 12"}
                gridRow="span 3"
              >
                <div className="col-12 mb-4 listing-msme p-4 shadow rounded-3 mb-4">
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
                        placeholder="Search for an Admin"
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon />
                      </IconButton>
                    </Box>
                    {currentUser.role === "Super admin" && (
                      <>
                        <div onClick={handleOpen}>
                          <MyButton text="Add Admin" />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="col-12 mt-1">
                    <p className="list-groupp">Admin List</p>
                    {adminList ? (
                      <>
                        <Box sx={{ height: 500, width: "100%" }}>
                          <DataGrid
                            rows={filteredRows}
                            columns={columns}
                            sx={{
                              "& .MuiDataGrid-root": {
                                fontFamily: "Montserrat, sans-serif",
                              },
                              "& .status-pending": {
                                color: "rgb(234, 156, 0)",
                              },
                              "& .status-rejected": {
                                color: "red",
                              },
                              "& .status-approved": {
                                color: "green",
                              },
                              "& .MuiDataGrid-columnHeaders": {
                                fontWeight: 800,
                                fontFamily: "Montserrat, sans-serif",
                              },
                              "& .MuiDataGrid-columnHeaderTitle": {
                                fontWeight: 600,
                                fontFamily: "Montserrat, sans-serif",
                              },
                              "& .MuiDataGrid-cell": {
                                fontWeight: 400,
                                fontFamily: "Montserrat, sans-serif",
                              },
                            }}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 25, 
                                },
                              },
                            }}
                            pageSizeOptions={[25, 50, 100]}
                            checkboxSelection
                            disableRowSelectionOnClick
                          />
                        </Box>
                      </>
                    ) : (
                      <>
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ height: 500, width: "100%" }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <CircularProgress color="inherit" />
                            <p className="p-4 text-secondary">
                              Just a moment, we’re getting things ready...
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
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
            <Box sx={modalStyle}>
              <div className="d-flex justify-content-between align-items-center">
                <div></div>
                <h1 className="text-center">Add New Admin</h1>
                <CgCloseR
                  style={{
                    color: "red",
                    fontSize: "32px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setContactNumber("");
                    setDepartment("");
                    setRole("");
                    setFirstNameError("");
                    setlastNameError("");
                    setEmailError("");
                    setContactNumberError("");
                    setDepartmentError("");
                    setRoleError("");
                    setOpenModel(false);
                  }}
                />
              </div>

              <Grid
                container
                spacing={{ xs: 1, md: 1 }}
                columns={{ xs: 12, sm: 12, md: 12 }}
                style={{ marginTop: "0px" }}
              >
                <Grid item xs={12} sm={6} md={6}>
                  <div className="form-group pb-md-2">
                    <label htmlFor="firstName" className="pb-2 text-boldd">
                      First Name: <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control place-holder"
                      placeholder="Admin's name"
                      autoComplete="off"
                      value={firstName}
                      name="firstName"
                      onChange={(e) => {
                        setFirstNameError("");
                        setFirstName(e.target.value);
                      }}
                    />
                    {firstNameError && (
                      <>
                        <p className="error-message">{firstNameError}</p>
                      </>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div className="form-group pb-md-2">
                    <label htmlFor="lastName" className="pb-2 text-boldd">
                      Last Name: <span>*</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      className="form-control place-holder"
                      placeholder="Admin's last name"
                      autoComplete="off"
                      name="lastName"
                      onChange={(e) => {
                        setlastNameError("");
                        setLastName(e.target.value);
                      }}
                    />
                    {lastNameError && (
                      <>
                        <p className="error-message">{lastNameError}</p>
                      </>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div className="form-group pb-md-2">
                    <label htmlFor="email" className="pb-2 text-boldd">
                      Email: <span>*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      className="form-control place-holder"
                      placeholder="example@nipdb.com.na"
                      autoComplete="off"
                      name="email"
                      onChange={(e) => {
                        setEmailError("");
                        setEmail(e.target.value);
                      }}
                    />
                    {emailError && (
                      <>
                        <p className="error-message">{emailError}</p>
                      </>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div className="form-group pb-md-2">
                    <label htmlFor="department" className="pb-2 text-boldd">
                      Department: <span>*</span>
                    </label>
                    <select
                      class="form-select"
                      value={department}
                      onChange={(e) => {
                        setDepartmentError("");
                        setDepartment(e.target.value);
                      }}
                    >
                      <option value="" disabled selected>
                        Select department
                      </option>
                      {companyDepartmentsOptions.map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </select>
                    {departmentError && (
                      <>
                        <p className="error-message">{departmentError}</p>
                      </>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div className="form-group pb-md-2">
                    <label htmlFor="role" className="pb-2 text-boldd">
                      Role: <span>*</span>
                    </label>
                    <select
                      class="form-select"
                      value={role}
                      onChange={(e) => {
                        setRoleError("");
                        setRole(e.target.value);
                      }}
                    >
                      <option value="" disabled selected>
                        Select role
                      </option>
                      {roleOptions.map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </select>
                    {roleError && (
                      <>
                        <p className="error-message">{roleError}</p>
                      </>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div className="form-group pb-md-2">
                    <label htmlFor="contactNumber" className="pb-2 text-boldd">
                      Contact Number: <span>*</span>
                    </label>
                    <input
                      type="text"
                      value={contactNumber}
                      className="form-control place-holder"
                      placeholder="081*******"
                      autoComplete="off"
                      name="contactNumber"
                      onChange={(e) => {
                        setContactNumberError("");
                        setContactNumber(e.target.value);
                      }}
                    />
                    {contactNumberError && (
                      <>
                        <p className="error-message">{contactNumberError}</p>
                      </>
                    )}
                  </div>
                </Grid>
                <div className="d-flex justify-content-center w-100 mt-md-4">
                  <button
                    className="btn btn-success m-1 p-2 w-50 text-boldd"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </Grid>
            </Box>
          </Modal>
          <Modal
            open={openModelEditing}
            onClose={handleCloseEditing}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <div className="d-flex justify-content-between align-items-center">
                <div></div>
                <h1 className="text-center">Update Admin Details</h1>
                <CgCloseR
                  style={{
                    color: "red",
                    fontSize: "32px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setFirstNameDetails("");
                    setLastNameDetails("");
                    setEmailDetails("");
                    setContactNumberDetails("");
                    setDepartmentDetails("");
                    setRoleDetails("");
                    setFirstNameDetailsError("");
                    setlastNameDetailsError("");
                    setEmailDetailsError("");
                    setContactNumberDetailsError("");
                    setDepartmentDetailsError("");
                    setRoleDetailsError("");
                    setUpdatingFail("");
                    setOpenModelEditing(false);
                  }}
                />
              </div>

              {updatingFail && (
                <>
                  <div className="col-md-6 p-1 p-md-3 error-div d-flex justify-content-center align-items-center m-auto">
                    <p>{updatingFail}</p>
                  </div>
                </>
              )}
              <Grid
                container
                spacing={{ xs: 1, md: 1 }}
                columns={{ xs: 12, sm: 12, md: 12 }}
                style={{ marginTop: "0px" }}
              >
                <Grid item xs={12} sm={6} md={6}>
                  <div className="form-group pb-md-2">
                    <label htmlFor="firstName" className="pb-2 text-boldd">
                      First Name: <span>*</span>
                    </label>
                    <input
                      type="text"
                      value={firstNameDetails}
                      className="form-control place-holder"
                      placeholder="Admin's name"
                      autoComplete="off"
                      name="firstName"
                      onChange={(e) => {
                        setFirstNameDetailsError("");
                        setUpdatingFail("");
                        setFirstNameDetails(e.target.value);
                      }}
                    />
                    {firstNameDetailsError && (
                      <>
                        <p className="error-message">{firstNameDetailsError}</p>
                      </>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div className="form-group pb-md-2">
                    <label htmlFor="lastName" className="pb-2 text-boldd">
                      Last Name: <span>*</span>
                    </label>
                    <input
                      type="text"
                      value={lastNameDetails}
                      className="form-control place-holder"
                      placeholder="Admin's last name"
                      autoComplete="off"
                      name="lastName"
                      onChange={(e) => {
                        setlastNameDetailsError("");
                        setUpdatingFail("");
                        setLastNameDetails(e.target.value);
                      }}
                    />
                    {lastNameDetailsError && (
                      <>
                        <p className="error-message">{lastNameDetailsError}</p>
                      </>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div className="form-group pb-md-2">
                    <label htmlFor="email" className="pb-2 text-boldd">
                      Email: <span>*</span>
                    </label>
                    <input
                      type="email"
                      value={emailDetails}
                      className="form-control place-holder"
                      placeholder="example@nipdb.com.na"
                      autoComplete="off"
                      name="email"
                      onChange={(e) => {
                        setUpdatingFail("");
                        setEmailDetailsError("");
                        setEmailDetails(e.target.value);
                      }}
                    />
                    {emailDetailsError && (
                      <>
                        <p className="error-message">{emailDetailsError}</p>
                      </>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div className="form-group pb-md-2">
                    <label htmlFor="department" className="pb-2 text-boldd">
                      Department: <span>*</span>
                    </label>
                    <select
                      class="form-select"
                      value={departmentDetails}
                      onChange={(e) => {
                        setDepartmentDetailsError("");
                        setUpdatingFail("");
                        setDepartmentDetails(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        Select department
                      </option>
                      {companyDepartmentsOptions.map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </select>
                    {departmentDetailsError && (
                      <>
                        <p className="error-message">{departmentDetailsError}</p>
                      </>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div className="form-group pb-md-2">
                    <label htmlFor="role" className="pb-2 text-boldd">
                      Role: <span>*</span>
                    </label>
                    <select
                      class="form-select"
                      value={roleDetails}
                      onChange={(e) => {
                        setRoleDetailsError("");
                        setUpdatingFail("");
                        setRoleDetails(e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        Select role
                      </option>
                      {roleOptions.map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </select>
                    {roleDetailsError && (
                      <>
                        <p className="error-message">{roleDetailsError}</p>
                      </>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div className="form-group pb-md-2">
                    <label htmlFor="contactNumberDetails" className="pb-2 text-boldd">
                      Contact Number: <span>*</span>
                    </label>
                    <input
                      type="text"
                      value={contactNumberDetails}
                      className="form-control place-holder"
                      placeholder="081*******"
                      autoComplete="off"
                      name="contactNumberDetails"
                      onChange={(e) => {
                        setContactNumberDetailsError("");
                        setUpdatingFail("");
                        setContactNumberDetails(e.target.value);
                      }}
                    />
                    {contactNumberDetailsError && (
                      <>
                        <p className="error-message">
                          {contactNumberDetailsError}
                        </p>
                      </>
                    )}
                  </div>
                </Grid>
                <div className="d-flex justify-content-center w-100 mt-md-4">
                  <button
                    className="btn btn-success m-1 p-2 w-50 text-boldd"
                    onClick={handleSubmitUpdate}
                  >
                    Update
                  </button>
                </div>
              </Grid>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}

export default User;
