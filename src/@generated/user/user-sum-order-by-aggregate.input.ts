import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class UserSumOrderByAggregateInput {
    @Field(() => SortOrder, { nullable: true })
    countComments?: SortOrder;

    @Field(() => SortOrder, { nullable: true })
    rating?: SortOrder;
}
