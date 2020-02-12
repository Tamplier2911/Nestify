// import { Task, TasksStatus } from "./tasks.model";
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe
} from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";
import { TasksService } from "./tasks.service";
import { Task } from "./tasks.entity";
import { TasksStatus } from "./tasks.status.enum";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto
  ): Promise<Task[]> {
    return this.tasksService.getAllTasks(filterDto);
  }

  @Get("/:id")
  getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: number,
    @Body("status", TaskStatusValidationPipe) status: TasksStatus
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Delete("/:id")
  deleteTask(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
