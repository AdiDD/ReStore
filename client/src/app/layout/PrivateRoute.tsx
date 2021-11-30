import { Navigate } from "react-router";
import { useAppSelector } from "../store/configureStore";

const PrivateRoute = ({ children } : any) => {
    const { user } = useAppSelector(state => state.account);
    return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;