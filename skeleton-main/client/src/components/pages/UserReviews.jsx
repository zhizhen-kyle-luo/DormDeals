import { React, useState, useEffect } from "react";
import { get } from "../../utilities";
import { useParams, Link } from "react-router-dom";
import defaultpfpimg from "../../assets/blank-profile.png";

import "./UserReviews.css";

const UserReviews = () => {
  let props = useParams();
  const [seller, setSeller] = useState("");

  useEffect(() => {
    get(`/api/user`, { userid: props.userId, picture: defaultpfpimg }).then((sellerObj) => {
      setSeller(sellerObj[0].name);
    });
  }, []);

  return (
    <div className="Reviews-container">
      <h1>Reviews for {seller}</h1>
      <div>Reviews here</div>
    </div>
  );
};

export default UserReviews;
