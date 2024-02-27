import { Schema, model } from "mongoose";
import Joi from "joi";
import { compare, genSalt, hash } from "bcrypt";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for post"],
    },
    text: {
      type: String,
      required: [true, "Set name for Model"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
      },
  { versionKey: false, timestamps: true }
);

//Для обработки ошибок валидации схемы и изменения статуса ошибки с 500 на 400
postSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

const addPostSchema = Joi.object({
  // password: Joi.string().required(),
  // email: Joi.string().required(),
});

const schema = { addPostSchema };

const Post = model("post", postSchema);

export { Post, schema };
