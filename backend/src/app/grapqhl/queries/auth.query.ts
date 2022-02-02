import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class AuthQuery {
  @Field()
  status: string;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  accessToken?: string;

  @Field({ nullable: true })
  refreshToken?: string;
}

export default AuthQuery;
