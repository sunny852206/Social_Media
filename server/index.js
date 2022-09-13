import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// dotenv.config();

mongoose
  .connect(
    "mongodb+srv://SocialMedia:SocialMedia@cluster0.jh3pu6g.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => app.listen(5000, () => console.log("Listening")));

/*
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening at ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));


  // usage of routes
  app.use('/auth', AuthRoute)
  app.use('/user', UserRoute)
  app.use('/post', PostRoute)
  */
