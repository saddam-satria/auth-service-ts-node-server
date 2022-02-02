import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class NewTokenPayload {
  @Field()
  accessToken: string;
}

export default NewTokenPayload;
