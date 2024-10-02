import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { ingredientsSelector } from '../../slices/ingredients-slice/ingredients-slice';
import { useLocation, useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */

  const { getIngredientsSelector } = ingredientsSelector;
  const ingredients = useSelector(getIngredientsSelector);

  const { id } = useParams<{ id: string }>();

  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
