import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarLoggedIn from "./NavbarLoggedIn";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";

const NotificationsPage = () => {
  const { userid } = useParams();
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:5001/notiffeed").then((response) => {
      console.log(response);
      setNotifs(response["data"]["array"]);
    });
  }, []);

  useEffect(() => {
    return () => {
      console.log("exit");

      axios
        .post("http://localhost:5001/notifreset", { userid: userid })
        .then((response) => {
          console.log(response);
        });
    };
  }, []);

  return (
    <>
      <NavbarLoggedIn link={userid} />
      <section className="notifications">
        <div className="container pt-5">
          <h1 className="title">Notifications</h1>
          <div className="row">
            <div className="col-6">
              <h1 className="menu">New</h1>
              {notifs.map((notif, index) => (
                <div className="row" key={index}>
                  {/* eslint-disable-next-line */}
                  {notif.new_comment === "1" &&
                  notif.notiftype === "post" &&
                  notif.wallid == userid ? (
                    <Link to={`/indivpost/${userid}/${notif.postid}`}>
                      <div className="col-12 notif">
                        <div className="row">
                          <div className="col-1 p-0 d-flex align-items-center">
                            <div className="blueDot"></div>
                          </div>
                          <div className="col-2 p-0">
                            <div className="circlePhoto">
                              <img
                                src={notif.ownerpicpath}
                                onError={(event) =>
                                  (event.target.src =
                                    "https://eng.asu.edu.eg/img/user.png")
                                }
                                alt="avatar"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  objectFit: "cover",
                                  borderRadius: "500px",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-9 p-0 d-flex align-items-center">
                            <div className="notifTile">
                              <p>
                                {notif.whopostedFN} {notif.whopostedLN}{" "}
                                <span>added a</span> {notif.notiftype}{" "}
                                <span>on your wall</span>{" "}
                              </p>
                              <p>
                                <span>
                                  <Moment fromNow>{notif.date_created}</Moment>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <></>
                  )}

                  {/* eslint-disable-next-line */}
                  {notif.new_comment === "1" &&
                  notif.notiftype === "comment" &&
                  notif.wallid == userid &&
                  notif.notifsenderid != userid ? (
                    <Link to={`/indivpost/${userid}/${notif.postid}`}>
                      <div className="col-12 notif">
                        <div className="row">
                          <div className="col-1 p-0 d-flex align-items-center">
                            <div className="blueDot"></div>
                          </div>
                          <div className="col-2 p-0">
                            <div className="circlePhoto">
                              <img
                                src={notif.ownerpicpath}
                                onError={(event) =>
                                  (event.target.src =
                                    "https://eng.asu.edu.eg/img/user.png")
                                }
                                alt="avatar"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  objectFit: "cover",
                                  borderRadius: "500px",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-9 p-0 d-flex align-items-center">
                            <div className="notifTile">
                              <p>
                                {notif.senderFN} {notif.senderLN}{" "}
                                <span>added a</span> {notif.notiftype}{" "}
                                <span>on a post on your wall</span>
                              </p>
                              <p>
                                <span>
                                  <Moment fromNow>{notif.date_created}</Moment>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <></>
                  )}

                  {/* eslint-disable-next-line */}
                  {notif.new_comment === "1" &&
                  notif.notiftype === "friends" &&
                  notif.notifreceiverid == userid ? (
                    <Link
                      to={`/profile/${notif.notifreceiverid}/${notif.notifsenderid}`}
                    >
                      <div className="col-12 notif">
                        <div className="row">
                          <div className="col-1 p-0 d-flex align-items-center">
                            <div className="blueDot"></div>
                          </div>
                          <div className="col-2 p-0">
                            <div className="circlePhoto">
                              <img
                                src={notif.sendernamepicpath}
                                onError={(event) =>
                                  (event.target.src =
                                    "https://eng.asu.edu.eg/img/user.png")
                                }
                                alt="avatar"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  objectFit: "cover",
                                  borderRadius: "500px",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-9 p-0 d-flex align-items-center">
                            <div className="notifTile">
                              <p>
                                {" "}
                                <span>You are now </span> {notif.notiftype}{" "}
                                <span> with </span> {notif.senderFN}{" "}
                                {notif.senderLN}
                              </p>
                              <p>
                                <span>
                                  <Moment fromNow>{notif.date_created}</Moment>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <></>
                  )}

                  {/* eslint-disable-next-line */}
                  {notif.new_comment === "1" &&
                  notif.notiftype === "like" &&
                  notif.userid == userid &&
                  notif.wallid == userid ? (
                    <Link to={`/indivpost/${userid}/${notif.postid}`}>
                      <div className="col-12 notif">
                        <div className="row">
                          <div className="col-1 p-0 d-flex align-items-center">
                            <div className="blueDot"></div>
                          </div>
                          <div className="col-2 p-0">
                            <div className="circlePhoto">
                              <img
                                src={notif.ownerpicpath}
                                onError={(event) =>
                                  (event.target.src =
                                    "https://eng.asu.edu.eg/img/user.png")
                                }
                                alt="avatar"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  objectFit: "cover",
                                  borderRadius: "500px",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-9 p-0 d-flex align-items-center">
                            <div className="notifTile">
                              <p>
                                <span>There is a</span> {notif.notiftype}{" "}
                                <span>on your post</span>
                              </p>
                              <p>
                                <span>
                                  <Moment fromNow>{notif.date_created}</Moment>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <></>
                  )}

                  {/* eslint-disable-next-line */}
                  {notif.new_comment === "1" &&
                  notif.notiftype === "like" &&
                  notif.userid == userid &&
                  notif.wallid != userid ? (
                    <Link
                      to={`/indivotherpost/${userid}/${notif.wallid}/${notif.postid}`}
                    >
                      <div className="col-12 notif">
                        <div className="row">
                          <div className="col-1 p-0 d-flex align-items-center">
                            <div className="blueDot"></div>
                          </div>
                          <div className="col-2 p-0">
                            <div className="circlePhoto">
                              <img
                                src={notif.ownerpicpath}
                                onError={(event) =>
                                  (event.target.src =
                                    "https://eng.asu.edu.eg/img/user.png")
                                }
                                alt="avatar"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  objectFit: "cover",
                                  borderRadius: "500px",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-9 p-0 d-flex align-items-center">
                            <div className="notifTile">
                              <p>
                                <span>There is a</span> {notif.notiftype}{" "}
                                <span>on your post</span>
                              </p>
                              <p>
                                <span>
                                  <Moment fromNow>{notif.date_created}</Moment>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
            <div className="col-6">
              <h1 className="menu">Other Notifications</h1>
              {notifs.map((notif, index) => (
                <div className="row" key={index}>
                  {/* eslint-disable-next-line */}
                  {notif.new_comment === "0" &&
                  notif.notiftype === "post" &&
                  notif.wallid == userid ? (
                    <Link to={`/indivpost/${userid}/${notif.postid}`}>
                      <div className="col-12 notif">
                        <div className="row">
                          <div className="col-2 p-0">
                            <div className="circlePhoto">
                              <img
                                src={notif.ownerpicpath}
                                onError={(event) =>
                                  (event.target.src =
                                    "https://eng.asu.edu.eg/img/user.png")
                                }
                                alt="avatar"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  objectFit: "cover",
                                  borderRadius: "500px",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-9 p-0 d-flex align-items-center">
                            <div className="notifTile">
                              <p>
                                {notif.whopostedFN} {notif.whopostedLN}{" "}
                                <span>added a</span> {notif.notiftype}{" "}
                                <span>on your wall</span>{" "}
                              </p>
                              <p>
                                <span>
                                  <Moment fromNow>{notif.date_created}</Moment>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <></>
                  )}

                  {/* eslint-disable-next-line */}
                  {notif.new_comment === "0" &&
                  notif.notiftype === "comment" &&
                  notif.wallid == userid &&
                  notif.notifsenderid != userid ? (
                    <Link to={`/indivpost/${userid}/${notif.postid}`}>
                      <div className="col-12 notif">
                        <div className="row">
                          <div className="col-2 p-0">
                            <div className="circlePhoto">
                              <img
                                src={notif.ownerpicpath}
                                onError={(event) =>
                                  (event.target.src =
                                    "https://eng.asu.edu.eg/img/user.png")
                                }
                                alt="avatar"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  objectFit: "cover",
                                  borderRadius: "500px",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-9 p-0 d-flex align-items-center">
                            <div className="notifTile">
                              <p>
                                {notif.senderFN} {notif.senderLN}{" "}
                                <span>added a</span> {notif.notiftype}{" "}
                                <span>on a post on your wall</span>
                              </p>
                              <p>
                                <span>
                                  <Moment fromNow>{notif.date_created}</Moment>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <></>
                  )}

                  {/* eslint-disable-next-line */}
                  {notif.new_comment === "0" &&
                  notif.notiftype === "friends" &&
                  notif.notifreceiverid == userid ? (
                    <Link
                      to={`/profile/${notif.notifreceiverid}/${notif.notifsenderid}`}
                    >
                      <div className="col-12 notif">
                        <div className="row">
                          <div className="col-2 p-0">
                            <div className="circlePhoto">
                              <img
                                src={notif.sendernamepicpath}
                                onError={(event) =>
                                  (event.target.src =
                                    "https://eng.asu.edu.eg/img/user.png")
                                }
                                alt="avatar"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  objectFit: "cover",
                                  borderRadius: "500px",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-9 p-0 d-flex align-items-center">
                            <div className="notifTile">
                              <p>
                                {" "}
                                <span>You are now </span> {notif.notiftype}{" "}
                                <span> with </span> {notif.senderFN}{" "}
                                {notif.senderLN}
                              </p>
                              <p>
                                <span>
                                  <Moment fromNow>{notif.date_created}</Moment>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <></>
                  )}

                  {/* eslint-disable-next-line */}
                  {notif.notiftype === "comment" &&
                  notif.userid == userid &&
                  notif.wallid != userid ? (
                    <Link
                      to={`/indivotherpost/${userid}/${notif.wallid}/${notif.postid}`}
                    >
                      <div className="col-12 notif">
                        <div className="row">
                          <div className="col-2 p-0">
                            <div className="circlePhoto">
                              <img
                                src={notif.ownerpicpath}
                                onError={(event) =>
                                  (event.target.src =
                                    "https://eng.asu.edu.eg/img/user.png")
                                }
                                alt="avatar"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  objectFit: "cover",
                                  borderRadius: "500px",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-9 p-0 d-flex align-items-center">
                            <div className="notifTile">
                              <p>
                                <span>There is a</span> {notif.notiftype}{" "}
                                <span>
                                  your post on {notif.whosewallFN}{" "}
                                  {notif.whosewallLN}'s wall
                                </span>
                              </p>
                              <p>
                                <span>
                                  <Moment fromNow>{notif.date_created}</Moment>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <></>
                  )}

                  {/* eslint-disable-next-line */}
                  {notif.new_comment === "0" &&
                  notif.notiftype === "like" &&
                  notif.userid == userid &&
                  notif.wallid == userid ? (
                    <Link to={`/indivpost/${userid}/${notif.postid}`}>
                      <div className="col-12 notif">
                        <div className="row">
                          <div className="col-2 p-0">
                            <div className="circlePhoto">
                              <img
                                src={notif.ownerpicpath}
                                onError={(event) =>
                                  (event.target.src =
                                    "https://eng.asu.edu.eg/img/user.png")
                                }
                                alt="avatar"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  objectFit: "cover",
                                  borderRadius: "500px",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-9 p-0 d-flex align-items-center">
                            <div className="notifTile">
                              <p>
                                <span>There is a</span> {notif.notiftype}{" "}
                                <span>on your post</span>
                              </p>
                              <p>
                                <span>
                                  <Moment fromNow>{notif.date_created}</Moment>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <></>
                  )}

                  {/* eslint-disable-next-line */}
                  {notif.new_comment === "0" &&
                  notif.notiftype === "like" &&
                  notif.userid == userid &&
                  notif.wallid != userid ? (
                    <Link
                      to={`/indivotherpost/${userid}/${notif.wallid}/${notif.postid}`}
                    >
                      <div className="col-12 notif">
                        <div className="row">
                          <div className="col-2 p-0">
                            <div className="circlePhoto">
                              <img
                                src={notif.ownerpicpath}
                                onError={(event) =>
                                  (event.target.src =
                                    "https://eng.asu.edu.eg/img/user.png")
                                }
                                alt="avatar"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  objectFit: "cover",
                                  borderRadius: "500px",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-9 p-0 d-flex align-items-center">
                            <div className="notifTile">
                              <p>
                                <span>There is a</span> {notif.notiftype}{" "}
                                <span>on your post</span>
                              </p>
                              <p>
                                <span>
                                  <Moment fromNow>{notif.date_created}</Moment>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotificationsPage;
