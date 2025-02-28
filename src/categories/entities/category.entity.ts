import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'categories' })
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true }) // Allow null values
    description?: string;

    @CreateDateColumn()
    createdAt: Date; // Changed to Date type
    
    @UpdateDateColumn()
    updatedAt: Date; // Changed to Date type

    // User can create multiple categories
    @ManyToOne(() => UserEntity, (user) => user.categories, { onDelete: "CASCADE" }) 
    addedBy: UserEntity;

    // A category can have multiple products
    @OneToMany(() => ProductEntity, (prod) => prod.category)
    products: ProductEntity[];
}
