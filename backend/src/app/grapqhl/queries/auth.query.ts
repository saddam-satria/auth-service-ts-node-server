import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class AuthQuery {
  @Field()
  status: string;

  @Field()
  message?: string;

  @Field()
  token?: string;
}

export default AuthQuery;
