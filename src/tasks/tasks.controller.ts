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

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get("/:id")
  getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
}

// ROUTING REFERENCE
/*

@Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }
  
  @Get()
  getTasksWithFilters(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto
  ): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: string,
    @Body("status", TaskStatusValidationPipe) status: TasksStatus
  ): Task {
    return this.tasksService.updateTask(id, status);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string): void {
    this.tasksService.deleteTask(id);
  }

  @Post()
  createTasks(
    @Body("title") title: string,
    @Body("description") description: string
  ) {
    console.log(description, title);
  }

  @Post()
  createTaskz(@Body() body) {
    console.log(body);
  }

  */
