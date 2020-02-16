import { Repository, EntityRepository } from "typeorm";
import { Task } from "./tasks.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksStatus } from "./tasks.status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "../auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getAllTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder("task");

    query.where("task.userId = :userId", { userId: user.id });

    // WHERE - overwrite previous query
    // ANDWHERE - applayed on previous query

    if (status) {
      query.andWhere("task.status = :status", { status: status });
    }

    // LIKE - is like includes
    // %${term}% - partial search
    if (search) {
      query.andWhere(
        "task.title LIKE :search OR task.description LIKE :search",
        { search: `%${search}%` }
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    // Create Task using Entity
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TasksStatus.OPEN;
    task.createdAt = new Date();
    task.user = user;
    await task.save();

    delete task.user.id;
    delete task.user.password;
    delete task.user.createdAt;
    delete task.user.tasks;
    delete task.userId;

    return task;
  }
}
