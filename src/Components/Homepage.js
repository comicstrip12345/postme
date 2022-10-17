import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavbarLoggedIn from "./NavbarLoggedIn";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomepageFeedSettings from "./HomepageFeedSettings";
import swal from "sweetalert";

const Homepage = () => {
  const { userid } = useParams();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5001/profile", { userid: userid })
      .then((res) => {
        if (res.status === 200) {
          const id = res["data"]["array"][0];
          setProfile(id);
        }
      }); // eslint-disable-next-line
  }, []);

  const logoutswal = () => {
    swal("Logged out", "We will miss you!", "info");
  };

  return (
    <>
      <NavbarLoggedIn link={userid} />

      <section className="homepage">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 shortcut">
              <div className="row">
                <div className="col-3 shortcutMenu">
                  <div className="row">
                    <div className="col-12 shortcutTile">
                      <h1>Shortcuts</h1>
                      <div className="row">
                        <div className="col-2 shortcutPic">
                          <Link to={`/profile/${userid}`}>
                            <img
                              src={profile.picpath}
                              onError={(event) =>
                                (event.target.src =
                                  "https://eng.asu.edu.eg/img/user.png")
                              }
                              alt="avatar"
                            />
                          </Link>
                        </div>
                        <div className="col-10 shortcutTitle d-flex align-items-center">
                          <Link to={`/profile/${userid}`}>
                            {profile.firstName} {profile.lastName}
                          </Link>
                        </div>
                        <div className="col-2 shortcutPic">
                          <Link to={`/friendslist/${userid}`}>
                            <i className="bi bi-people-fill"></i>
                          </Link>
                        </div>
                        <div className="col-10 shortcutTitle d-flex align-items-center">
                          <Link to={`/friendslist/${userid}`}>
                            Friends List
                          </Link>
                        </div>
                        <div className="col-2 shortcutPic">
                          <Link to={`/friendrequests/${userid}`}>
                            <i className="bi bi-person-plus-fill"></i>
                          </Link>
                        </div>
                        <div className="col-10 shortcutTitle d-flex align-items-center">
                          <Link to={`/friendrequests/${userid}`}>
                            Friend Requests
                          </Link>
                        </div>
                        <div className="col-2 shortcutPic">
                          <Link to={`/searchpage/${userid}`}>
                            <i className="bi bi-search"></i>
                          </Link>
                        </div>
                        <div className="col-10 shortcutTitle d-flex align-items-center">
                          <Link to={`/searchpage/${userid}`}>
                            Search Person
                          </Link>
                        </div>
                        <div className="col-2 shortcutPic">
                          <Link to={`/settings/${userid}`}>
                            <i className="bi bi-gear-fill"></i>
                          </Link>
                        </div>
                        <div className="col-10 shortcutTitle d-flex align-items-center">
                          <Link to={`/settings/${userid}`}>Settings</Link>
                        </div>
                        <div className="col-2 shortcutPic">
                          <Link to={"/"} onClick={logoutswal}>
                            <i className="bi bi-person-plus-fill"></i>
                          </Link>
                        </div>
                        <div className="col-10 shortcutTitle d-flex align-items-center">
                          <Link to={"/"} onClick={logoutswal}>
                            Logout
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-8 newsFeed">
              <div className="row">
                <HomepageFeedSettings
                  userid={`${userid}`}
                  picpath={profile.picpath}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
