// import { Task, TasksStatus } from "./tasks.model";
// import * as uuid from "uuid/v1";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./tasks.entity";
import { TaskRepository } from "./tasks.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { TasksStatus } from "./tasks.status.enum";
import { User } from "../auth/user.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  async getAllTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getAllTasks(filterDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id: id, userId: user.id }
    });
    if (!found) throw new NotFoundException(`Task with ID "${id}" not found.`);
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    // Abstracting logic into repository
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async updateTaskStatus(
    id: number,
    status: TasksStatus,
    user: User
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }

  async deleteTask(id: number, user: User): Promise<void> {
    // delete by certain criteria (can delete few that match criteria)
    const result = await this.taskRepository.delete({
      id: id,
      userId: user.id
    });

    // DeleteResult { raw: [], affected: 1 } <= result
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }
    // remove by entity (retrieve entity or arr of entities, and pass it as an argument)
    // const found = await this.taskRepository.findOne(id);
    // if (!found) throw new NotFoundException(`Task with ID "${id}" not found.`);
    // await this.taskRepository.remove(found);
  }
}
