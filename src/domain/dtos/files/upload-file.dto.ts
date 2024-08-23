export class UploadFileDto {
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
}
