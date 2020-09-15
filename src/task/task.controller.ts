import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './createtask.dto';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

    constructor(private taskService: TaskService) {}

    @Get()
    getAllTasks() : Task[] {
       return this.taskService.getAllTasks()
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string) : Task {
       return this.taskService.getTaskById(id)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string) : Task[] {
       return this.taskService.deletaTaskById(id);
    }

    @Post()
    createNewTask(
        @Body() createTaskDto : CreateTaskDto
    ) : Task {
        return this.taskService.createTask(createTaskDto)
    }
}
