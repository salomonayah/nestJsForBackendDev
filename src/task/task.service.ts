import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/createtask.dto';
import { GetTaskDto } from './dto/getTask.dto';
import { exception } from 'console';
import { doesNotThrow } from 'assert';

@Injectable()
export class TaskService {
    tasks: Task[]  = [];

    getAllTasks(): Task[]  {
        return this.tasks
    }

    getAllFilteredTasks(taskfilter: GetTaskDto): Task[]  {
        let tasks = this.tasks;
        const {status, search} =  taskfilter

        if(status) {
            tasks = tasks.filter((task) => {
                return task.status === status
            } )
        } 

        if(search) {
            tasks = tasks.filter((task) => {
                return task.description.includes(search) || task.title.includes(search)
            } )

        }

        return tasks
    }

    getTaskById(id: string) : Task {
        const taskFound =  this.tasks.find( task => task.id === id)

        if (!taskFound) {
            throw new NotFoundException('task not found !')
        }

        return taskFound
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

    deleteTaskById(id: string) : Task[] {
        const taskToDelete = this.tasks.find( task => task.id === id)
        if(!taskToDelete) {
            throw new NotFoundException('This task is not found ! ')
        }
        const taskIndex = this.tasks.indexOf(taskToDelete[0])
        this.tasks.splice(taskIndex,1);
        return this.tasks
    }

    updateTaskStatusById(id: string, statut: TaskStatus) : Task {
        const taskToUpdate = this.tasks.find( task => task.id === id)
        if(!taskToUpdate) {
            throw new NotFoundException('This task is not found ! ')
        }
        taskToUpdate.status = statut
        this.deleteTaskById(id)
        this.tasks.push(taskToUpdate);
        return taskToUpdate
    }
}
