import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import {
  getOrders,
  getOrdersSelectors
} from '../../slices/orders-slice/orders-slice';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const { orders } = useSelector(getOrdersSelectors);

  return <ProfileOrdersUI orders={orders} />;
};
