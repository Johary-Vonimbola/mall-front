import { AuditField } from "./AuditField";

export class CartDetail {
    constructor(
        public quantity: number,
        public price: number,
        public productId: string,
        public productName: string,
        public productUom: string,
        public productUomId: string,
        public productPicture: string,
        public productCategory: string,
        public productCategoryId: string
    ) {}
}

export class Cart extends AuditField {
    constructor(
        public _id: string,
        public date: string,
        public clientId: string | null,
        public shopId: string,
        public total: number,
        public nbArticles: number,
        public details: CartDetail[],
        createdAt: Date,
        updatedAt: Date
    ) {
        super(createdAt, updatedAt);
    }
}
