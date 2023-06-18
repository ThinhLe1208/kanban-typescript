import { https } from './baseService';

class OptionsService {
  getPriority = (id: number | undefined) => {
    let url = '/api/Priority/getAll?id=0';
    if (id) {
      url = `/api/Priority/getAll?id=${id}`;
    }
    return https.get(url);
  };

  getAllProjectCategory = () => https.get('/api/ProjectCategory');

  getAllStatus = () => https.get('/api/Status/getAll');

  getAllTaskType = () => https.get('/api/TaskType/getAll');
}

export const optionsService = new OptionsService();
