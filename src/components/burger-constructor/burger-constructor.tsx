import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getConstructor,
  resetConstructor
} from '../../slices/burger-constructor-slice/burger-constructor-slice';
import { useSelector, useDispatch } from '../../services/store';
import { getIsAuthorization } from '../../slices/user-slice/user-slice';
import { useNavigate } from 'react-router-dom';
import {
  getOrderRequest,
  getOrderData,
  createOrder,
  clearOrderData
} from '../../slices/order-slice/order-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const userAuthorization = useSelector(getIsAuthorization);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(getConstructor);

  const orderRequest = useSelector(getOrderRequest);

  const orderModalData = useSelector(getOrderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!userAuthorization) {
      return navigate('/login');
    }

    const ingredientsId = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );

    dispatch(
      createOrder([
        constructorItems.bun._id,
        ...ingredientsId,
        constructorItems.bun._id
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(clearOrderData());
    dispatch(resetConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
