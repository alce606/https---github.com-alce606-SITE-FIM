import http from '../common/http-common';
const API_URL = "usuario/";

const findAll = () => {
    return http.mainInstance.get(API_URL + 'findAll');
};

const findById = (id) => {
    return http.mainInstance.get(API_URL + `findById/${id}`);
};

const signup = (nome, email, password) => {
    return http.mainInstance.post(API_URL + "signup", {
        nome,
        email,
        password,
    });
};

const signin = async (email, senha) => {
    const response = await http.mainInstance
        .post(API_URL + "login", {
            email,
            senha,
        });
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const create = data => {
    const formData = new FormData();
    formData.append('nome', data.nome);
    formData.append('email', data.email);
    formData.append('nivelAcesso', data.nivelAcesso);

    return http.mainInstance.post(API_URL + "create", formData);
};

const update = (id, data) => {
    const formData = new FormData();
    formData.append('nome', data.nome);
    formData.append('email', data.email);
    formData.append('nivelAcesso', data.nivelAcesso);
    if (data.foto) {
        formData.append('foto', data.foto);
    }
    return http.multipartInstance.put(API_URL + `update/${id}`, formData);
};

const alterar = (id, data) => {
    const formData = new FormData();
    formData.append('nome', data.nome);
    formData.append('email', data.email);
    formData.append('nivelAcesso', data.nivelAcesso);
    if (data.foto) {
        formData.append('foto', data.foto);
    }
    return http.multipartInstance.put(API_URL + `alterar/${id}`, formData);
};

const inativar = (id) => {
    return http.mainInstance.put(API_URL + `inativar/${id}`);
};

const reativar = (id) => {
    return http.mainInstance.put(API_URL + `reativar/${id}`);
};

const alterarSenha = (id, data) => {
    const formData = new FormData();
    formData.append('senha', data.senha);
 
    return http.mainInstance.put(API_URL + `alterarSenha/${id}`, formData);
};

const findByNome = nome => {
    return http.mainInstance.get(API_URL + `findByNome?nome=${nome}`);
};

const deletar = (id) => {
    return http.mainInstance.delete(API_URL + `delete/${id}`);
};

const loginAdmin = async (email, senha) => {
    const response = await http.mainInstance
        .post(API_URL + "loginAdmin", {
            email,
            senha,
        });
    if (response.data) {
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminUser", JSON.stringify(response.data));
    }
    return response.data;
};

const isAdminAuthenticated = () => {
    return !!localStorage.getItem('adminToken');
};

const isAuthenticated = () => {
    return !!localStorage.getItem('user');
};



const forgotPassword = async (email) => {
    return http.mainInstance.post(API_URL + "forgotPassword", { email });
};

const UsuarioService = {
    findAll,
    findById,
    signup,
    signin,
    loginAdmin,
    logout,
    getCurrentUser,
    create,
    update,
    alterar,
    inativar,
    reativar,
    alterarSenha,
    forgotPassword,
    isAdminAuthenticated,
    isAuthenticated,
    findByNome,
    deletar,
}

export default UsuarioService;