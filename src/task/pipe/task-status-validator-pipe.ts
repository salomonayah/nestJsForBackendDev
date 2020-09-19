import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from '../task.model';

export class TaskStatusValidatorPipe implements PipeTransform {

    readonly allowedTaskStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];

    transform(value:any) {

        value =  value.toUpperCase()

        if(!this.allowedTaskStatus.includes(value)) {
            throw new BadRequestException('This status : ' + value + ' is not allowed')
        }

        return value
    }
}