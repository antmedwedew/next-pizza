import { useEffect, useState } from 'react';
import { Ingredient } from '@prisma/client';
import { Api } from '@/shared/services/api-client';

interface ReturnFilterIngredients {
  ingredients: Ingredient[];
  isLoadingIngredients: boolean;
}

export const useFilterIngredients = (): ReturnFilterIngredients => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState<boolean>(true);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setIsLoadingIngredients(true);
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingIngredients(false);
      }
    }

    fetchIngredients();
  }, []);

  return {
    ingredients,
    isLoadingIngredients,
  };
};
