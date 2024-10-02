import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { FC, useEffect } from 'react';
import {
  ordersFeedSelectors,
  getOrdersFeed
} from '../../slices/orders-feed-slice/orders-feed-slice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { getOrdersFeedSelectors } = ordersFeedSelectors;
  const orders: TOrder[] = useSelector(getOrdersFeedSelectors);
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
