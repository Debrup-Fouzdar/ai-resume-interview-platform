const imagekit = require("../config/imagekit");

const uploadFile = async (file) => {
  try {
    const response = await imagekit.upload({
      file: file.buffer,
      fileName: `${Date.now()}-${file.originalname}`,
      folder: "/resume-ai",
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload file.");
  }
};

module.exports = {
  uploadFile,
};