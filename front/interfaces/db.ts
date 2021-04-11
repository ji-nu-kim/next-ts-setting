export interface IUserInfo {
  id: string;
  nickname: string;
}

export interface IUser {
  id: string;
  email: string;
  nickname: string;
  Posts: { id: string }[];
  Followings: IUserInfo[];
  Followers: IUserInfo[];
}

export interface IPost {
  id: string;
  content: string;
  User: IUserInfo;
  Retweet?: any;
  Images: { src: string }[];
  Likers?: IUserInfo[];
  Comments: IComment[];
}

export interface ICommentProps {
  comment: string;
  postId: string;
  userId: string;
}

export interface IComment {
  id: string;
  content: string;
  postId: string;
  User: IUserInfo;
}
