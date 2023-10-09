import { Roles } from "src/utility/common/user-roles.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { HouseEntity } from "src/house/entities/house.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column({unique:true})
    email:string;
    @Column({select:false})
    password:string;
    @Column({type:'enum', enum:Roles, array:true, default:[Roles.BUYER]})
    roles:Roles[];
    @CreateDateColumn()
    createdAt:Timestamp;
    @UpdateDateColumn()
    updateAt:Timestamp;

    @OneToMany(()=>HouseEntity,(home)=>home.addedBy)
    house:HouseEntity[];
}
