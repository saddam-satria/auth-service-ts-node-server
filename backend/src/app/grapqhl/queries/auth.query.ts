import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class AuthQuery {
  @Field()
  status: string;

  @Field()
  message?: string;

  @Field()
  accessToken?: string;

  @Field()
  refreshToken?: string;
}

export default AuthQuery;
