import { Roles } from "src/utility/common/user-roles.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    firstname:string;
    @Column()
    lastname:string;
    @Column({unique:true})
    email:string;
    @Column({select:false})
    password:string;
    @Column({type:'enum', enum:Roles, array:true, default:[Roles.USER]})
    roles:Roles[]

}
