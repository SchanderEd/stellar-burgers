import '../../index.css';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info';
import { IngredientDetails } from '../ingredient-details';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../slices/ingredients-slice/ingredients-slice';
import { getUser } from '../../slices/user-slice/user-slice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);

  const closeModal = () => {
    navigate(backgroundLocation || '/');
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route element={<ProtectedRoute forAuthorizedUsers={false} />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute forAuthorizedUsers />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      <Routes>
        {backgroundLocation && (
          <>
            <Route
              path='/feed/:number'
              element={
                <Modal title='Заказ' onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route element={<ProtectedRoute forAuthorizedUsers />}>
              <Route
                path='/profile/orders/:number'
                element={
                  <Modal title='Заказ' onClose={closeModal}>
                    <OrderInfo />
                  </Modal>
                }
              />
            </Route>
            <Route
              path='/ingredients/:id'
              element={
                <Modal title='Ингредиент' onClose={closeModal}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
