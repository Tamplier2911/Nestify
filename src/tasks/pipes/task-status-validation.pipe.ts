import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException
} from "@nestjs/common";
import { TasksStatus } from "../tasks.model";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TasksStatus.OPEN,
    TasksStatus.IN_PROGRESS,
    TasksStatus.DONE
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, "value");
    console.log(metadata, "metadata");
    value = value.toUpperCase();
    if (!this.isStatusValid(value))
      throw new BadRequestException(`"${value}" is an invalid status.`);
    return value;
  }

  isStatusValid(value: any): boolean {
    return this.allowedStatuses.includes(value) ? true : false;
  }
}
