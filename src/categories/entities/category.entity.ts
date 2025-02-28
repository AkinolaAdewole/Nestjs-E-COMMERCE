import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";


@Entity({name:'categories'}) 
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @CreateDateColumn()
    createdAt:Timestamp;
    
    @UpdateDateColumn()
    updatedAt:Timestamp;

    // User can create multiple categories
    @ManyToOne(()=>UserEntity,(user)=>user.categories)
    addedBy:UserEntity; 

    // product can have many category
    @OneToMany(()=>ProductEntity,(prod)=>prod.category)
    products:ProductEntity[];
}

