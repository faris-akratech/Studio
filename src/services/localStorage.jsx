export const clearLocalStorage = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("value");
    localStorage.removeItem("org");
    localStorage.removeItem("orgCount");
    localStorage.removeItem("orgIndex");
}