import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarLoggedIn from "./NavbarLoggedIn";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { Fade } from "react-reveal";

const FriendsList = () => {
  const { userid } = useParams();
  const [friends, setFriends] = useState([]);
  const [noFriend, setNoFriend] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:5001/flfeed", {
        userid: userid,
      })
      .then((response) => {
        console.log(response);

        if (response["data"]["array"].length === 0) {
          setNoFriend("You have no friends yet. Go find someone.");
        } else {
          setFriends(response["data"]["array"]);
        }
      });
  }, [userid]);

  return (
    <>
      <NavbarLoggedIn link={userid} />
      <section className="friendsList">
        <div className="container">
          <div className="row pt-5">
            <div className="col-12 title">
              <h1>Friends List</h1>
              <div className="row">
                {noFriend && (
                  <>
                    <div className="col-6 noFriendsImage">
                      <img
                        src={require("../images/friend-search.png")}
                        alt="friend-search"
                      />
                    </div>
                    <div className="col-6 noFriendsContent d-flex align-items-center">
                      <p>{noFriend}</p>
                    </div>
                  </>
                )}
                {friends.map((profile, index) => (
                  <Fade key={index}>
                    <div className="col-4">
                      <div className="row listTile">
                        <div className="col-4 image">
                          <img
                            src={profile.picpath}
                            onError={(event) =>
                              (event.target.src =
                                "https://eng.asu.edu.eg/img/user.png")
                            }
                            alt="avatar"
                            style={{}}
                          />
                        </div>
                        <div className="col-8 detail d-flex align-items-center">
                          <h1>
                            <Link to={`/profile/${userid}/${profile.friendid}`}>
                              {profile.firstName} {profile.lastName}
                              <br />
                              <small className="text-muted">
                                {" "}
                                {profile.city}{" "}
                              </small>{" "}
                              <br />
                              <small className="text-muted">
                                {" "}
                                {profile.nickname}{" "}
                              </small>
                              <small className="text-muted">
                                {" "}
                                {profile.birthday}{" "}
                              </small>
                            </Link>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </Fade>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FriendsList;
