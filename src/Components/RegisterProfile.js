import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const RegisterProfile = () => {
  const { usernameReg } = useParams();
  // eslint-disable-next-line
  const [username, setUsername] = useState(usernameReg);
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [cityValidity, setCityValidity] = useState(false);
  const [birthdayValidity, setBirthdayValidity] = useState(false);
  const [photoValidity, setPhotoValidity] = useState(false);
  const [errorCityDisp, setErrorCityDisp] = useState(false);
  const [errorBirthdayDisp, setErrorBirthdayDisp] = useState(false);
  const [errorPhotoDisp, setErrorPhotoDisp] = useState(false);
  const [errorBorderCityColor, setErrorBorderCityColor] = useState("");
  const [errorBorderBirthdayColor, setErrorBorderBirthdayColor] = useState("");
  const [formInput, setFormInput] = useState({
    city: "",
    birthday: "",
  });
  const [userId, setUserId] = useState("");
  const [feed, setFeed] = useState(false);

  const handleCityInput = (e) => {
    e.preventDefault();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
    setCityValidity(true);
    setErrorCityDisp(false);
    setErrorBorderCityColor("");
  };
  const handleBirthdayInput = (e) => {
    e.preventDefault();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
    setBirthdayValidity(true);
    setErrorBirthdayDisp(false);
    setErrorBorderBirthdayColor("");
  };

  const handleInput2 = (e) => {
    setFile(e.target.files[0]);
    setPhotoValidity(true);
    setErrorPhotoDisp(false);
  };

  const autoregistr = (e) => {
    e.preventDefault();

    if (
      cityValidity === true &&
      birthdayValidity === true &&
      photoValidity === true
    ) {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("birthday", formInput.birthday);
      formData.append("city", formInput.city);
      formData.append("image", file);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post("http://localhost:5001/registeraddtl", formData, config)
        .then((response) => {
          if (response.status === 200) {
            const id = response["data"]["result"]["0"]["userid"];
            setUserId(id);
            setFeed(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (cityValidity === true && birthdayValidity === true) {
      setErrorPhotoDisp(true);
    } else if (cityValidity === true && photoValidity === true) {
      setErrorBirthdayDisp(true);
      setErrorBorderBirthdayColor("red");
    } else if (birthdayValidity === true && photoValidity === true) {
      setErrorCityDisp(true);
      setErrorBorderCityColor("red");
    } else if (birthdayValidity === true) {
      setErrorCityDisp(true);
      setErrorPhotoDisp(true);
      setErrorBorderCityColor("red");
    } else if (cityValidity === true) {
      setErrorBirthdayDisp(true);
      setErrorPhotoDisp(true);
      setErrorBorderBirthdayColor("red");
    } else if (photoValidity === true) {
      setErrorCityDisp(true);
      setErrorBirthdayDisp(true);
      setErrorBorderBirthdayColor("red");
    } else {
      console.log("Try Again");
      setErrorCityDisp(true);
      setErrorBirthdayDisp(true);
      setErrorPhotoDisp(true);
      setErrorBorderCityColor("red");
      setErrorBorderBirthdayColor("red");
    }
  };

  const registeraddtl = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("birthday", formInput.birthday);
    formData.append("city", formInput.city);
    formData.append("image", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("http://localhost:5001/registeraddtl", formData, config)
      .then((response) => {
        if (response.status === 200) {
          const id = response["data"]["result"]["0"]["userid"];
          setUserId(id);
          setFeed(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .post("http://localhost:5001/addselffeed", { userid: userId })
      .then((response) => {
        console.log(response);
        if (response.status === 200 && response["data"]["array"] != null) {
          swal(
            "Details added",
            "You have successfully added additional details",
            "success"
          );
          navigate(`/homepage/${userId}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [feed]);

  return (
    <Fade right>
      <div className="col-6 profile">
        <h1>Finish your profile</h1>

        <form onSubmit={autoregistr} encType="multipart/form-data">
          <div className="row">
            <div className="col-9 form-floating mb-3 form">
              <input
                type="text"
                className="form-control"
                style={{ borderColor: `${errorBorderCityColor}` }}
                name="city"
                placeholder="city"
                onChange={handleCityInput}
              />
              <label htmlFor="fullname">City</label>
            </div>
            <div className="col-3 mb-3 errorMessage">
              {errorCityDisp && (
                <p className="cityError">
                  <i className="bi bi-exclamation-triangle-fill"></i> Input City
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-9 form-floating mb-3 form">
              <input
                type="date"
                className="form-control"
                style={{ borderColor: `${errorBorderBirthdayColor}` }}
                name="birthday"
                placeholder="date"
                onChange={handleBirthdayInput}
              />
              <input
                type="text"
                className="form-control"
                name="username"
                hidden
                value={username}
                readOnly
              />
              <label htmlFor="birthday">Birthday</label>
            </div>
            <div className="col-3 mb-3 errorMessage">
              {errorBirthdayDisp && (
                <p className="birthdayError">
                  <i className="bi bi-exclamation-triangle-fill"></i> Input
                  Birthday
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-9 form image-upload mb-3">
              <label>Profile Photo</label>
              <br />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInput2}
              />
            </div>
            <div className="col-3 mb-3 errorMessage">
              {errorPhotoDisp && (
                <p className="photoError">
                  <i className="bi bi-exclamation-triangle-fill"></i> Upload
                  Photo
                </p>
              )}
            </div>
          </div>
          <div className="submit">
            <input type="submit" />
          </div>
        </form>
      </div>
    </Fade>
  );
};

export default RegisterProfile;
