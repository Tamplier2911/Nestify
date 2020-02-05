export interface Task {
  id: string;
  title: string;
  description: string;
  status: TasksStatus;
  createdAt: Date;
}

export enum TasksStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE"
}
