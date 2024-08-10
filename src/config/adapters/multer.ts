import multer from "multer";

export class MulterAdapter {
  static getMulter() {
    const storage = multer.memoryStorage();
    return multer({ storage });
  }
}
