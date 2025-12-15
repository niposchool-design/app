import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
import { useIsAuthenticated } from '../../hooks/useAuth';
export function PublicRoute({ children, redirectTo = '/alunos' }) {
    const isAuthenticated = useIsAuthenticated();
    const location = useLocation();
    if (isAuthenticated) {
        const from = location.state?.from?.pathname || redirectTo;
        return _jsx(Navigate, { to: from, replace: true });
    }
    return _jsx(_Fragment, { children: children });
}
export default PublicRoute;
