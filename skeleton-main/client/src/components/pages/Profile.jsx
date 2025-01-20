import { React, useState, useEffect } from "react";
import { get } from "../../utilities";
import { useParams } from "react-router-dom";

import "./Profile.css";
import backgroundimg from "../../assets/mit-dome.jpg";
import defaultpfpimg from "../../assets/blank-profile.png";
import editicon from "../../assets/edit-symbol.png";

const Profile = () => {
  let props = useParams();
  const [userandinformation, setUser] = useState([]);
  const [viewingUser, setViewingUser] = useState();

  useEffect(() => {
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);
  useEffect(() => {
    get(`/api/whoami`).then((viewingUserObj) => setViewingUser(viewingUserObj));
  }, []);

  const user = userandinformation[0];
  const userinformation = userandinformation[1];

  const openProfileEdit = () => {
    document.getElementById("Form").style.display = "flex";
  };

  const closeProfileEdit = () => {
    document.getElementById("Form").style.display = "none";
  };

  if (!user) {
    return <div>Please Log in</div>;
  }

  let editVisible;
  if (user._id === viewingUser._id) {
    editVisible = "u-visible";
  } else {
    editVisible = "u-invisible";
  }

  return (
    <>
      <div className="Profile-container">
        <div className="Profile-banner">
          <img src={backgroundimg} alt="MIT Dome" className="Profile-bannerImage" />
        </div>
        <div className="Profile-content">
          <div className="Profile-and-edit-container">
            <div className="Profile-avatarContainer">
              <img src={defaultpfpimg} alt="Profile" className="Profile-avatar" />
            </div>
            <div
              className={`Edit-avatarContainer ${editVisible}`}
              onClick={() => {
                openProfileEdit();
              }}
            >
              <img src={editicon} alt="Edit" className={`Edit-avatar ${editVisible}`} />
            </div>
          </div>
          <div className="Profile-info u-flex">
            <div className="Profile-subContainer u-textCenter">
              <h1 className="Profile-subtitle">About Me</h1>
              <p className="Profile-description">{userinformation.description}</p>
            </div>
            <div className="Profile-subContainer u-textCenter">
              <h1 className="Profile-subtitle">{user.name}</h1>
              <p className="Profile-email">{userinformation.email}</p>
            </div>
            <div className="Profile-subContainer u-textCenter">
              <h1 className="Profile-subtitle">My Items</h1>
            </div>
          </div>
        </div>
      </div>
      <div id="Form" className="edit-Form-popup">
        <form className="Form-container">
          <h1>Edit Profile</h1>
          <h3>Description</h3>
          <textarea
            cols="40"
            rows="10"
            placeholder="Type a description of yourself"
            className="Description-input"
          />
          <h3>Email</h3>
          <input type="text" placeholder="Enter email" className="Email-input" />

          <button
            className="Submit-button"
            onClick={() => {
              closeProfileEdit();
            }}
          >
            Make Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
