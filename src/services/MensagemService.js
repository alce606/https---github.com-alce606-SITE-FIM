// src/services/MensagemService.js

import http from '../common/http-common';

const API_URL = 'mensagem/';

const findAll = () => {
    return http.mainInstance.get(`${API_URL}findAll`);
};

const findById = (id) => {
    return http.mainInstance.get(`${API_URL}findById/${id}`);
};

const save = (mensagem) => {
    return http.mainInstance.post(`${API_URL}save`, mensagem);
};

const MensagemService = {
    findAll,
    findById,
    save
};

export default MensagemService;
