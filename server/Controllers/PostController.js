import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";
import mongoose from "mongoose";

// Creat new Post
export const createPost = async (req, res) => {
  //getting an object from a embedd request body in Post Model
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json("Post created!");
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a post
export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post has been deleted successfully");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post Disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Timeline Posts
// timeline posts include: posts made by user, posts made by following user
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;

  try {
    // return all the posts from the post model, that have the "user id" of the "current user id"
    const currentUserPosts = await PostModel.find({ userId: userId });

    //aggregation is an array of steps
    const followingPosts = await UserModel.aggregate([
      {
        /*  1st step: matching  */
        // match with the user, whose object id is the current user id
        // this will return a single doc, contains our user id "userId" in its id field "_id"
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        /*  2nd step: look up  */
        //when we need to match doc in another model by placing query
        // in this case we are placeing query on the userModal, and want to get result from postModal
        $lookup: {
          // integrate with postModal (it is called "posts" on the database)
          from: "posts",
          //a field which we want to integrate with other model;
          //inside userModel, we have an array field: following which contains follower user id
          // and we want to match those id, with the above "posts" from the postModal
          localField: "following",
          foreignField: "userId",
          // result as followingposts obj
          as: "followingPosts",
        },
      },
      {
        /*  3rd step: project  */
        // return type of the aggregation, meaning which fields to be returned
        $project: {
          followingPosts: 1,
          _id: 0, //default field, this time ignore it
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};
