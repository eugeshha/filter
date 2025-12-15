export interface ValidationErrors {
  name?: string;
  price?: string;
}

export const validateForm = (name: string, price: string): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!name || name.trim().length < 2) {
    errors.name = 'Название должно содержать минимум 2 символа';
  }

  const priceNum = parseFloat(price);
  if (!price || isNaN(priceNum) || priceNum <= 0) {
    errors.price = 'Цена должна быть числом больше 0';
  }

  return errors;
};
