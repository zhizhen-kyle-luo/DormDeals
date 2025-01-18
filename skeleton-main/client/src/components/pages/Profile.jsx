import { React, useState, useEffect } from "react";
import { get } from "../../utilities";
import { useParams } from "react-router-dom";

import "./Profile.css";
import backgroundimg from "../../assets/mit-dome.jpg";
import defaultpfpimg from "../../assets/blank-profile.png";

const Profile = () => {
  let props = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);

  //display default/blank pfp if userObj.__ dne?

  if (!user) {
    return <div>Please Log in</div>;
  }

  return (
    <div className="Profile-container">
      <div className="Profile-banner">
        <img src={backgroundimg} alt="MIT Dome" className="Profile-bannerImage" />
      </div>
      <div className="Profile-content">
        <div className="Profile-avatarContainer">
          <img src={defaultpfpimg} alt="Profile" className="Profile-avatar" />
        </div>
        <div className="Profile-info">
          <h1>{user.name}</h1>
          <p className="Profile-description">Description Here</p>
          <p className="Profile-email">Email Here</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
