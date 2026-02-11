import { ShopResponse } from "../models/shop";
import { User } from "../models/User";
import { get } from "./localStorage";

export function getUser(): User | null{
    const token = get('access_token');
    const payload = token?.split('.')[1];
    if(payload){
        const content = JSON.parse(atob(payload));
        return new User(content.id, content.name, content.role);
    }
    return null;
}

export function getCurrentShop(): ShopResponse|null{
    const currentShop = get('current_shop');
    if(currentShop){
        return JSON.parse(currentShop) as ShopResponse;
    }
    return null;
}