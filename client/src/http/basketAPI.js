import { $authHost } from "./index";

export const fetchOneBasket = async (email) => {
    const { data } = await $authHost.get("api/basket/" + email);

  return data;
};

export const putInBasket = async (basket) => {
  const { data } = await $authHost.post("api/basket", basket);
  return data;
};

export const deleteFromBasket = async (email, product) => {
  const { data } = await $authHost.delete("api/basket/" + email +'/'+ product);
  return data;
};

export const deleteProductFromBasket = async (email, product) => {
  const { data } = await $authHost.delete("api/basket/all/" + email +'/'+ product);
  return data;
};


export const deleteAllFromBasket = async (email) => {
  const { data } = await $authHost.delete("api/basket/" + email);
  return data;
};