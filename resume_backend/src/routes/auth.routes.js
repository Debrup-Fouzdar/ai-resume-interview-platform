const express = require("express");
const authController = require("../controllers/auth.controller");
const { authUser } = require("../middlewares/auth.middlewares");

const authRoutes = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRoutes.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @desc Login a user using email and password
 * @access Public
 */
authRoutes.post("/login", authController.loginUserController);

/**
 * @route POST /api/auth/logout
 * @desc Logout the current user and blacklist the JWT
 * @access Private
 */
authRoutes.post("/logout", authUser, authController.logoutUserController);

/**
 * @route GET /api/auth/me
 * @desc Get the currently logged-in user's information
 * @access Private
 */
authRoutes.get("/me", authUser, authController.getMeController);

module.exports = authRoutes;