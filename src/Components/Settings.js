import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavbarLoggedIn from "./NavbarLoggedIn";
import SettingsMenu from "./SettingsMenu";
import "bootstrap-icons/font/bootstrap-icons.css";
import swal from "sweetalert";

const Settings = () => {
  const navigate = useNavigate();
  const { userid } = useParams();
  const [axiosResult, setAxiosResult] = useState([]);
  const [editingEmailMode, setEditingEmailMode] = useState(false);
  const [editingUsernameMode, setEditingUsernameMode] = useState(false);
  const [editingPasswordMode, setEditingPasswordMode] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState("");
  const [invalidUsernameMessage, setInvalidUsernameMessage] = useState("");
  const [invalidEmailMessage, setInvalidEmailMessage] = useState("");
  const [invalidConPWMessage, setInvalidConPWMessage] = useState("");
  const [hiddenErrorMessage, setHiddenErrorMessage] = useState(false);
  const [hiddenEmailErrorMessage, setHiddenEmailErrorMessage] = useState(false);
  const [hiddenUsernameErrorMessage, setHiddenUsernameErrorMessage] =
    useState(false);
  const [hiddenConPWErrorMessage, setHiddenConPWErrorMessage] = useState(false);
  const [password, setPassword] = useState("");
  const [formInput, setFormInput] = useState({
    email: "",
    username: "",
    password: "",
  });

  // eslint-disable-next-line
  let regExEmail =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
  // eslint-disable-next-line
  let regExPW = /^(?=.*\d).{4,8}$/;

  const emailChecker = (e) => {
    e.preventDefault();
    if (!regExEmail.test(e.target.value)) {
      setInvalidEmailMessage("is-invalid");
      setHiddenEmailErrorMessage(true);
    } else {
      setFormInput({ ...formInput, [e.target.name]: e.target.value });
      setInvalidEmailMessage("");
      setHiddenEmailErrorMessage(false);
    }
  };
  const usernameChecker = (e) => {
    e.preventDefault();
    if (e.target.value.length < 5) {
      setInvalidUsernameMessage("is-invalid");
      setHiddenUsernameErrorMessage(true);
    } else {
      setFormInput({ ...formInput, [e.target.name]: e.target.value });
      setInvalidUsernameMessage("");
      setHiddenUsernameErrorMessage(false);
    }
  };

  const passwordChecker = (e) => {
    e.preventDefault();
    if (!regExPW.test(e.target.value)) {
      setInvalidMessage("is-invalid");
      setHiddenErrorMessage(true);
    } else {
      setInvalidMessage("");
      setHiddenErrorMessage(false);
      setPassword(e.target.value);
    }
  };
  const conPWChecker = (e) => {
    e.preventDefault();
    if (password !== e.target.value) {
      setInvalidConPWMessage("is-invalid");
      setHiddenConPWErrorMessage(true);
    } else {
      setFormInput({ ...formInput, [e.target.name]: e.target.value });
      setInvalidConPWMessage("");
      setHiddenConPWErrorMessage(false);
      console.log(formInput);
    }
  };
  useEffect(() => {
    axios
      .post("http://localhost:5001/profile", { userid: userid })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setAxiosResult(res["data"]["array"][0]);
        }
      });
  }, [editingEmailMode, editingUsernameMode, userid]);

  const editEmailHandler = () => {
    setEditingEmailMode(true);
  };
  const editUsernameHandler = () => {
    setEditingUsernameMode(true);
  };
  const editPasswordHandler = () => {
    setEditingPasswordMode(true);
  };
  const doneEditEmailHandler = () => {
    setEditingEmailMode(false);
  };
  const doneEditUsernameHandler = () => {
    setEditingUsernameMode(false);
  };
  const doneEditPasswordHandler = () => {
    setEditingPasswordMode(false);
  };

  const saveEmailHandler = (e) => {
    e.preventDefault();
    const data = {
      email: formInput.email,
      userid: userid,
    };
    console.log(data);
    axios.post("http://localhost:5001/editemail", data).then((res) => {
      if (res.status === 200) {
        console.log(res);
        swal("Success", "E-mail has been edited", "success");
        doneEditEmailHandler();
      }
    });
  };

  const saveUsernameHandler = (e) => {
    e.preventDefault();
    const data = {
      username: formInput.username,
      userid: userid,
    };
    console.log(data);
    axios.post("http://localhost:5001/editusername", data).then((res) => {
      if (res.status === 200) {
        console.log(res);
        swal("Success", "Username has been edited", "success");
        doneEditUsernameHandler();
      }
    });
  };

  const savePasswordHandler = (e) => {
    e.preventDefault();
    const data = {
      password: formInput.password,
      userid: userid,
    };
    console.log(data);
    axios.post("http://localhost:5001/editpassword", data).then((res) => {
      if (res.status === 200) {
        console.log(res);
        swal("Success", "Password has been edited", "success");
        doneEditPasswordHandler();
      }
    });
  };

  const deleteAccount = () => {
    console.log(userid);

    axios
      .post("http://localhost:5001/deleteaccount", { userid: userid })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          swal(
            "Deleted Account",
            "Please wait for 5 seconds, you will be redirected to the homepage",
            "info"
          );
          setTimeout(() => {
            navigate("/");
          }, 5000);
        }
      });
  };

  return (
    <>
      <NavbarLoggedIn link={userid} />
      <section className="settings">
        <div className="container">
          <div className="row pt-5">
            <div className="col-12 title">
              <h1>Account Settings</h1>
            </div>
            <div className="col-12 account">
              <div className="row">
                {!editingEmailMode ? (
                  <>
                    <SettingsMenu title="Email:" input={axiosResult.email} />
                  </>
                ) : (
                  <>
                    <div className="col-3 accountMenuTitle">
                      <h1>Email:</h1>
                    </div>
                    <div className="col-4 form">
                      <input
                        type="text"
                        className={`form-control ${invalidEmailMessage}`}
                        id="post"
                        name="email"
                        placeholder={axiosResult.email}
                        onChange={emailChecker}
                      />
                    </div>
                    <div className="col-4 errorMessage">
                      {hiddenEmailErrorMessage && (
                        <p>
                          <i className="bi bi-exclamation-triangle-fill"></i>{" "}
                          Invalid Email
                        </p>
                      )}
                    </div>
                  </>
                )}
                {!editingEmailMode ? (
                  <div className="col-1 edit">
                    <button onClick={editEmailHandler}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </div>
                ) : (
                  <div className="col-1 edit">
                    <button onClick={saveEmailHandler}>
                      <i className="bi bi-check-lg green"></i>
                    </button>
                    <button onClick={doneEditEmailHandler}>
                      <i className="bi bi-x-lg red"></i>
                    </button>
                  </div>
                )}
                {!editingUsernameMode ? (
                  <>
                    <SettingsMenu
                      title="Username:"
                      input={axiosResult.username}
                    />
                  </>
                ) : (
                  <>
                    <div className="col-3 accountMenuTitle">
                      <h1>Username:</h1>
                    </div>
                    <div className="col-4 form">
                      <input
                        type="text"
                        className={`form-control ${invalidUsernameMessage}`}
                        id="post"
                        name="username"
                        placeholder={axiosResult.username}
                        onChange={usernameChecker}
                      />
                    </div>
                    <div className="col-4 errorMessage">
                      {hiddenUsernameErrorMessage && (
                        <p>
                          <i className="bi bi-exclamation-triangle-fill"></i>{" "}
                          Username must be 5 or more characters.
                        </p>
                      )}
                    </div>
                  </>
                )}
                {!editingUsernameMode ? (
                  <div className="col-1 edit">
                    <button onClick={editUsernameHandler}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </div>
                ) : (
                  <div className="col-1 edit">
                    <button onClick={saveUsernameHandler}>
                      <i className="bi bi-check-lg green"></i>
                    </button>
                    <button onClick={doneEditUsernameHandler}>
                      <i className="bi bi-x-lg red"></i>
                    </button>
                  </div>
                )}
                {!editingPasswordMode ? (
                  <>
                    <SettingsMenu title="Password:" input="*******" />
                  </>
                ) : (
                  <>
                    <div className="col-3 accountMenuTitle">
                      <h1>Password:</h1>
                    </div>
                    <div className="col-4 form">
                      <input
                        type="password"
                        className={`form-control ${invalidMessage}`}
                        name="password"
                        id="post"
                        onChange={passwordChecker}
                      />
                    </div>
                    <div className="col-4 errorMessage">
                      {hiddenErrorMessage && (
                        <p>
                          <div className="row">
                            <div className="col-1 d-flex align-items-center">
                              <i className="bi bi-exclamation-triangle-fill"></i>
                            </div>
                            <div className="col-11">
                              Password must be 4-8 characters and have at least
                              one numeric digit.
                            </div>
                          </div>
                        </p>
                      )}
                    </div>
                  </>
                )}
                {!editingPasswordMode ? (
                  <div className="col-1 edit">
                    <button onClick={editPasswordHandler}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="col-1 edit">
                      <button onClick={savePasswordHandler}>
                        <i className="bi bi-check-lg green"></i>
                      </button>
                      <button onClick={doneEditPasswordHandler}>
                        <i className="bi bi-x-lg red"></i>
                      </button>
                    </div>
                    <div className="col-3 accountMenuTitle">
                      <h1>Confirm Password:</h1>
                    </div>
                    <div className="col-4 form">
                      <input
                        type="password"
                        className={`form-control ${invalidConPWMessage}`}
                        name="password"
                        id="post"
                        onChange={conPWChecker}
                      />
                    </div>
                    <div className="col-4 errorMessage">
                      {hiddenConPWErrorMessage && (
                        <p>
                          <div className="row">
                            <div className="col-1 d-flex align-items-center">
                              <i className="bi bi-exclamation-triangle-fill"></i>
                            </div>
                            <div className="col-11">Passwords do not match</div>
                          </div>
                        </p>
                      )}
                    </div>
                  </>
                )}

                <div className="col-12 delete">
                  <button onClick={deleteAccount}>
                    <p>Delete Account</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;
