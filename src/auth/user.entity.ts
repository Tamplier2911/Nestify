import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique
} from "typeorm";

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;
}
