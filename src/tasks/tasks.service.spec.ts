import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TaskRepository } from "./tasks.repository";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TasksStatus } from "./tasks.status.enum";

const mockUser = { id: 7, username: "Brenda" };

const mockTaskRepository = () => ({
  getAllTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn()
});

describe("Tasks Service", () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository }
      ]
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe("getAllTasks", () => {
    it("gets all tasks from the repository", async () => {
      taskRepository.getAllTasks.mockResolvedValue("value");
      //   taskRepository.getAllTasks.mockReturnedValue();
      //   taskRepository.getAllTasks.mockRejectedValue();

      expect(taskRepository.getAllTasks).not.toHaveBeenCalled();

      // dto
      const filters: GetTasksFilterDto = {
        status: TasksStatus.IN_PROGRESS,
        search: "search query"
      };

      // call taskService.getTasks
      const result = await tasksService.getAllTasks(filters, mockUser);
      expect(taskRepository.getAllTasks).toHaveBeenCalled();
      expect(result).toEqual("value");
      // expect taskRepository.getTask TO HAVE BEEN CALLED
    });
  });

  describe("getTaskById", () => {
    it("calls taskRepo.findOne() gets and retunrs value", async () => {
      const mockTask = {
        title: "Testing task",
        description: "Testing desc"
      };
      taskRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById(1, mockUser);
      expect(result).toEqual(mockTask);

      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1, userId: mockUser.id }
      });
    });

    it("throws error if task is not found", () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow();
    });
  });

  describe("createTask", () => {
    it("calls taskRepository.create() and returns result", async () => {
      taskRepository.createTask.mockResolvedValue("someTask");
      expect(taskRepository.createTask).not.toHaveBeenCalled();
      const createTaskDto = { title: "Test task", description: "Test desc" };
      const result = await tasksService.createTask(createTaskDto, mockUser);
      expect(taskRepository.createTask).toHaveBeenCalledWith(
        createTaskDto,
        mockUser
      );
      expect(result).toEqual("someTask");
    });
  });

  describe("deleteTask", () => {
    it("calls taskRepository.deleteTask() to delete a task", async () => {
      taskRepository.delete.mockResolvedValue({ affected: 1 });
      expect(taskRepository.delete).not.toHaveBeenCalled();
      const result = await tasksService.deleteTask(1, mockUser);
      expect(taskRepository.delete).toHaveBeenCalledWith({
        id: 1,
        userId: mockUser.id
      });
    });
    it("throws an error as task could not be found", () => {
      taskRepository.delete.mockResolvedValue({ affected: 0 });
      expect(tasksService.deleteTask(1, mockUser)).rejects.toThrow();
    });
  });

  describe("updateTaskStatus", () => {
    it("updates task status", async () => {
      const save = jest.fn().mockResolvedValue(true);
      tasksService.getTaskById = jest.fn().mockResolvedValue({
        status: TasksStatus.OPEN,
        save: save
      });
      expect(tasksService.getTaskById).not.toHaveBeenCalled();
      expect(save).not.toHaveBeenCalled();
      const result = await tasksService.updateTaskStatus(
        1,
        TasksStatus.DONE,
        mockUser
      );
      expect(tasksService.getTaskById).toHaveBeenCalled();
      expect(save).toHaveBeenCalled();
      expect(result.status).toEqual(TasksStatus.DONE);
    });
  });
});
