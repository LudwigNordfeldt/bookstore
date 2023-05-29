const userRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const User = require("../models/user");

userRouter.post('/login', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    response.status(400).json({
      error: "No username or no password provided",
    });
  } else if (username.length < 3 || password.length < 3) {
    response.status(400).json({
      error:
        "Invalid username/password (both must be at least 3 characters long)",
    });
  }

  if ((await User.find({})).map((el) => el["username"]).includes(username)) {
    response.status(409).json({
      error: "User with this username already exists",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  console.log("Saved user:", savedUser);

  response.status(201).json(savedUser);
});

module.exports = userRouter;
