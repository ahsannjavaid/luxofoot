import slugify from "slugify";
import CategorySchema from "../models/categorySchema.js";

export const addCategory = async (req, res) => {
  try {
    const { title } = await req.body;
    console.log(req.body);
    if (!title) {
      return res
        .status(206)
        .send({ success: false, message: "Please provide 'title' field." });
    }
    const category = new CategorySchema({ ...req.body, slug: slugify(title) });
    await category.save();
    res
      .status(201)
      .send({ success: true, message: "Category added successfully!", data: category });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong while adding category!", error });
  }
};
