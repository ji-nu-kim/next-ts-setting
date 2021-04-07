export const actionTypesPost = {
  ADD_POST: 'ADD_POST',
} as const;

export type ActionsPost = AddPost;

export interface AddPost {
  type: typeof actionTypesPost.ADD_POST;
}
