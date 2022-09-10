import React from "react";
import "../PostShare/PostShare.css";
import ProfilePicture from "../../../img/profileImg.jpg";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";

const PostShare = () => {
  return (
    <div className="PostShare">
      <img src={ProfilePicture} alt="profile picture" />
      <div>
        <input type="text" placeholder="What's happening" />

        <div className="PostOptions">
          <div className="Option" style={{ color: "var(--photo)" }}>
            <UilScenery />
            Photo
          </div>
          <div className="Option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="Option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="Option" style={{ color: "var(--schedule)" }}>
            <UilSchedule />
            Schedule
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostShare;
