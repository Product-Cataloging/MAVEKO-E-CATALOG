import { apiUrl } from "../environment";

export const get = async () => {
  const response = await fetch(`${apiUrl}/suppliers`);
  return await response.json();
};

export const add = async (supplier) => {
  const response = await fetch(`${apiUrl}/suppliers`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ payload: supplier }),
  });
  console.log(response.json);
  return await response.json();
};

export const edit = async (id, supplier) => {
  const response = await fetch(`${apiUrl}/suppliers/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ payload: supplier }),
  });
  return await response.json();
};
