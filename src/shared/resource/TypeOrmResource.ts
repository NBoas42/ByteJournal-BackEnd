import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { DateFilter } from '../types/DateFilter';

export class TypeOrmResource {
     adaptDateFilter(date: DateFilter){
        const beforeDate = date?.before ? new Date(date.before) : undefined;
        const afterDate = date?.after ? new Date(date.after) : undefined;

        if( beforeDate  && afterDate ){ 
            return Between(afterDate, beforeDate);
        }

        if( beforeDate ){ 
            return LessThanOrEqual(beforeDate);
        }

        if( afterDate ){ 
            return MoreThanOrEqual(afterDate);
        }
    }
}