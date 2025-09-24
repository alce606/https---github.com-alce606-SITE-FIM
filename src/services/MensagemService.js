import http from '../common/http-common';

const API_URL = "mensagem/";

// Teste de conexão com o backend
const test = () => {
    return http.mainInstance.get(API_URL + 'test');
};

// Buscar todas as mensagens
const findAll = () => {
    return http.mainInstance.get(API_URL + 'findAll');
};

// Buscar uma mensagem por ID
const findById = (id) => {
    return http.mainInstance.get(API_URL + `findById/${id}`);
};

// Enviar nova mensagem
const save = (mensagem) => {
    return http.mainInstance.post(API_URL + 'save', mensagem);
};

const MensagemService = {
    test,
    findAll,
    findById,
    save
};

export default MensagemService;
