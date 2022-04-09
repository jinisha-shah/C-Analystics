const setAccessToken = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
}

const getAccessToken = (accessToken) => {
    return localStorage.getItem("accessToken", accessToken);
}

const removeToken = () =>{
    return localStorage.clear()
}
export { setAccessToken, getAccessToken, removeToken }
