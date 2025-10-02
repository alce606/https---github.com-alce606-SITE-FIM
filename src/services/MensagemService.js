import React, { useEffect, useState } from 'react';
import MensagemService from './services/MensagemService';

const ListaMensagens = () => {
    const [mensagens, setMensagens] = useState([]);

    useEffect(() => {
        MensagemService.findAll()
            .then(response => {
                setMensagens(response.data); // ou response.data se estiver retornando um JSON
            })
            .catch(error => {
                console.error("Erro ao carregar mensagens", error);
            });
    }, []);

    return (
        <div>
            <h1>Mensagens</h1>
            <ul>
                {mensagens.map(mensagem => (
                    <li key={mensagem.id}>{mensagem.texto}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListaMensagens;
