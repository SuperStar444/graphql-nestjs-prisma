import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProfileWhereInput } from './profile-where.input';
import { ProfileOrderByWithRelationAndSearchRelevanceInput } from './profile-order-by-with-relation-and-search-relevance.input';
import { ProfileWhereUniqueInput } from './profile-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ProfileCountAggregateInput } from './profile-count-aggregate.input';
import { ProfileAvgAggregateInput } from './profile-avg-aggregate.input';
import { ProfileSumAggregateInput } from './profile-sum-aggregate.input';
import { ProfileMinAggregateInput } from './profile-min-aggregate.input';
import { ProfileMaxAggregateInput } from './profile-max-aggregate.input';

@ArgsType()
export class ProfileAggregateArgs {
  @Field(() => ProfileWhereInput, { nullable: true })
  where?: ProfileWhereInput;

  @Field(() => [ProfileOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<ProfileOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => ProfileWhereUniqueInput, { nullable: true })
  cursor?: ProfileWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => ProfileCountAggregateInput, { nullable: true })
  _count?: ProfileCountAggregateInput;

  @Field(() => ProfileAvgAggregateInput, { nullable: true })
  _avg?: ProfileAvgAggregateInput;

  @Field(() => ProfileSumAggregateInput, { nullable: true })
  _sum?: ProfileSumAggregateInput;

  @Field(() => ProfileMinAggregateInput, { nullable: true })
  _min?: ProfileMinAggregateInput;

  @Field(() => ProfileMaxAggregateInput, { nullable: true })
  _max?: ProfileMaxAggregateInput;
}
