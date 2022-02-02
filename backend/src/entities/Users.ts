import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import hashModule from '../app/modules/hash.module';

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
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @Length(8, 16)
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashModule.hashPassword(this.password);
  }
}

export default Users;
