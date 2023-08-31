package cse.rnsit.studentgrievance.controller;

import cse.rnsit.studentgrievance.entity.Account;
import cse.rnsit.studentgrievance.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@SuppressWarnings("unused")
@RestController
@RequestMapping("/api/user")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody Account account) {
        try {
            accountService.save(account);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return ResponseEntity.internalServerError().body("some error");
        }
    }

    @GetMapping("/check/{email}")
    public ResponseEntity<Object> isEmailAvailable(@PathVariable String email) {
        try {
            return new ResponseEntity<>(
                    accountService.isEmailAvailable(email) == 0,
                    HttpStatus.OK
            );
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return ResponseEntity.internalServerError().body("some error");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> validateCredentials(@RequestBody Map<String, String> map) {
        try {
            Optional<String> passwordOptional = accountService.getPasswordByEmail(map.get("email"));
            if(passwordOptional.isPresent()) {
                if(passwordOptional.get().equals(map.get("password")))
                    return new ResponseEntity<>(true, HttpStatus.OK);
                else return new ResponseEntity<>(false, HttpStatus.OK);
            } else return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return ResponseEntity.internalServerError().body("some error");
        }
    }

    @GetMapping("/role/{email}")
    public ResponseEntity<Object> isAdmin(@PathVariable String email) {
        try {
            Optional<Boolean> roleOptional = accountService.isAdmin(email);
            return roleOptional.<ResponseEntity<Object>>map(
                            role -> new  ResponseEntity<>(role, HttpStatus.OK))
                    .orElseGet(() -> ResponseEntity.badRequest().body(false));
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
            if(accountOptional.isPresent()) {
                Account account = new Account();
                account.setId(accountOptional.get().getId());
                account.setEmail(accountOptional.get().getEmail());
                account.setFirst_name(accountOptional.get().getFirst_name());
                account.setLast_name(accountOptional.get().getLast_name());
                return new ResponseEntity<>(account, HttpStatus.OK);
            } else return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return ResponseEntity.internalServerError().body("some error");
        }
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<Object> deleteByEmail(@PathVariable String email) {
        try {
            accountService.deleteByEmail(email);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return ResponseEntity.badRequest().body("some error");
        }
    }
}
