import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';


@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login_token: string;

    @Column()
    password_expiry_time:string;
}