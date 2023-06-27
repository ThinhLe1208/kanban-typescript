// updateStatus
export type UpdateStatusVM = {
  taskId: number;
  statusId: string;
};

// updatePriority
export type UpdatePiorityModel = {
  taskId: number;
  priorityId: number;
};

// createTask
export type TaskInsertModel = {
  listUserAsign: number[];
  taskName: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  projectId: number;
  typeId: number;
  priorityId: number;
};
