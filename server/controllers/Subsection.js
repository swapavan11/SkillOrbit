const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Controller for creating subsection that returns updated section
exports.createSubSection = async function (req, res) {
  try {
    const { sectionID, title, description } = req.body;
    // get video file
    const video = req.files.video;
    // validating data
    if (!video || !sectionID || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // upload video
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME,
    );
    // create subsection
    const subsection = await SubSection.create({
      title,
      timeDuration: `${uploadDetails.duration}`,
      description,
      videoURL: uploadDetails.secure_url,
    });
    // updating section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionID,
      {
        $push: {
          subSection: subsection._id,
        },
      },
      { new: true },
    ).populate("subSection");
    // return response
    res.status(200).json({
      success: true,
      message: "Subsection created successfully",
      data: updatedSection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong while creating Subsection",
    });
  }
};

// controller for updating a Subsection that returns updated section data
exports.updateSubSection = async (req, res) => {
  try {
    // get data
    const { sectionId, subSectionId, title, description } = req.body;
    const subSection = await SubSection.findById(subSectionId);

    // Validate subsection
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // Now update the subsection based on the data from request body
    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME,
      );
      subSection.videoURL = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    // SAve the updated subsection
    await subSection.save();

    // find updated section and return it
    const updatedSection =
      await Section.findById(sectionId).populate("subSection");

    console.log("updated section", updatedSection);

    return res.json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    });
  }
};

// Controller for deleting subsection that returns updated section
exports.deleteSubSection = async function (req, res) {
  try {
    // get data
    const { subSectionID, sectionId } = req.body;

    // First remove the subsection from section
    await Section.findByIdAndUpdate(sectionId, {
      $pull: { subSection: subSectionID },
    });
    // delete subsection
    const subSection = await SubSection.findByIdAndDelete(subSectionID);

    // validating the subsection
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }
    // Find updated subsection and return
    const section = await Section.findById(sectionId).populate("subSection");

    // return response
    res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
      data: section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong while deleting Subsection",
    });
  }
};
