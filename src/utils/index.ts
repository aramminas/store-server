import fs from "fs";

export const removeFile = (
  path: string
): { error?: string; success?: boolean } => {
  const filePath = `public/${path}`;

  fs.stat(filePath, function (err, stats) {
    if (err) {
      return { error: err.message };
    }

    fs.unlink(filePath, function (err) {
      if (err) return { error: err.message };
      console.log("File deleted successfully");
    });
  });

  return { success: true };
};

export const removeAllOwnerProductImages = (images: string[]) => {
  images.forEach((image) => {
    if (image) {
      removeFile(image);
    }
  });
};
