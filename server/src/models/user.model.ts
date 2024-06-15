import mongoose, { Schema, Document, Model } from "mongoose";

interface UserAttrs {
  name: string;
  email: string;
  password: string;
  customerId: string;
  subscriptions: any[];
}

interface UserDoc extends Document {
  name: string;
  email: string;
  password: string;
  customerId: string;
  subscriptions: any[];
}

interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      min: 6,
      max: 64,
    },
    customerId: {
      type: String,
      required: true,
    },
    subscriptions: [],
  },
  { timestamps: true, versionKey: false }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
