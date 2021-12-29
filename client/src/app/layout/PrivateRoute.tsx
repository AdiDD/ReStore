import { Navigate } from "react-router";
import { useAppSelector } from "../store/configureStore";

const PrivateRoute = ({ children, roles } : any) => {
    const { user } = useAppSelector(state => state.account);
    return user ? 
    (roles ? (!roles?.some((r: any) => user.roles?.includes(r)) ? <Navigate to="/catalog" /> : children) : children) : 
    <Navigate to="/login" />;
}

export default PrivateRoute;