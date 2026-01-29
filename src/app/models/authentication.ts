export interface ApiReponse<T = null>{
    status: number,
    message: string,
    data?: T,
    errors?: string[]
};

export interface LoginResponse{
    accessToken: string,
    refreshToken: string
};