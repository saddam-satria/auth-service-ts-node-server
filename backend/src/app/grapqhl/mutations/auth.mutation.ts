import { Field, InputType } from 'type-graphql';

@InputType({ description: 'authenticate input type' })
class AuthMutation {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;
}

export default AuthMutation;
