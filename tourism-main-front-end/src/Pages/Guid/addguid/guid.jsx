import "./guid.css";
import { Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer_Dialog from "./../../../Components/Footer_Dialog/Footer_Dialog";
import ImageInput from "../../../Components/input/imageinput/imageinput";
import Inputs from "../../../Components/input/normalinput/inputs";
import { Bio } from "../../../Components/index";
import { useDispatch } from "react-redux";
import { addguid } from "./guidSlice";
// const baseurl="http://192.168.73.195:8000"

function Guid() {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [bioError, setBioError] = useState("");
  const [emailError, setEmailError] = useState("");

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate("/Guidspage");
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      setNameError("Name must not contain numbers.");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateBio = (bio) => {
    const wordCount = bio.trim().split(/\s+/).length;
    if (wordCount < 35) {
      setBioError("Bio must contain at least 35 words.");
      return false;
    }
    setBioError("");
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit called");

    if (validateName(name) && validateEmail(email) && validateBio(bio)) {
      dispatch(
        addguid({
          name,
          avatar,
          email,
          bio,
        })
      );
      handleClose();
    }
  };

  return (
    <div>
      <Dialog open={open} className="dialog">
        <div className="add-hotel-container">
          <div className="upload-image">
            <ImageInput onFilesSelected={(e) => setAvatar(e.target.files[0])} />
          </div>
          <div className="grid-containerq">
            <Inputs
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
            />
            {emailError && <p className="error">{emailError}</p>}
            <Inputs
              placeholder="Full Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              onBlur={() => validateName(name)}
            />
            {nameError && <p className="error">{nameError}</p>}
            <Bio
              onChange={(e) => setBio(e.target.value)}
              onBlur={() => validateBio(bio)}
            />
            {bioError && <p className="error">{bioError}</p>}
          </div>
          <div className="footer_dialog2">
            <Footer_Dialog onClick1={handleClose} onClick2={handleSubmit} />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Guid;
