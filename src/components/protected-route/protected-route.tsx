import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../slices/user-slice/user-slice';

type TProtectedRoute = {
  forAuthorizedUsers?: boolean;
};

export const ProtectedRoute = ({
  forAuthorizedUsers = false
}: TProtectedRoute) => {
  const location = useLocation();
  const from = location.state?.from || '/';
  const { getUserSelectors } = userSelectors;
  const { isAuthorization } = useSelector(getUserSelectors);

  if (!forAuthorizedUsers && isAuthorization) {
    return <Navigate to={from} />;
  }

  if (forAuthorizedUsers && !isAuthorization) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return <Outlet />;
};
