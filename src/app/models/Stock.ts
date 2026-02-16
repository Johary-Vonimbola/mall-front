import { AuditField } from "./AuditField";

export class StockMove extends AuditField{

    constructor(
        public _id: string,
        public shopId: string,
        public date: Date,
        public description: String,
        createdAt: Date,
        updateAt: Date
    ){
        super(createdAt, updateAt);
    }

}

export class StockMoveLine extends AuditField{
    
    constructor(
        public _id: string,
        public parentId: String,
        public type: String,
        public productId: String,
        public productName: String,
        public quantity: Number,
        createdAt: Date,
        updatedAt: Date
    ){
        super(createdAt, updatedAt);
    }

}

export class StockResponse extends AuditField{
    
    constructor(
        public parent: StockMove,
        public lines: StockMoveLine[],
        createdAt: Date,
        updatedAt: Date
    ){
        super(createdAt, updatedAt);
    }

}