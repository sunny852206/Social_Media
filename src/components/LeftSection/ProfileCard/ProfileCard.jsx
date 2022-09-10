import React from "react";
import "./ProfileCard.css";
import ProfilePicture from "../../../img/profileImg.jpg";
import Cover from "../../../img/cover.jpg";

const ProfileCard = () => {
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="" />
        <img src={ProfilePicture} alt="" />
      </div>
      <div className="Name">
        <span>Zendaya MJ</span>
        <span>Senior UI/UX Designer</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>6,890</span>
            <span>Followings</span>
          </div>
          <div className="follow">
            <span>1</span>
            <span>Followers</span>
          </div>
        </div>

        <hr />
      </div>
      <span>My Profile</span>
    </div>
  );
};

export default ProfileCard;
