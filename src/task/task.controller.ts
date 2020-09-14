import { Body, Controller, Get, Post } from '@nestjs/common';
import { title } from 'process';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

    constructor(private taskService: TaskService) {}

    @Get()
    getAllTasks() : Task[] {
       return this.taskService.getAllTasks()
    }

    @Post()
    createNewTask(
        @Body('title') title,
        @Body('description') description
    ) : Task {
       return this.taskService.createTask(title, description)
    }
}
