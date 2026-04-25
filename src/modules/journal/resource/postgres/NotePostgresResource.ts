import { DataSource, Repository, FindOptionsWhere } from 'typeorm';

import { NoteEntity } from './entity/NoteEntity';
import { TypeOrmResource } from '../../../../shared/resource/TypeOrmResource';

import { Note } from '../../types/note/Note';
import { SearchNoteRequest } from '../../types/note/SearchNoteRequest';
import { CreateNoteRequest } from '../../types/note/CreateNoteRequest';
import { UpdateNoteRequest } from '../../types/note/UpdateNoteRequest';

export class NotePostgresResource extends TypeOrmResource {

        noteRepository: Repository<NoteEntity>;

        static get inject() {
            return ['DBConnection'];
        }

        constructor( dbConnection: DataSource){
            super();
            this.noteRepository = dbConnection.getRepository(NoteEntity);
        }

        async createNote (note: CreateNoteRequest): Promise<Note> {
            const createdNote = await this.noteRepository.save(note);

            if(!createdNote.id){
                throw new Error('Could Not Create Note')
            }

            return createdNote as Note;
        }

        async updateNoteById (id: string, noteToUpdate: UpdateNoteRequest): Promise<boolean> {
            const result = await this.noteRepository.update({ id: id }, noteToUpdate);

            return result.affected === 1 ? true : false;
        }

        async deleteNoteById (id: string): Promise<boolean> {
            const result = await this.noteRepository.delete({ id: id });

            return result.affected === 1 ? true : false;
        }

        async searchNotes (searchRequest: SearchNoteRequest): Promise<Note[]> {
            const { journalEntryId, accountId, type, createdAt, updatedAt } = searchRequest;
            const { limit = 20, offset = 0 } = searchRequest;
            const where: FindOptionsWhere<NoteEntity> = {};

            if(journalEntryId){
                where.journalEntryId = journalEntryId;
            }

            if(accountId){
                where.accountId = accountId;
            }

            if(type){
                where.type = type;
            }

            if(createdAt){
                where.createdAt = this.adaptDateFilter(createdAt);
            }

            if(updatedAt){
                where.updatedAt = this.adaptDateFilter(updatedAt);
            }

            const result = await this.noteRepository.find({
                where,
                take: limit,
                skip: offset,
                order: {
                    createdAt: 'DESC',
                },
            });

            const notes = result.map(note => note as Note) || [];
            return notes;
        }

}
