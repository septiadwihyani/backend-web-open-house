import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({name:'house'})
export class HouseEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title:string;
    @Column()
    description:string;
    @Column({type:'decimal', precision:10, scale:2, default:0})
    price:number;
    @Column()
    address:string;
    @Column()
    whatsapp:string;
    @Column('simple-array')
    photos:string[]
    @Column('simple-array')
    video:string[]
    @CreateDateColumn()
    createdAt:Timestamp;
    @UpdateDateColumn()
    updateAt:Timestamp;

    @ManyToOne(()=>UserEntity,(user)=>user.house)
    addedBy:UserEntity;
}
