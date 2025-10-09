package br.itb.projeto.app.rest.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.itb.projeto.app.service.PasswordResetService;

@RestController
@RequestMapping("/senha")
@CrossOrigin(origins = "*")
public class PasswordResetController {

    @Autowired
    private PasswordResetService resetService;

    @PostMapping("/solicitar")
    public ResponseEntity<?> solicitar(@RequestParam(required = false) String email, @RequestBody(required = false) Map<String, String> body) {
        String emailFinal = email != null ? email : (body != null ? body.get("email") : null);
        System.out.println("Controller: Recebido pedido para email: " + emailFinal);
        try {
            resetService.solicitarReset(emailFinal);
            return ResponseEntity.ok("Código enviado para o e-mail.");
        } catch (Exception e) {
            System.out.println("Erro ao solicitar reset: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        }
    }

    @PostMapping("/validar")
    public ResponseEntity<?> validar(@RequestParam(required = false) String token, @RequestBody(required = false) Map<String, String> body) {
        String tokenFinal = token != null ? token : (body != null ? body.get("token") : null);
        System.out.println("Controller: Validando token: " + tokenFinal);
        try {
            boolean valido = resetService.validarToken(tokenFinal);
            return ResponseEntity.ok(valido ? "Token válido" : "Token inválido ou expirado");
        } catch (Exception e) {
            System.out.println("Erro ao validar token: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        }
    }

    @PostMapping("/redefinir")
    public ResponseEntity<?> redefinir(@RequestParam(required = false) String token, @RequestParam(required = false) String novaSenha, @RequestBody(required = false) Map<String, String> body) {
        String tokenFinal = token != null ? token : (body != null ? body.get("token") : null);
        String senhaFinal = novaSenha != null ? novaSenha : (body != null ? body.get("novaSenha") : null);
        
        System.out.println("Controller: Redefinindo senha para token: " + tokenFinal);
        System.out.println("Controller: Nova senha: " + senhaFinal);
        try {
            resetService.redefinirSenha(tokenFinal, senhaFinal);
            return ResponseEntity.ok("Senha redefinida com sucesso.");
        } catch (Exception e) {
            System.out.println("Erro ao redefinir senha: " + e.getMessage());
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        }
    }
}