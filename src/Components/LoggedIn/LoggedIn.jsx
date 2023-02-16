import { Navigate } from "react-router-dom"

const LoggedIn = ({ user, children }) => {
    if (localStorage.getItem('user') || user) {
        return <Navigate to={"/admin"} replace />
    }
    return children
};

export default LoggedIn;