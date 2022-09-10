import React from "react";
import ProfileSide from "../../components/LeftSection/ProfileSide/ProfileSide";
import PostSide from "../../components/MainSection/PostSide/PostSide";
import "./Home.css";
const Home = () => {
  return (
    <div className="Home">
      <ProfileSide />
      <PostSide />
      <div className="RightSide">RightSide</div>
    </div>
  );
};

export default Home;
