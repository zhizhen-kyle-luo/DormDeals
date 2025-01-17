import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./Profile.css";

const Profile = () => {
  let props = useParams();
  const [user, setUser] = useState();

  /*
  useEffect(() => {
    document.title = "Profile Page";
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);
  */

  return (
    <>
      <div className="background-picture-container"></div>
      <div className="background-picture">
        <div className="profile-picture" />
      </div>
      <div className="user-name">Name here</div>
      <div className="user-description">Description here</div>
      <div className="user-email">Email here</div>
    </>
  );
};

export default Profile;
