package br.itb.projeto.app.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.itb.projeto.app.model.entity.PasswordResetToken;
import br.itb.projeto.app.model.entity.Usuario;
import br.itb.projeto.app.model.repository.PasswordResetTokenRepository;
import br.itb.projeto.app.model.repository.UsuarioRepository;

@Service
public class PasswordResetService {

    @Autowired
    private PasswordResetTokenRepository tokenRepo;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public void solicitarReset(String email) {
        System.out.println("Solicitando reset para email: " + email);
        
        Usuario usuario = usuarioRepo.findByEmail(email);
        if (usuario == null) {
            throw new RuntimeException("Email não encontrado");
        }

        tokenRepo.deleteByEmail(email);

        String token = UUID.randomUUID().toString();
        LocalDateTime expiration = LocalDateTime.now().plusMinutes(15);

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setEmail(email);
        resetToken.setToken(token);
        resetToken.setExpiration(expiration);
        tokenRepo.save(resetToken);
        
        System.out.println("Token criado: " + token);

        String mensagem = "Seu código de recuperação é: " + token;
        emailService.enviarEmail(email, "Recuperação de Senha", mensagem);
        System.out.println("Email enviado com sucesso");
    }

    public boolean validarToken(String token) {
        System.out.println("Validando token: " + token);
        boolean valido = tokenRepo.findByToken(token)
            .filter(t -> t.getExpiration().isAfter(LocalDateTime.now()))
            .isPresent();
        System.out.println("Token válido: " + valido);
        return valido;
    }

    @Transactional
    public void redefinirSenha(String token, String novaSenha) {
        System.out.println("Iniciando redefinição de senha para token: " + token);
        
        PasswordResetToken resetToken = tokenRepo.findByToken(token)
            .orElseThrow(() -> new RuntimeException("Token inválido"));
        
        System.out.println("Token encontrado para email: " + resetToken.getEmail());

        if (resetToken.getExpiration().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expirado");
        }

        Usuario usuario = usuarioRepo.findByEmail(resetToken.getEmail());
        if (usuario == null) {
            throw new RuntimeException("Usuário não encontrado");
        }
        
        System.out.println("Usuário encontrado: " + usuario.getEmail());
        System.out.println("Senha antiga: " + usuario.getSenha());
        
        String senhaEncriptada = passwordEncoder.encode(novaSenha);
        usuario.setSenha(senhaEncriptada);
        usuarioRepo.save(usuario);
        
        System.out.println("Senha nova salva: " + senhaEncriptada);

        tokenRepo.delete(resetToken);
        System.out.println("Token deletado com sucesso");
    }
}