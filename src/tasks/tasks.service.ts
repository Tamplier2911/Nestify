// import { Task, TasksStatus } from "./tasks.model";
// import * as uuid from "uuid/v1";
import { Injectable, NotFoundException } from "@nestjs/common";
// import { CreateTaskDto } from "./dto/create-task.dto";
// import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./tasks.entity";
import { TaskRepository } from "./tasks.repository";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) throw new NotFoundException(`Task with ID "${id}" not found.`);
    return found;
  }
}

// TASKS REFERENCE
/*

  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (search) {
      tasks = tasks.filter(
        task =>
          task.description.includes(search) || task.description.includes(search)
      );
    }
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);
    if (!task) throw new NotFoundException(`Task with ID "${id}" not found.`);
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TasksStatus.OPEN,
      createdAt: new Date()
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, status: TasksStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }
  
  */
