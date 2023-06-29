import { https } from './baseService';

class CommentService {
  getAll = (taskId: number | undefined) => {
    let url = '/api/Comment/getAll';
    if (taskId) {
      url = `/api/Comment/getAll?taskId=${taskId}`;
    }
    return https.get(url);
  };
}

export const commentService = new CommentService();
