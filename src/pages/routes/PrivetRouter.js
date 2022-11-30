import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../shared/Loading/Loading';

const PrivetRouter = ({children}) => {
    const location = useLocation();
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <Loading />
    }
    if (user) {
        return children
    }
    return <Navigate to="/login" state={{from:location}} replace />
}
export default PrivetRouter;