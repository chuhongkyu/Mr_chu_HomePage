export const getParam = (key) => {
    const querystring = window.location.search;
    const params = new URLSearchParams(querystring);

    return params.get(key);
};