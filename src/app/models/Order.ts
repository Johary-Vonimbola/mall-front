import { AuditField } from "./AuditField";

export class OrderResponse{
    constructor(
        public order: Order,
        public orderDetails : OrderDetail[]
    ){}
}

export class OrderDetail{
    constructor(
        public orderId: string,
        public quantity: number,
        public price: number,
        public productId: string,
        public productName: string,
        public productUom: string,
        public productUomId: string,
        public productPicture: string,
        public productCategory: string,
        public productCategoryId: string
    ){
    }
}

export class Order extends AuditField {
    constructor(
        public _id: string,
        public date: Date,
        public clientId: string,
        public shopId: string,
        public total: number,
        public nbArticles: number,
        public status: string,
        public details: OrderDetail[],
        createdAt: Date,
        updatedAt: Date
    ){
        super(createdAt, updatedAt);
    }
}