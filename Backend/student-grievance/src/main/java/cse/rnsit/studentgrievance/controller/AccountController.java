package cse.rnsit.studentgrievance.controller;

import cse.rnsit.studentgrievance.entity.Account;
import cse.rnsit.studentgrievance.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/save")
    public ResponseEntity<Object> registerUser(@RequestBody Account account) {
        try {
            accountService.save(account);
            return ResponseEntity.ok("registration successful");
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return ResponseEntity.badRequest().body("some error");
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<Object> getAccount(@PathVariable String email) {
        try {
            Optional<Account> accountOptional = accountService.getByEmail(email);
            return accountOptional.<ResponseEntity<Object>>map(
                    account -> new ResponseEntity<>(account, HttpStatus.OK))
                    .orElseGet(() -> ResponseEntity.badRequest().body("Invalid email")
                    );
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return ResponseEntity.badRequest().body("some error");
        }
    }

    @GetMapping("/id/{email}")
    public ResponseEntity<Object> getIdByEmail(@PathVariable String email) {
        try {
            Optional<Long> idOptional = accountService.getIdByEmail(email);
            return idOptional.<ResponseEntity<Object>>map(
                    id -> new ResponseEntity<>(id, HttpStatus.OK))
                    .orElseGet(() -> ResponseEntity.badRequest().body("Invalid email"));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return ResponseEntity.badRequest().body("some error");
        }
    }

    @GetMapping("/role/{email}")
    public ResponseEntity<Object> getRole(@PathVariable String email) {
        try {
            Optional<Boolean> roleOptional = accountService.isAdmin(email);
            return roleOptional.<ResponseEntity<Object>>map(
                    role -> new  ResponseEntity<>(role, HttpStatus.OK))
                    .orElseGet(() -> ResponseEntity.badRequest().body("Invalid email"));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return ResponseEntity.badRequest().body("some error");
        }
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Object> deleteByEmail(@PathVariable String email) {
        try {
            accountService.deleteByEmail(email);
            return ResponseEntity.ok("Delete Successful");
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return ResponseEntity.badRequest().body("some error");
        }
    }
}
