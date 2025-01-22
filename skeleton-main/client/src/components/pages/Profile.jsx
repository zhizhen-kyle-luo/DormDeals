import { React, useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { useParams } from "react-router-dom";

import "./Profile.css";
import backgroundimg from "../../assets/mit-dome.jpg";
import defaultpfpimg from "../../assets/blank-profile.png";
import editicon from "../../assets/edit-symbol.png";

const Profile = () => {
  let props = useParams();
  const [userandinformation, setUser] = useState([]);
  const [viewingUser, setViewingUser] = useState();
  const [userItems, setUserItems] = useState([]); /*The items the user is selling */

  useEffect(() => {
    get(`/api/user`, { userid: props.userId, picture: defaultpfpimg }).then((userObj) => {
      setUser(userObj);
    });
  }, []);

  useEffect(() => {
    get(`/api/whoami`).then((viewingUserObj) => setViewingUser(viewingUserObj));
  }, []);

  useEffect(() => {
    get(`/api/useritems`, { userid: props.userId }).then((userItemsObj) =>
      setUserItems(userItemsObj)
    );
  }, []);

  const user = userandinformation[0];
  const userinformation = userandinformation[1];

  const [editForm, setEditForm] = useState({
    picture: [],
  });

  const openProfileEdit = () => {
    document.getElementById("Form").style.display = "flex";
  };

  const closeProfileEdit = () => {
    document.getElementById("Form").style.display = "none";
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const imagePromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    const base64Images = await Promise.all(imagePromises);
    console.log(base64Images);
    setEditForm((prev) => ({
      ...prev,
      picture: base64Images,
    }));
  };

  const saveEdits = async () => {
    const newDescription = document.getElementById("Description-input").value;
    const newEmail = document.getElementById("Email-input").value;
    let newPictureObj = editForm.picture;
    if (newPictureObj.length === 0) {
      newPictureObj = [defaultpfpimg];
    }
    console.log(newPictureObj);
    const body = {
      userid: props.userId,
      description: newDescription,
      email: newEmail,
      picture: newPictureObj[0],
    };
    await post("/api/edituser", body).then((profile) => {
      setUser([user, profile]);
    });
  };

  if (!user) {
    return <div>Please log in</div>;
  }

  let editVisible;
  if (user._id === viewingUser._id) {
    editVisible = "u-visible";
  } else {
    editVisible = "u-invisible";
  }

  const userHasItems = userItems.length > 0;
  let userItemsDisplay;
  if (userHasItems) {
    userItemsDisplay = userItems.map((itemObj) => {
      <img src={itemObj} className="userItem" alt="Item" />;
    });
  } else {
    userItemsDisplay = <div className="Profile-description">No Items!</div>;
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
              <img src={userinformation.picture} alt="Profile" id="Profile-avatar" />
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
              <div className="userItems">{userItemsDisplay}</div>
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
            rows="5"
            placeholder="Type a description of yourself"
            id="Description-input"
          />
          <h3>Email</h3>
          <input type="text" placeholder="Enter email" id="Email-input" />

          <h3>Profile Picture</h3>
          <input
            type="file"
            id="Picture-input"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <button
            className="Cancel-button"
            type="button"
            onClick={() => {
              closeProfileEdit();
            }}
          >
            Cancel
          </button>

          <button
            className="Submit-button"
            type="button"
            onClick={() => {
              saveEdits();
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
