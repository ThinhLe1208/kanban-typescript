// getPriority
export type PriorityModel = {
  [key: string]: string | number | boolean;
  priorityId: number;
  priority: string;
  description: string;
  deleted: boolean;
  alias: string;
};

// getAllProjectCategory
export type ProjectCategoryModel = {
  [key: string]: string | number;
  id: number;
  projectCategoryName: string;
};

// getAllStatus
export type StatusModel = {
  [key: string]: string;
  statusId: string;
  statusName: string;
  alias: string;
  deleted: string;
};

// getAllTaskType
export type TaskTypeModel = {
  [key: string]: string | number;
  id: number;
  taskType: string;
};
