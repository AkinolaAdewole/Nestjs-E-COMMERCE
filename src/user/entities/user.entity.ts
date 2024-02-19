import { Roles } from "src/utility/common/user-roles.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumna()
    id:number;
    @Column()
    name:string;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column()
    roles:Roles[]

}
