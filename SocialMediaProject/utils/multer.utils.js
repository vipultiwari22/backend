import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => {
      const extension = file.mimetype.split("/")[1];
      return extension === "jpeg" ? "jpg" : extension;
    },
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    resource_type: (req, file) => {
      return file.mimetype.startsWith("video") ? "video" : "image";
    },
  },
});

const upload = multer({ storage: storage });

export default upload;
