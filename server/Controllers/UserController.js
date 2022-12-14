import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
// get a User
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      // this will return everything about the user, including PASSWORD!! AVOID!
      // res.status(200).json(user);

      // return everything BUT the PASSWORD
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// update a user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus, password } = req.body;

  if (id === currentUserId || currentUserAdminStatus) {
    try {
      // if password exists <- this means user wants to change password
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      // searching user in the database using (id)
      // (req.body) is the info that needs to be updated in the response
      // (new: true) means response will have the updated(new) user, not the prev user.
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        //
        new: true,
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only update your own profile");
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdminStatus } = req.body;

  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only delete your own profile");
  }
};

// Follow a User
export const followUser = async (req, res) => {
  // A user: to be followed
  const id = req.params.id;

  // A user: trying to follow
  const { currentUserId } = req.body;

  // cannot follow yourself
  if (currentUserId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      //followee
      const followUser = await UserModel.findById(id);
      //follower
      const followingUser = await UserModel.findById(currentUserId);

      if (!followUser.followers.includes(currentUserId)) {
        //push follower ID to the followee's [followers] array
        await followUser.updateOne({ $push: { followers: currentUserId } });
        // push followee ID to the follower 's [following] array
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("User has Already followed");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

//UnFollow a User
export const unfollowUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const unfollowTarget = await UserModel.findById(id);
      const follwer = await UserModel.findById(currentUserId);

      if (unfollowTarget.followers.includes(currentUserId)) {
        await unfollowTarget.updateOne({ $pull: { followers: currentUserId } });
        await follwer.updateOne({ $pull: { following: id } });
        res.status(200).json("User Unfollowed!");
      } else {
        res.status(403).json("User is not followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
