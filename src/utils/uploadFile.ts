import fs from "fs";
import multer from "multer";

export const uploadFile = (filename: string, folder = "") => {
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      let path = `public/images/`;

      if (folder) {
        path = `${path}/${folder}/`;
      }

      fs.mkdirSync(path, { recursive: true });

      cb(null, path);
    },
    filename: (_req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage: storage });

  return upload.single(filename);
};
