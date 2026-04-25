import { DataSource, Repository, FindOptionsWhere } from 'typeorm';

import { ReviewEntity } from './entity/ReviewEntity';
import { TypeOrmResource } from '../../../shared/resource/TypeOrmResource';

import { Review } from '../../types/review/Review';
import { SearchReviewRequest } from '../../types/review/SearchReviewRequest';
import { CreateReviewRequest } from '../../types/review/CreateReviewRequest';

export class ReviewPostgresResource extends TypeOrmResource {

        reviewRepository: Repository<ReviewEntity>;

        static get inject() {
            return ['DBConnection'];
        }

        constructor( dbConnection: DataSource){
            super();
            this.reviewRepository = dbConnection.getRepository(ReviewEntity);
        }

        async createReview (review: CreateReviewRequest): Promise<Review> {
            const createdReview = await this.reviewRepository.save(review);

            if(!createdReview.id){
                throw new Error('Could Not Create Review')
            }

            return createdReview as Review;
        }

        async deleteReviewById (id: string): Promise<boolean> {
            const result = await this.reviewRepository.delete({ id: id });

            return result.affected === 1 ? true : false;
        }

        async searchReviews (searchRequest: SearchReviewRequest): Promise<Review[]> {
            const { journalEntryId, accountId, createdAt, updatedAt } = searchRequest;
            const { limit = 20, offset = 0 } = searchRequest;
            const where: FindOptionsWhere<ReviewEntity> = {};

            if(journalEntryId){
                where.journalEntryId = journalEntryId;
            }

            if(accountId){
                where.accountId = accountId;
            }

            if(createdAt){
                where.createdAt = this.adaptDateFilter(createdAt);
            }

            if(updatedAt){
                where.updatedAt = this.adaptDateFilter(updatedAt);
            }

            const result = await this.reviewRepository.find({
                where,
                take: limit,
                skip: offset,
                order: {
                    createdAt: 'DESC',
                },
            });

            const reviews = result.map(review => review as Review) || [];
            return reviews;
        }

}
