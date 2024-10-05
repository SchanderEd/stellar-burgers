import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { FC, useEffect } from 'react';
import {
  getOrdersSelectors,
  getOrdersFeed
} from '../../slices/orders-slice/orders-slice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { feed } = useSelector(getOrdersSelectors);
  const orders: TOrder[] = feed;
  const dispatch = useDispatch();

  const handleGetFeeds = () => {
    dispatch(getOrdersFeed());
  };

  useEffect(() => {
    handleGetFeeds();
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
