import http from "../http-common";

class UserDataService {
  getAll(id) {
    return http.get(`/users/${id}`);//id representa clientId
  }

  get(id) {
    return http.get(`/users/one/${id}`);
  }

  create(data) {
    return http.post(`/users`, data);
  }

  update( id, data) {
    return http.put(`/users/${id}`, data);
  }
  updateSenha( id, data) {
    return http.put(`/users/password/${id}`, data);
  }

  delete( id) {
    return http.delete(`/users/${id}`);
  }

  deleteAll(id) {
    return http.delete(`/users/all/${id}`);//id representa clientId
  }

  findByTitle(id,nome) {
    return http.get(`/users/${id}?nome=${nome}`);//id representa clientId
  }
}

export default new UserDataService();