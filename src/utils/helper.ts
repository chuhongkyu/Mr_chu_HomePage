export const getParam = <T>(key:string): T | null => {
    const querystring = window.location.search;
    const params = new URLSearchParams(querystring);

    const value = params.get(key);

    if (value === null) {
        return null;
    }

    return value as unknown as T;
};