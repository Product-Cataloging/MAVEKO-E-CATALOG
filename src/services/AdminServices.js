import { apiUrl } from "../environment";

export const get = async (path) => {
  const response = await fetch(`${apiUrl}/${path}`);
  return await response.json();
};

export const add = async (supplier, path) => {
  const response = await fetch(`${apiUrl}/${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ payload: supplier }),
  });
  console.log(response.json);
  return await response.json();
};

export const edit = async (id, supplier, path) => {
  const response = await fetch(`${apiUrl}/${path}/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ payload: supplier }),
  });
  return await response.json();
};
