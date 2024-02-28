import { Post } from "../models/postSchema.js";

async function getPostSrv() {
  //Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  // return Post.find({ owner: { $lte: id } });
  return Post.find();
}

async function addPostSrv(title, text, owner) {
  const resAddDb = await Post.create({ title, text, owner });
  // console.log(resAddDb);
  return resAddDb;
}

export { getPostSrv, addPostSrv };
