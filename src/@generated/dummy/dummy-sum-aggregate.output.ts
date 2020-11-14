import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DummySumAggregate {
    @Field(() => String, {
        nullable: true,
        description: undefined,
    })
    decimal?: string;

    @Field(() => String, {
        nullable: true,
        description: undefined,
    })
    bigInt?: BigInt;
}
