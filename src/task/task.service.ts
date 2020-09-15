import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './createtask.dto';

@Injectable()
export class TaskService {
    tasks: Task[]  = [];

    getAllTasks(): Task[]  {
        return this.tasks
    }

    getTaskById(id: string) : Task {
        return this.tasks.find( task => task.id === id)
    }

    createTask(createTaskDto: CreateTaskDto): Task  {

        const {title, description} = createTaskDto

        const newTask =  {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(newTask);

        return newTask
    }

    deletaTaskById(id: string) : Task[] {
        const taskToDelete = this.tasks.find( task => task.id === id)
        const taskIndex = this.tasks.indexOf(taskToDelete[0])
        this.tasks.splice(taskIndex,1);
        return this.tasks
    }
}
