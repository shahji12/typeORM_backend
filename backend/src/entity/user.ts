import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import { Profile } from './profile';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email:string;

    @Column()
    password: string;

    @Column({name:'address',nullable:true})
    address: string = '';

    @OneToOne(()=>Profile, {cascade: true, eager: true,nullable:true})
    @JoinColumn()
    profile : Profile

}