export const get = (key: string): string | null => {
    return localStorage.getItem(key);
}

export const set = (key: string, value: string): void => {
    localStorage.removeItem(key);
    localStorage.setItem(key, value);
}

export const clear = () => {
    localStorage.clear();
}