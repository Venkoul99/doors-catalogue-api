import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Doors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', {precision: 10, scale: 2})
  price: number;

  @Column('decimal', {precision: 10, scale: 2, default: null, nullable: true})
  salePrice: number;

  @Column({nullable: true})
  image: string;

  @Column()
  doorTypeId: number;
}
