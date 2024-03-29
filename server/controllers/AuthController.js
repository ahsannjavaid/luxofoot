import UserSchema from "../models/userSchema.js";
import { ComparePassword, HashPassword } from "../helpers/passwordBcrypt.js";
import JWT from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { fname, lname, email, password, securityAnswer } = req.fields;

    // validation
    switch (true) {
      case !fname:
        return res
          .status(206)
          .send({ success: false, message: "Please provide 'fname' field." });
      case !lname:
        return res
          .status(206)
          .send({ success: false, message: "Please provide 'lname' field." });
      case !email:
        return res
          .status(206)
          .send({ success: false, message: "Please provide 'email' field." });
      case !password:
        return res.status(206).send({
          success: false,
          message: "Please provide 'password' field.",
        });
      case !securityAnswer:
        return res.status(206).send({
          success: false,
          message: "Please provide 'securityAnswer' field.",
        });
      default:
        break;
    }

    // existing user check - from database
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already exists, please login!",
        error,
      });
    }

    // hashing the password
    const hashedPassword = await HashPassword(password);

    // sending data into database
    const user = await new UserSchema({
      fname,
      lname,
      email,
      password: hashedPassword,
      securityAnswer,
    }).save();

    // success in registration
    res.status(200).send({
      success: true,
      message: "User registered successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while registering user!",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.fields;

    // validation
    if (!email) {
      return res.status(206).send({
        success: false,
        message: "Please provide 'email' field.",
      });
    }
    if (!password) {
      return res.status(206).send({
        success: false,
        message: "Please provide 'securityAnswer' field.",
      });
    }

    // finding user based on email - from database
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User does not exist, please register!",
      });
    }

    // comparing with hashed password
    const matched = await ComparePassword(password, user.password);
    if (!matched) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password!",
      });
    }

    // JWT
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "User logged in successfully!",
      data: user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while loging in user!",
      error,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserSchema.find();
    if (users.length) {
      res
        .status(200)
        .send({
          success: true,
          message: "Users fetched successfully!",
          count: users.length,
          data: users,
        });
    } else {
      res.status(404).send({ success: true, message: "Users not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while getting users!",
      error,
    });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const user = await UserSchema.findById({ _id: req.params.id });
    if (user) {
      res
        .status(200)
        .send({
          success: true,
          message: "User fetched successfully!",
          data: user,
        });
    } else {
      res.status(404).send({ success: false, message: "User not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while getting user!",
      error,
    });
  }
};

export const deleteSingleUser = async (req, res) => {
  try {
    // destructuring id from URL parameters
    const { id } = req.params;

    // checking if the user exists
    const existingUser = await UserSchema.findById(id);

    // deleting the user if it exists
    if (existingUser) {
      const result = await UserSchema.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: `The user with name ${result.fname} is deleted successfully!`,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "This user does not exist.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while deleting user!",
      error,
    });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const users = await UserSchema.find();
    if (!users.length) {
      return res.status(404).send({
        success: false,
        message: "Users do not exist.",
      });
    }
    const result = await UserSchema.deleteMany();
    res.status(200).send({
      success: true,
      message: "All users deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while deleting all users!",
      error,
    });
  }
};

export const testProtect = async (req, res) => {
  res.send("Protected Route");
  // I can access all the details of user from database through req.user._id
};
