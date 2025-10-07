package br.itb.projeto.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import br.itb.projeto.app.model.entity.Presenca;
import br.itb.projeto.app.model.entity.Usuario;
import br.itb.projeto.app.model.entity.Evento;
import br.itb.projeto.app.model.repository.PresencaRepository;
import br.itb.projeto.app.model.repository.UsuarioRepository;
import br.itb.projeto.app.model.repository.EventoRepository;

@Service
public class PresencaService {

    private final PresencaRepository presencaRepository;
    private final UsuarioRepository usuarioRepository;
    private final EventoRepository eventoRepository;

    public PresencaService(PresencaRepository presencaRepository, 
                          UsuarioRepository usuarioRepository,
                          EventoRepository eventoRepository) {
        this.presencaRepository = presencaRepository;
        this.usuarioRepository = usuarioRepository;
        this.eventoRepository = eventoRepository;
    }

    public Presenca findById(long id) {
        Optional<Presenca> presenca = presencaRepository.findById(id);
        return presenca.orElse(null);
    }

    public List<Presenca> findAll() {
        return presencaRepository.findAll();
    }

    @Transactional
    public Presenca save(Presenca presenca) {
        // Buscar as entidades completas do banco
        Usuario usuario = usuarioRepository.findById(presenca.getUsuario().getId()).orElse(null);
        Evento evento = eventoRepository.findById(presenca.getEvento().getId()).orElse(null);
        
        if (usuario == null || evento == null) {
            throw new RuntimeException("Usuário ou Evento não encontrado");
        }
        
        presenca.setUsuario(usuario);
        presenca.setEvento(evento);
        
        return presencaRepository.save(presenca);
    }

    public List<Presenca> findByEvento(long eventoId) {
        return presencaRepository.findByEventoId(eventoId);
    }
}