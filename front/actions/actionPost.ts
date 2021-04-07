import {} from '@interfaces/post/post.interfaces';

import {
  actionTypesPost,
  AddPost,
} from '../interfaces/post/postAction.interfaces';

export const addPostAction = (): AddPost => {
  return {
    type: actionTypesPost.ADD_POST,
  };
};
