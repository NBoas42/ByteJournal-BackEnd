import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { DateFilter } from '../types/DateFilter';

export class TypeOrmResource {
     adaptDateFilter(date: DateFilter){

        if(date?.before && date?.after){ 
            return Between(date.before, date.after);
        }

        if(date?.before){ 
            return LessThanOrEqual(date.before);
        }

        if(date?.after){ 
            return MoreThanOrEqual(date.after);
        }
    }
}