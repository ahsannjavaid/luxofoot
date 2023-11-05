import adminSchema from "../models/adminSchema.js";
import { ComparePassword, HashPassword } from "../helpers/passwordBcrypt.js";
import JWT from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
  try {
    const { fname, lname, email, password, post, securityAnswer } = req.fields;

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
        case !post:
        return res.status(206).send({
          success: false,
          message: "Please provide 'post' field.",
        });
      case !securityAnswer:
        return res.status(206).send({
          success: false,
          message: "Please provide 'securityAnswer' field.",
        });
      default:
        break;
    }

    // existing admin check - from database
    const existingAdmin = await adminSchema.findOne({ email });
    if (existingAdmin) {
      return res.status(409).send({
        success: false,
        message: "Admin already exists, please login!",
        error,
      });
    }

    // hashing the password
    const hashedPassword = await HashPassword(password);

    // sending data into database
    const admin = await new adminSchema({
      fname,
      lname,
      email,
      password: hashedPassword,
      post,
      securityAnswer,
    }).save();

    // success in registration
    res.status(200).send({
      success: true,
      message: "Admin registered successfully!",
      admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while registering admin!",
    });
  }
};

export const loginAdmin = async (req, res) => {
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

    // finding admin based on email - from database
    const admin = await adminSchema.findOne({ email });
    if (!admin) {
      return res.status(404).send({
        success: false,
        message: "Admin does not exist, please register!",
      });
    }

    // comparing with hashed password
    const matched = await ComparePassword(password, admin.password);
    if (!matched) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password!",
      });
    }

    // JWT
    const token = await JWT.sign({ _id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Admin logged in successfully!",
      data: admin,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while loging in admin!",
      error,
    });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const admins = await adminSchema.find();
    if (admins.length) {
      res
        .status(200)
        .send({
          success: true,
          message: "Admins fetched successfully!",
          count: admins.length,
          data: admins,
        });
    } else {
      res.status(404).send({ success: true, message: "Admins not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while getting admins!",
      error,
    });
  }
};

export const getSingleAdmin = async (req, res) => {
  try {
    const admin = await adminSchema.findById({ _id: req.params.id });
    if (admin) {
      res
        .status(200)
        .send({
          success: true,
          message: "Admin fetched successfully!",
          data: admin,
        });
    } else {
      res.status(404).send({ success: false, message: "Admin not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while getting admin!",
      error,
    });
  }
};

export const deleteSingleAdmin = async (req, res) => {
  try {
    // destructuring id from URL parameters
    const { id } = req.params;

    // checking if the admin exists
    const existingAdmin = await adminSchema.findById(id);

    // deleting the admin if it exists
    if (existingAdmin) {
      const result = await adminSchema.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: `The admin with name ${result.fname} is deleted successfully!`,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "This admin does not exist.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while deleting admin!",
      error,
    });
  }
};

export const deleteAdmins = async (req, res) => {
  try {
    const admins = await adminSchema.find();
    if (!admins.length) {
      return res.status(404).send({
        success: false,
        message: "Users do not exist.",
      });
    }
    const result = await adminSchema.deleteMany();
    res.status(200).send({
      success: true,
      message: "All admins deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while deleting all admins!",
      error,
    });
  }
};