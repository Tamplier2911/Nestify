import { Injectable } from "@nestjs/common";
import { Task, TasksStatus } from "./tasks.model";
import * as uuid from "uuid/v1";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TasksStatus.OPEN,
      createdAt: new Date()
    };
    this.tasks.push(task);
    return task;
  }
}
