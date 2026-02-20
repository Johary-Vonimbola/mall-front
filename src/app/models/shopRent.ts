import { AuditField } from "./AuditField";
import { ShopResponse } from "./shop";

export class ShopRent extends AuditField{

    constructor(
        public _id: string,
        public shopId: string,
        public shopName: string,
        public amount: number,
        public frequencyString: string,
        public frequency: number,
        public dueDate: number,
        public isActive: boolean,
        createdAt: Date,
        updatedAt: Date
    ){
        super(createdAt, updatedAt);
    }
}

export class ShopRentPayment extends AuditField{

    constructor(
        public _id: string,
        public rentConfigId: string,
        public year: number,
        public month: number,
        public amount: number,
        public paidAt: Date,
        public paidBy: string,
        public status: string,
        createdAt: Date,
        updatedAt: Date,
        public dueDate: Date,
        public shopId?: ShopResponse,
    ){
        super(createdAt, updatedAt);
    }

}