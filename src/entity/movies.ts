
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';


@Entity()
export class Movies {

@PrimaryGeneratedColumn()
id : number;

@Column()
title : string;

@Column()
detail : string;

@Column()
poster : string;

@Column()
attachment : string

@CreateDateColumn()
created_at : Date

@UpdateDateColumn()
updated_at : Date;

}