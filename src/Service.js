import http from "./http-common";

const getAll = () => {
  return http.get("/myaction");
};

const get = id => {
  return http.get(`/myaction/${id}`);
};

const create = data => {
  return http.post("/myaction", data);
};

const update = (data) => {
  return http.put(`/myaction`, data);
};

const remove = (data)  => {
  return http.delete('http://localhost:4000/myaction', { data });
};


const signup = data => {
  return http.post("/signup", data);
};


export default {
  getAll,
  get,
  create,
  update,
  remove,
  signup
};
