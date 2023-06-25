import { UpdatePiorityModel, UpdateStatusVM } from 'models/taskModel';
import { https } from './baseService';

class TaskService {
  updateStatus = (updateStatus: UpdateStatusVM) => {
    let url = '/api/Project/updateStatus';
    return https.put(url, updateStatus);
  };

  updatePriority = (updatePriority: UpdatePiorityModel) => {
    let url = '/api/Project/updatePriority';
    return https.put(url, updatePriority);
  };
}

const taskService = new TaskService();
export default taskService;
