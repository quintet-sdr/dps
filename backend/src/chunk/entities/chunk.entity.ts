import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { File } from '../../file/entities/file.entity'

@Entity()
export class Chunk {
  @PrimaryColumn()
  @ManyToOne(() => File, (file) => file.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'file_id' })
  file_id: number

  @PrimaryColumn()
  chunk_index: number

  @Column()
  node_address: string

  @Column()
  checksum: string

  @Column()
  size_bytes: number
}
