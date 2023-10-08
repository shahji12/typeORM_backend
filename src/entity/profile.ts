import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';


@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pname: string;

    @Column()
    age: number;

    @Column()
    gender: string;

    @Column()
    image: string;

}