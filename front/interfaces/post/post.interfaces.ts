export interface PostState {
  mainPosts: {
    id: number;
    User: {
      id: string;
      nickname: string;
    };
    content: string;
    Images: { src: string }[];
    Comments: { User: { nickname: string }; content: string }[];
  }[];
  imagePaths: string[];
  postAdded: boolean;
}
