const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || "us-east-1",
});

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

// Upload file to S3
const uploadToS3 = async (file, folder = "resumes") => {
  try {
    const fileExtension = file.originalname.split(".").pop();
    const fileName = `${folder}/${uuidv4()}.${fileExtension}`;

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read", // Makes file publicly accessible
      Metadata: {
        originalName: file.originalname,
        uploadedAt: new Date().toISOString(),
      },
    };

    const result = await s3.upload(params).promise();

    return {
      fileUrl: result.Location,
      fileName: fileName,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  } catch (error) {
    console.error("S3 upload error:", error);
    throw new Error("Failed to upload file to S3");
  }
};

// Delete file from S3
const deleteFromS3 = async (fileName) => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
    };

    await s3.deleteObject(params).promise();
    return true;
  } catch (error) {
    console.error("S3 delete error:", error);
    return false;
  }
};

// Get signed URL for private files (if needed)
const getSignedUrl = async (fileName, expiresIn = 3600) => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Expires: expiresIn,
    };

    return await s3.getSignedUrlPromise("getObject", params);
  } catch (error) {
    console.error("S3 signed URL error:", error);
    throw new Error("Failed to generate signed URL");
  }
};

module.exports = {
  uploadToS3,
  deleteFromS3,
  getSignedUrl,
};
