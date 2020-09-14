import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
    tasks: Task[]  = [];

    getAllTasks(): Task[]  {
        return this.tasks
    }

    createTask(title, description): Promise<Task>  {
        const newTask =  {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(newTask);

        return newTask
    }
}
