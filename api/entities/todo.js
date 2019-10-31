import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import User from './user';

@Entity()
export default class ToDo {
  @PrimaryGeneratedColumn()
  id

  @Column({ type: 'boolean' })
  done

  @Column({ type: 'varchar' })
  title

  @Column({ type: 'integer'})
  category

  @ManyToOne(() => User, (user) => user.todos)
  user
  // Is this a column in the db?
}
