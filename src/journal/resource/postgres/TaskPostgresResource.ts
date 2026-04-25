import { DataSource, Repository, FindOptionsWhere } from 'typeorm';

import { TaskEntity } from './entity/TaskEntity';
import { TypeOrmResource } from '../../../shared/resource/TypeOrmResource';

import { Task } from '../../types/task/Task';
import { SearchTaskRequest } from '../../types/task/SearchTaskRequest';
import { CreateTaskRequest } from '../../types/task/CreateTaskRequest';

export class TaskPostgresResource extends TypeOrmResource {

        taskRepository: Repository<TaskEntity>;

        static get inject() {
            return ['DBConnection'];
        }

        constructor( dbConnection: DataSource){
            super();
            this.taskRepository = dbConnection.getRepository(TaskEntity);
        }

        async createTask (task: CreateTaskRequest): Promise<Task> {
            const createdTask = await this.taskRepository.save(task);

            if(!createdTask.id){
                throw new Error('Could Not Create Task')
            }

            return createdTask as Task;
        }

        async deleteTaskById (id: string): Promise<boolean> {
            const result = await this.taskRepository.delete({ id: id });

            return result.affected === 1 ? true : false;
        }

        async searchTasks (searchRequest: SearchTaskRequest): Promise<Task[]> {
            const { journalEntryId, accountId, status, createdAt, updatedAt } = searchRequest;
            const { limit = 20, offset = 0 } = searchRequest;
            const where: FindOptionsWhere<TaskEntity> = {};

            if(journalEntryId){
                where.journalEntryId = journalEntryId;
            }

            if(accountId){
                where.accountId = accountId;
            }

            if(status){
                where.status = status;
            }

            if(createdAt){
                where.createdAt = this.adaptDateFilter(createdAt);
            }

            if(updatedAt){
                where.updatedAt = this.adaptDateFilter(updatedAt);
            }

            const result = await this.taskRepository.find({
                where,
                take: limit,
                skip: offset,
                order: {
                    createdAt: 'DESC',
                },
            });

            const tasks = result.map(task => task as Task) || [];
            return tasks;
        }

}
