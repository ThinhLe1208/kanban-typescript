import { https } from './baseService';

class ProjectService {
  getAllProject = (keyword: string | undefined) => {
    let url = '/api/Project/getAllProject';
    if (keyword) {
      url = `/api/Project/getAllProject?keyword=${keyword}`;
    }
    return https.get(url);
  };
}

export const projectService = new ProjectService();
