export const getCurrentUrl = (path, params = []) => {
    let url = location.protocol + "//" + location.host + location.pathname;
    if (path) {
        url += '/' + path;
    }
    if (params.length > 0) {
        url += "?" + params.join("&");
    }
    return url;
}
