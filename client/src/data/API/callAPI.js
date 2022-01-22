import { API_KEY, API_URL } from "../../config";

const init = {
  methods: "GET",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  cache: "force-cache",
};
export const getMovie = async (page) => {
  const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
  const data = await fetch(endpoint, init).then((result) => result.json());
  return data;
};
