export interface IUserInfo {
  id: number;
  nickname: string;
}

export interface IUser {
  id: number;
  email: string;
  nickname: string;
  Posts: { id: number }[];
  Followings: { id: number; nickname?: string }[];
  Followers: { id: number; nickname?: string }[];
}

export interface IPost {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  User: IUserInfo;
  Retweet?: any;
  RetweetId?: number | null;
  Images: { src: string }[];
  Likers: { id: number }[];
  Comments: IComment[];
}

export interface ICommentProps {
  comment: string;
  postId: number;
}

export interface IComment {
  id: number;
  content: string;
  PostId: number;
  User: IUserInfo;
}
