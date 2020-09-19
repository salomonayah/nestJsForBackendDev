import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { query } from 'express';
import { CreateTaskDto } from './dto/createtask.dto';
import { GetTaskDto } from './dto/getTask.dto';
import { TaskStatusValidatorPipe } from './pipe/task-status-validator-pipe';
import { Task, TaskStatus } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

    constructor(private taskService: TaskService) {}

    @Get()
    getTasks(@Query() filterDto: GetTaskDto) : Task[] {
      if(Object.keys(filterDto).length) {
         return this.taskService.getAllFilteredTasks(filterDto)
      } else {
         return this.taskService.getAllTasks()
      }    
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string) : Task {
       return this.taskService.getTaskById(id)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string) : Task[] {
       return this.taskService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskById(@Param('id') id: string, @Body('status', TaskStatusValidatorPipe) status:TaskStatus) : Task {
       return this.taskService.updateTaskStatusById(id, status);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createNewTask(
        @Body() createTaskDto : CreateTaskDto
    ) : Task {
        return this.taskService.createTask(createTaskDto)
    }
}
