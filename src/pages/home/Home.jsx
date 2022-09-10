import React from "react";
import ProfileSide from "../../components/ProfileSide/ProfileSide";
import "./Home.css";
const Home = () => {
  return (
    <div className="Home">
      <div className="profileSide">
        <ProfileSide />
      </div>
      <div className="postSide">Posts</div>
      <div className="RightSide">RightSide</div>
    </div>
  );
};

export default Home;
