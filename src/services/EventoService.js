import http from "../common/http-common";
const API_URL = "evento/";

const findAll = () => {
  return http.mainInstance.get(API_URL + "findAll");
};

const findById = id => {
  return http.mainInstance.get(API_URL + `findById/${id}`);
};

const create_ = (data) => {
  const payload = {
    ...data,
    categoria: { id: parseInt(data.categoria) }
  };

  return http.mainInstance.post(API_URL + "create", payload);
};


const create = (file, formData, usuario) => {
  const data = new FormData();

  data.append("file", file);
  data.append("nome", formData.nome);
  data.append("descricao", formData.descricao);
  data.append("localEvento", formData.localEvento);
  data.append("dataEvento", formData.dataEvento);
  data.append("horaEvento", formData.horaEvento);
  data.append("periodo", formData.periodo);
  data.append("precoEntrada", formData.precoEntrada);
  data.append("categoria.id", formData.categoria); 
  data.append("usuario.id", usuario.id); 

  return http.multipartInstance.post(API_URL + "create", data);
};


const alterar = (file, id, data) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('nome', data.nome);
  formData.append('descricao', data.descricao);
  formData.append('preco', data.preco);

  if (data.categoria.id === undefined) { // SE O USUÁRIO ALTEROU A "Categoria"
    formData.append('categoria', data.categoria.toString());
  } else { // SE O USUÁRIO NÃO ALTEROU A "Categoria"
    formData.append('categoria', data.categoria.id);
  }

  /*
    for (const key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    } 
  */
  return http.multipartInstance.put(API_URL + `alterar/${id}`, formData);
};


const inativar = (id) => {
  return http.multipartInstance.put(API_URL + `inativar/${id}`);
};

const reativar = (id) => {
  return http.multipartInstance.put(API_URL + `reativar/${id}`);
};

const EventoService = {
  findAll,
  findById,
  create,
  alterar,
  inativar,
  reativar,
};

export default EventoService;