import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@Entity()
@ObjectType({ description: 'users entity' })
class Users {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field({ nullable: false })
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;
}

export default Users;
