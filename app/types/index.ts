type Image = {
  public_id: string;
  url: string;
};

export type Comment = {
  comment: string;
  commentPic: string;
  name: string;
  userId: string;
};

type Likes = {};

export type User = {
  _id: string;
  name: string | null;
  email: string | null;
  createdAt: Date;
  updatedAt: Date;
  location: string;
  image: Image;
  friends: any[];
  socialId: number;
  occupation: string;
  viewedProfile: number;
  impressions: number;
  twitter: string;
  instagram: string;
  dribbble: string;
  linkedin: string;
};

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export type Friends = {
  _id: string;
  name: string;
  image: string;
  occupation: string;
  location: string;
};

export interface Post {
  _id: string;
  userId: string;
  name: string;
  location: string;
  description: string;
  picturePath: Image;
  userPicturePath: Image;
  hashtag: string;
  likes: Likes;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type SafePosts = Omit<Post, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};
