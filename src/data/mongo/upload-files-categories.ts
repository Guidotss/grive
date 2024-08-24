import { filetypeClient, filesClient } from ".";

const data = [
  {
    category: "image",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    category: "document",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    category: "video",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

(async () => {
  await filesClient.deleteMany();
  await filetypeClient.deleteMany();
  for (const file of data) {
    await filetypeClient.create({
      data: file,
    });
  }
  console.log("File types created successfully");
})();
