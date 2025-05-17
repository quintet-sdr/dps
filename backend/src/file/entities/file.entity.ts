import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn({ name: 'file_id' })
  id: number;

  @Column()
  filename: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner_id: User;

  @CreateDateColumn()
  uploaded_at: Date;
}
