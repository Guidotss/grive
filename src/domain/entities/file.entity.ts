export class FileEntity {
  constructor(
    public id: string,
    public title: string,
    public url: string,
    public key: string,
    public userId: string,
    public fileType: {id: string, category: string},
    public createdAt: Date,
    public updatedAt: Date
  ) { }

  public static fromObject(obj: { [key: string]: any }): FileEntity {
    const { id, title, url, key, userId, createdAt, updatedAt, fileType } = obj;
    return new FileEntity(
      id,
      title,
      url,
      key,
      userId,
      fileType,
      new Date(createdAt),
      new Date(updatedAt),
    );
  }
}
