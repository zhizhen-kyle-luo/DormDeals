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
  console.log(user);

  if (!user) {
    return <div>Please Log in</div>;
  }

  return (
    <>
      <div className="background-and-profile u-relative">
        <div className="background-picture-container">
          <img className="background-picture" src={backgroundimg} alt="Default Background" />
        </div>

        <div className="profile-picture-container">
          <img className="profile-picture" src={defaultpfpimg} alt="Profile Picture" />
        </div>
      </div>
      <h1 className="user-name u-textCenter">{user.name}</h1>
      <div className="user-description">Description Here</div>
      <div className="user-email">Email Here</div>
    </>
  );
};

export default Profile;
