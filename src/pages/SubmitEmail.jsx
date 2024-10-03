import React, {useState } from "react";
import "../assets/css/AdminLogin.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SubmitEmail() {
  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
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
          toast.error("Username not found in our database. Verify username and try again!");
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
        <div className="m-auto col-11 col-md-10 col-lg-6 col-xl-5 d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex align-items-center">
            <h3 className="portal-text">IN4MSME Portal</h3>
          </div>
          <div className="col-12 col-sm-9 col-md-8 col-lg-10 col-xl-9 p-4 position-relative  p-lg-4 p-xxl-5 rounded-3 bg-white shadow text-start">
          <form onSubmit={handleSubmit}>
                <h3>Email Submission</h3>
                <p className="pb-md-3 text-secondary">To reset your password, submit your email address below. If we can find you in the database, an email will be sent to your email address, with instructions how to get access again.</p>
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
                <div className="mt-2 d-flex justify-content-center">
                <button
                    onClick={() =>navigate('/')}
                    className="back"
                
                  >
                    Back
                  </button>
                {/* <p className="back-to-login" onClick={() =>navigate('/')}>back to login</p> */}
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitEmail