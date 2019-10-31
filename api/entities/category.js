/* eslint-disable import/no-cycle */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from 'typeorm';
  import User from './user';
  
  @Entity()
  export default class Category {
    @PrimaryGeneratedColumn()
    id

    @Column({ type: 'varchar'})
    name

    @ManyToOne(() => User, (user) => user.categories)
    user
  }