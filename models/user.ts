import mongoose, { Schema, models } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 50,
      required: true,
    },
    email: {
      type: String,
      max: 50,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 5,
      max: 50,
      required: true,
    },
    image: {
      public_id: String,
      url: String,
    },
    friends: {
      type: Array,
      default: [],
    },
    socialId: Number,
    twitter: String,
    instagram: String,
    dribbble: String,
    linkedin: String,
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = models.User || mongoose.model('User', userSchema);

export default User;
