import { Controller, Get, Post, Body } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./tasks.model";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() { description, title }): Task {
    return this.tasksService.createTask(title, description);
  }

  /*
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
}
