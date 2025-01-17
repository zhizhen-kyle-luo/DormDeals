import { React, useState } from "react";
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
      <div className="background-picture" />
      <div className="user-name">Name here</div>
    </>
  );
};

export default Profile;
