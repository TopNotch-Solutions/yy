import React, { useEffect, useState } from "react";
import "../assets/css/AdminLogin.css";
import logo from "../assets/images/in4logo.png";
import mtclogo from "../assets/images/banner.png";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from "react-toastify";
import { toggleSidebarTrue } from "../redux/reducers/sidebarReducer";
import { toggleSidebarfalse } from "../redux/reducers/sidebarReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {login} from "../redux/reducers/authReducer";

function SubmitEmail() {
    const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");

    if (validateForm()) {
      try {
        setIsSubmitting(true);
        const response = await fetch("http://localhost:4000/auth/admin/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            email
          }),
        });

        const data = await response.json();

        if (response.ok) {
            setIsSubmitting(false);
            setEmail("");
            toast.success(data.message);
        } else {
          setIsSubmitting(false);
          toast.error(data.message);
        }
      } catch (error) {
        setIsSubmitting(false);
        toast.error(
          "Network error. Please check your network connection and try again",
          "Please check your network connection and try again"
        );
      }
    }
  };
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const validateForm = () => {
    let valid = true;
    if (!email) {
      setEmailError("Username is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Username is invalid");
      valid = false;
    }
    return valid;
  };
  return (
    <div className="">
      <div className="d-flex vh-100 w-100 ">
        {/* <div className="d-none d-lg-block d-lg-flex col-lg-6 col-xl-7 justify-content-center align-items-center left-box">
          <img
            src={logo}
            alt="Illustration"
            className="img-fluid mtc-logo-login"
          />
        </div> */}
        <div className="m-auto col-11 col-md-10 col-lg-6 col-xl-5 d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex align-items-center">
            <h3 className="portal-text">IN4MSME Portal</h3>
            {/* <img
              src={mtclogo}
              alt="Illustration"
              className="img-fluid"
              style={{ width: 100, height: 100 }}
            /> */}
          </div>
          <div className="col-12 col-sm-9 col-md-8 col-lg-10 col-xl-9 p-4 position-relative  p-lg-4 p-xxl-5 rounded-3 bg-white shadow text-start">
          <form onSubmit={handleSubmit}>
                <h3>Email Submission</h3>
                <p className="pb-md-3">To reset your password, submit your email address below. If we can find you in the database, an email will be sent to your email address, with instructions how to get access again.</p>
                <div className="form-group pb-3">
                  <label htmlFor="email" className="pb-2">
                    Username
                  </label>
                  <input
                    type="text"
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
                      <p className="error mt-1">{emailError}</p>
                    </>
                  )}
                </div>
                <button type="submit" className="submission" disabled={isSubmitting}>
                {isSubmitting ? <div className="loader"></div> : "Submit"}
                </button>
                <div className="mt-4 d-flex justify-content-center">
                <ArrowBackIosNewIcon fontSize="small" style={{marginTop:"3px", fontSize:"18px", marginRight:"10px"}}/>
                <p className="back-to-login" onClick={() =>navigate('/')}>back to login</p>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitEmail