import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("customer")
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ length: 225, nullable: false })
    customerName: string

    @Column({ length: 20, nullable: false, unique: true })
    mobilePhone: string

    @Column({ nullable: false })
    customerBalance: number

}