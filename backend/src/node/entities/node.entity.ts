import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  status: string;
}
