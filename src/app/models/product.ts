import { AuditField } from "./AuditField";

export class Product extends AuditField{

    constructor(
        public _id: string,
        public name: string,
        public uom: string,
        public uomId: string,
        public price: number,
        public shopId: string,
        public picture: string,
        public isActive: boolean,
        public category: string,
        public categoryId: string,
        public stock: number,
        createdAt: Date,
        updatedAt: Date
    ){
        super(createdAt, updatedAt);
    }

}

export class ProductCategory extends AuditField{

    constructor(
        public _id: string,
        public name: string,
        public shopId: string,
        createdAt: Date,
        updatedAt: Date
    ){
        super(createdAt, updatedAt);
    }

}

export class Uom extends AuditField{

    constructor(
        public _id: string,
        public abbr: string,
        public name: string,
        createdAt: Date,
        updatedAt: Date
    ){
        super(createdAt, updatedAt);
    }

}