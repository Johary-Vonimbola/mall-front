export interface ShopResponse {
    id: string;
    name: string;
    isActive: boolean;
    category: string;
    categoryId: string;
    logo?: string;
    _id?: string;
}

export interface ShopCategoryResponse{
    id: string,
    name: string
};