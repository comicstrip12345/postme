import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavbarLoggedIn from "./NavbarLoggedIn";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomepageFeedSettings from "./HomepageFeedSettings";

const Homepage = () => {
  const { userid } = useParams();
  const [profile, setProfile] = useState([]);


  useEffect(() => {
    axios
      .post("https://serserserver.herokuapp.com/profile", { userid: userid })
      .then((res) => {
        if (res.status === 200) {
          const id = res["data"]["array"][0];
          setProfile(id);
        }
      }); // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavbarLoggedIn link={userid} />

      <section className="profile">
        <div className="container">
          <div className="row profileFeed">
            <div className="col-4 info">
              <div className="row">
                <div className="col-12 intro">
                  <h1>Shortcuts</h1>

                  <ul className="profSettingsDropdown">
                    <li>
                      <Link to={`/profile/${userid}`}>
                        <div className="navImageCircle">
                          <img
                            src={profile.picpath}
                            onError={(event) => event.target.src = 'https://eng.asu.edu.eg/img/user.png'} 
                            alt="avatar"
                            style={{
                              width: "33px",
                              height: "33px",
                              objectFit: "cover",
                              borderRadius: "500px",
                            }}
                          /> {profile.firstName} {profile.lastName}
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to={`/friendslist/${userid}`}>
                        <i className="bi bi-people-fill"></i>Friends List
                      </Link>
                    </li>
                    <li>
                      <Link to={`/friendrequests/${userid}`}>
                        <i className="bi bi-person-plus-fill"></i>Friend
                        Requests
                      </Link>
                    </li>

                    <li>
                      <Link to={`/searchpage/${userid}`}>
                        <i className="bi bi-search"></i>Search Person
                      </Link>
                    </li>

                    <li>
                      <Link to={`/settings/${userid}`}>
                        <i className="bi bi-gear-fill"></i>Settings
                      </Link>
                    </li>
                    <li>
                      <Link to={"/"}>
                        <i className="bi bi-person-plus-fill"></i>Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-8 newsFeed">
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
