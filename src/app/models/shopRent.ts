import { AuditField } from "./AuditField";

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