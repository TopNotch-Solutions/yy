import React, { useEffect, useState } from "react";
import { IconButton, useTheme, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import "../assets/css/notifications.css";
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
import { IoTrashBin } from "react-icons/io5";
import { CgCloseR } from "react-icons/cg";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ModelButton from "../components/commons/ModelButton";
import DeleteButton from "../components/commons/DeleteButton";
import ViewButton from "../components/commons/ViewButton";
import NViewButton from "../components/commons/NViewButton";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

function Notifications() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [buttonActive, setButonActive] = useState(1);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationError, setNotificationError] = useState("");
  const [priority, setPriority] = useState("");
  const [priorityError, setPriorityError] = useState("");
  const [updatedId, setUpdatedId] = useState(null);

  const [textCounter, setTextCounter] = useState(0);
  const [notificationActive, setNotificationActive] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allAdminNotifications, setAllAdminNotifications] = useState([]);
  const [singleAdminNotification, setSingleAdminNotification] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [openModelView, setOpenModelView] = useState(false);
  const handleOpen = () => setOpenModel(true);
  const handleOpenView = () => setOpenModelView(true);
  const handleClose = () => {
    setTitle("");
    setPriority("");
    setNotification("");
    setTextCounter(0);
    setNotificationActive("All");
    setOpenModel(false);
  };
  const handleCloseView = () => {
    setOpenModelView(false);
  };
  useEffect(() => {
    const fetchAllAdminNotifications = async () => {
      try {
        setIsSubmitting(true);
        const response = await fetch(
          `http://localhost:4000/notifications/admin/single/notifications`,
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
          setAllAdminNotifications(data.data);
        } else {
          setIsSubmitting(false);
          // if(!data.isAuthenticated){
          //   dispatch(toggleSidebarfalse());
          // dispatch(
          //   login({
          //     user: {},
          //   })
          // );
          // navigate("/");
          // }
        }
      } catch (error) {
        setIsSubmitting(false);
      }
    };

    fetchAllAdminNotifications();
  }, [isSubmitting]);

  const handleStep5 = async () => {
    if (validateFields()) {
      try {
        setIsSubmitting(true);
        const requestData = {
          title,
          priority,
          notification,
          notificationActive,
          type: "Alert",
          senderId: currentUser.id,
        };
        const response = await fetch(
          `http://localhost:4000/notifications/admin/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(requestData),
          }
        );
        const data = await response.json();

        if (response.ok) {
          setOpenModel(false);
          setIsSubmitting(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Notification successfully added",
            showConfirmButton: false,
            timer: 3000,
          });
          setTitle("");
          setPriority("");
          setNotification("");
        } else {
          setIsSubmitting(false);
          setOpenModel(false);
          await Swal.fire({
            position: "center",
            icon: "error",
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 3000,
          });
          setTitle("");
          setPriority("");
          setNotification("");
          // if(!data.isAuthenticated){
          //   dispatch(toggleSidebarfalse());
          // dispatch(
          //   login({
          //     user: {},
          //   })
          // );
          // navigate("/");
          // }
        }
      } catch (error) {
        setIsSubmitting(false);
        setOpenModel(false);
        Swal.fire({
          position: "center",
          icon: "question",
          title: "Check your internet connection and try again!",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }
  };
  const handleView = async (id) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(
        `http://localhost:4000/notifications/admin/single/${id}`,
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
        setIsSubmitting(false);
        setUpdatedId(id);
        setSingleAdminNotification(data.data)
        setOpenModelView(true);
      } else {
        setIsSubmitting(false);
        await Swal.fire({
          position: "center",
          icon: "error",
          title: `${data.message}`,
          showConfirmButton: false,
          timer: 3000,
        });
        // if(!data.isAuthenticated){
        //   dispatch(toggleSidebarfalse());
        // dispatch(
        //   login({
        //     user: {},
        //   })
        // );
        // navigate("/");
        // }
      }
    } catch (error) {
      setIsSubmitting(false);
      setOpenModel(false);
      Swal.fire({
        position: "center",
        icon: "question",
        title: "Check your internet connection and try again!",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };
  const handleDeletion = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Notification will be removed from the system completely!",
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
            `http://localhost:4000/notifications/admin/delete/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          const data = await response.json();
          console.log(data);
          if (response.ok) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Notification Successfully Deleted",
              showConfirmButton: false,
              timer: 3000,
            });
          } else {
            console.error("Server Error:", data.message);
            await Swal.fire({
              position: "center",
              icon: "error",
              title: `${data.message}`,
              showConfirmButton: false,
              timer: 3000,
            });
            // if(!data.isAuthenticated){
            //   dispatch(toggleSidebarfalse());
            // dispatch(
            //   login({
            //     user: {},
            //   })
            // );
            // navigate("/");
            // }
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
        } finally {
          setIsSubmitting(false);
        }
      }
    });
    
  };
  const handleNoticationDeletion =async (id) =>{
    try {
      setIsSubmitting(true);

      const response = await fetch(
        `http://localhost:4000/notifications/admin/delete/${updatedId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setIsSubmitting(false);

        setOpenModelView(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Notification Successfully Deleted",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        setIsSubmitting(false);
        // if(!data.isAuthenticated){
        //   dispatch(toggleSidebarfalse());
        // dispatch(
        //   login({
        //     user: {},
        //   })
        // );
        // navigate("/");
        // }
      }
    } catch (error) {
      setIsSubmitting(false);
  }
  }
  const columns = [
    {
      field: "notification",
      headerName: "Notification",
      width: isSmallScreen ? 180 : 300,
    },
    { field: "type", headerName: "Type", width: isSmallScreen ? 100 : 130 },
    {
      field: "priority",
      headerName: "Priority",
      width: isSmallScreen ? 100 : 130,
    },
    { field: "viewed", headerName: "Viewed", width: isSmallScreen ? 100 : 130 },
    {
      field: "createdAt",
      headerName: "Created_At",
      width: isSmallScreen ? 130 : 300,
    },
    {
      field: "action",
      headerName: "",
      width: isSmallScreen ? 230 : 350,
      renderCell: (params) => (
        <>
          <NViewButton onClick={() => handleView(params.row.id)} />
          <DeleteButton onClick={() => handleDeletion(params.row.id)} />
        </>
      ),
    },
  ];

  const rows = allAdminNotifications.map((admin) => ({
    id: admin.id,
    notification: admin.notification,
    type: admin.type,
    priority: admin.priority,
    viewed: admin.viewed,
    createdAt: admin.createdAt,
  }));
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const notificationsOptions = [
    {
      value: "High",
    },
    {
      value: "Medium",
    },
    {
      value: "Low",
    },
  ];

  const fields = [
    { value: title, setError: setTitleError, name: "Title" },
    { value: priority, setError: setPriorityError, name: "Priority" },
    {
      value: notification,
      setError: setNotificationError,
      name: "Notification",
    },
  ];
  const validateFields = () => {
    let isValid = true;
    fields.forEach((field) => {
      field.setError("");
      if (!field.value) {
        field.setError(`${field.name} is required.`);
        isValid = false;
      }
    });
    return isValid;
  };

  return (
    <div className="container-fluid mt-4">
      <p className="msme">Manage Notifications</p>
      <p>
        Welcome to the Manage Notification page. This page allows you to send
        and manage notifications for both MSME and regular app users
      </p>

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
            gridColumn={isSmallScreen ? "span 12" : "span 12"}
            gridRow="span 3"
          >
            <div className="col-12 mb-4 listing-msme p-4 shadow rounded-3 mb-4">
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-12 col-xxl-9 mx-auto border d-flex flex-wrap justify-content-between p-1">
                    <button
                      className={
                        buttonActive === 1
                          ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                          : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                      }
                      onClick={() => setButonActive(1)}
                    >
                      All
                    </button>
                    <button
                      className={
                        buttonActive === 2
                          ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                          : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                      }
                      onClick={() => setButonActive(2)}
                    >
                      Inbox
                    </button>
                    <button
                      className={
                        buttonActive === 3
                          ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                          : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                      }
                      onClick={() => setButonActive(3)}
                    >
                      Sent
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
                        placeholder="Search for a notification"
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon />
                      </IconButton>
                    </Box>
                    <div onClick={handleOpen}>
                      <MyButton text="New Notification" />
                    </div>
                  </div>
                  <div className="col-12 mt-1">
                    <p className="list-group">All Notification List</p>
                    <Box sx={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={filteredRows}
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
                        placeholder="Search for sent notification"
                        //onChange={handleSearchChange}
                      />
                      <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon />
                      </IconButton>
                    </Box>
                    <div onClick={handleOpen}>
                      <MyButton text="New Notification" />
                    </div>
                  </div>
                  <div className="col-12 mt-1">
                    <p className="list-group">Sent List</p>
                    <Box sx={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={rows}
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
                        placeholder="Search for inbox notification"
                        //onChange={handleSearchChange}
                      />
                      <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon />
                      </IconButton>
                    </Box>
                    <div onClick={handleOpen}>
                      <MyButton text="New Notification" />
                    </div>
                  </div>
                  <div className="col-12 mt-1">
                    <p className="list-group">Inbox List</p>
                    <Box sx={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={rows}
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
          <h1 className="text-center">Add New Notification</h1>
          <div className="container-fluid mt-md-4">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-12 col-xxl-9 mx-auto border d-flex flex-wrap justify-content-between p-1">
                <button
                  className={
                    notificationActive === "All"
                      ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                      : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                  }
                  onClick={() => {
                    setNotificationActive("All");
                  }}
                >
                  All
                </button>
                <button
                  className={
                    notificationActive === "Business"
                      ? "btn btn-success m-1 p-2 p-xl-3 flex-grow-1"
                      : "btn button-grey m-1 p-2 p-xl-3 flex-grow-1"
                  }
                  onClick={() => {
                    setNotificationActive("Business");
                  }}
                >
                  Business
                </button>
              </div>
            </div>
          </div>
          <Grid
            container
            spacing={{ xs: 1, md: 1 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
            style={{ marginTop: "10px" }}
          >
            <Grid item xs={12} sm={6} md={6}>
              <div className="form-group pb-3">
                <label htmlFor="email" className="pb-2">
                  Title: <span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control place-holder"
                  placeholder="Enter title"
                  autoComplete="off"
                  name="email"
                  onChange={(e) => {
                    setTitleError("");
                    setTitle(e.target.value);
                  }}
                />
                {titleError && (
                  <>
                    <p className="error mt-1">{titleError}</p>
                  </>
                )}
              </div>
              <div className="form-group pb-3">
                <label htmlFor="email" className="pb-2">
                  Prority: <span>*</span>
                </label>
                <select
                  class="form-select"
                  //value={department}
                  //disabled={!isEditing ? true : false}
                  onChange={(e) => {
                    setPriorityError("");
                    setPriority(e.target.value);
                  }}
                >
                  <option value="" disabled selected={!priority}>
                    Select priority
                  </option>
                  {notificationsOptions.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
                {priorityError && (
                  <>
                    <p className="error mt-1">{priorityError}</p>
                  </>
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <div className="form-group pb-3">
                <label htmlFor="email" className="pb-2">
                  Notification: <span>*</span>
                </label>
                <textarea
                  type="textArea"
                  rows="5"
                  cols="50"
                  className="form-control place-holder"
                  maxlength="700"
                  placeholder="Type here.........."
                  autoComplete="off"
                  name="email"
                  onChange={(e) => {
                    //setEmailError("");
                    setTextCounter(e.target.value.length);
                    setNotificationError("");
                    setNotification(e.target.value);
                  }}
                />
              </div>
              <div className="float-end text-counter">
                <span>{textCounter}</span>
                <span>/700</span>
              </div>
              {notificationError && (
                <>
                  <p className="error mt-1">{notificationError}</p>
                </>
              )}
            </Grid>

            <Grid item xs={12}>
              <div className="float-end">
                <button
                  className="btn btn-success m-1 p-2 modelButton"
                  onClick={handleStep5}
                >
                  Send
                </button>
              </div>
            </Grid>
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
          <div className="w-100 d-flex border-bottom mt-1 mt-md-2 my-border">
            <div className="col-2 col-md-1">
            <Tooltip title="close">
  <CgCloseR
    style={{
      color: "grey",
      fontSize: "32px",
      cursor: "pointer",
    }}
    onClick={() => setOpenModelView(false)}
  />
</Tooltip>
            
            </div>
            <div className="col-10 col-md-11">
              <div className="d-flex justify-content-between">
              <h5>{singleAdminNotification.type}</h5>
              <p>{singleAdminNotification.createdAt}</p>
              </div>
              <p>
                {singleAdminNotification.notification}
              </p>
            </div>
          </div>
          <div className="float-end mt-2">
            <Tooltip title="delete">
            <IoTrashBin style={{
            color:"red",
            fontSize:isSmallScreen ? "32px":"25px",
             cursor:"pointer"
          }} onClick={handleNoticationDeletion}/>
            </Tooltip>
          
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Notifications;
