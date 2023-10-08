import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';


@Entity()

export class Slider {

@PrimaryGeneratedColumn()
id : number

@Column()
title : string

@Column()
detail : string

@Column()
imgUrl : string

}
