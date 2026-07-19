export const login = () => {
    sessionStorage.setItem("loggedIn", "true");
};

export const logout = () => {
    sessionStorage.removeItem("loggedIn");
};

export const isLoggedIn = () => {
    return sessionStorage.getItem("loggedIn") === "true";
};