import asyncHandler from 'express-async-handler'
import generateToken from '../utilities/generateToken.js'
import User from '../models/userModel.js'

// @description authenticate user & get token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // we are going to await, taking User model using findOne() -(returns a document that only contains the projection fields), finding one document who has email matching the email from const { email, password } = req.body

  //after we validate, we check for the user with that email - assigning it to user variable (const user)
  const user = await User.findOne({ email: email })

  // if email matches then we have to look at password (comparison is done in user model using bcrypt that compares text password to hashed one )
  // if the password matches - we are returning follwing date back along with a token that has user id embedded in it
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Nieprawidłowa nazwa użytkownika lub hasło')
  }
})

// @description Register a new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email: email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @description get user profile & get token
// @route GET /api/users/profile
// @access private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { authUser, getUserProfile, registerUser }
