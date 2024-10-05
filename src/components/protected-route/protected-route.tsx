import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getUserSelectors } from '../../slices/user-slice/user-slice';

type TProtectedRoute = {
  forAuthorizedUsers?: boolean;
};

export const ProtectedRoute = ({
  forAuthorizedUsers = false
}: TProtectedRoute) => {
  const location = useLocation();
  const from = location.state?.from || '/';
  const { isAuthorization } = useSelector(getUserSelectors);

  if (!forAuthorizedUsers && isAuthorization) {
    return <Navigate replace to={from} state={{ from: location }} />;
  }

  if (forAuthorizedUsers && !isAuthorization) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return <Outlet />;
};
