export interface ShopResponse {
    id: string;
    name: string;
    isActive: boolean;
    category: string;
    categoryId: string;
    logo?: string;
}

export interface ShopCategoryResponse{
    id: string,
    name: string
};