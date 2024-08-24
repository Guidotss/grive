export class UploadFileDto {
  public readonly category: string;
  constructor(
    public readonly fieldname: string,
    public readonly mimetype: string,
    public readonly originalname: string,
    public readonly buffer: Buffer
  ) {
    this.fieldname = fieldname;
    this.mimetype = mimetype;
    this.originalname = originalname;
    this.buffer = buffer;
    this.category = UploadFileDto.getFileCategory(mimetype);
  }

  public static create(data: any): [string[]?, UploadFileDto?] {
    const { fieldname, mimetype, buffer, originalname } = data;
    const errors = [];
    if (!fieldname) {
      errors.push("Fieldname is required");
    }
    if (!mimetype) {
      errors.push("Mimetype is required");
    }

    if (!originalname) {
      errors.push("Originalname is required");
    }

    if (
      mimetype !== "image/jpeg" &&
      mimetype !== "image/png" &&
      mimetype !== "video/mp4" &&
      mimetype !== "application/pdf" &&
      mimetype !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
      mimetype !== "application/msword"
    ) {
      console.log(mimetype);
      errors.push("Invalid mimetype");
    }

    if (!buffer) {
      errors.push("Buffer is required");
    }

    if (errors.length) {
      return [errors, undefined];
    }
    return [
      undefined,
      new UploadFileDto(fieldname, mimetype, originalname, buffer),
    ];
  }
  public static getFileCategory(mimetype: string): string {
    const mimeCategoryMap: Record<string, string> = {
      "application/pdf": "document",
      "application/msword": "document",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "document",
      "image/jpeg": "image",
      "image/png": "image",
      "audio/mpeg": "audio",
      "video/mp4": "video",
    };
    return mimeCategoryMap[mimetype];
  }
}
