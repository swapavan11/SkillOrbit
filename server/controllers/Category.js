const Category = require("../models/Category");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
exports.createCategory = async function (req, res) {
  try {
    // fetch category details
    const { name, description } = req.body;
    // validate details
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // creating a category
    const categoryDetails = await Category.create({
      name,
      description,
    });

    console.log(categoryDetails);

    //return response
    return res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating a category",
    });
  }
};

// all categories route handler
exports.getAllCategories = async function (req, res) {
  try {
    const allCategories = await Category.find({});
    res.status(200).json({
      success: true,
      message: "All Categories data returned successfully",
      data: allCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Something went wrong while fetching all categories data",
    });
  }
};

// get required category courses
exports.categoryPageDetails = async function (req, res) {
  try {
    // get category id
    const { categoryId } = req.body;
    // get selected category data
    const selectedCategory = await Category.findById(categoryId).populate({
      path: "courses",
      match: { status: "Published" },
      populate: "ratingAndReviews",
    });
    //validate
    if (!selectedCategory) {
      return res.status(400).json({
        success: false,
        message: "Category does'nt exists",
      });
    }
    console.log(selectedCategory);
    // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }
    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id,
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);
    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Somthing went wrong while, fetching required category courses",
    });
  }
};
