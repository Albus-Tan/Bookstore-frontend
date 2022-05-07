import localStorage from "localStorage";

export default {
    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },
    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    },
    clearUser() {
        localStorage.removeItem("user");
    },
    getUserId() {
        return JSON.parse(localStorage.getItem("user")).user_id;
    },
}

