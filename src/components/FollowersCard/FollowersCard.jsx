import React from "react";
import "./FollowersCard.css";

import { Followers } from "../../Data/FollowersData";
const FollowersCard = () => {
  return (
    <div className="FollowersCard">
      <h4> Who is following you</h4>
      {Followers.map((follower, id) => {
        return (
          <div className="Followers">
            <div>
              <img
                src={follower.img}
                alt="follower profile picture"
                className="FollowerImg"
              />
              <div className="name">
                <span>{follower.name}</span>
                <span>@{follower.username}</span>
              </div>
            </div>
            <button className="button fc-button">Follow</button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowersCard;
