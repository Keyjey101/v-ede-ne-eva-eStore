import { $authHost, $host } from "./index";

export const createProduct = async (product) => {
  const { data } = await $authHost.post("api/product", product);
  return data;
};

export const updateProduct = async (id, product) => {
  const { data } = await $authHost.put("api/product/" + id, product);
  return data;
};

export const fetchProducts = async (typeId, veganId, page, limit = 6) => {
  const { data } = await $host.get("api/product", {
    params: { typeId, veganId, page, limit },
  });

  return data;
};

export const fetchOneProduct = async (id) => {
  const { data } = await $host.get("api/product/" + id);

  return data;
};

export const deleteOneProduct = async (id) => {
  const { data } = await $authHost.delete("api/product/" + id);

  return data;
};

export const deleteAllProducts = async (id) => {
  const { data } = await $authHost.delete("api/product");

  return data;
};

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const deleteType = async (id) => {
  const { data } = await $authHost.delete("api/type/" + id);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");

  return data;
};

export const createVegan = async (vegan) => {
  const { data } = await $authHost.post("api/vegan", vegan);
  return data;
};

export const fetchVegans = async () => {
  const { data } = await $host.get("api/vegan");

  return data;
};
export const deleteVegan = async (id) => {
  const { data } = await $authHost.delete("api/vegan/" + id);
  return data;
};
