package cse.rnsit.studentgrievance.service;

import cse.rnsit.studentgrievance.entity.Account;
import cse.rnsit.studentgrievance.repository.AccountRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Transactional
    public void save(Account account) {
        accountRepository.save(account);
    }

    public Optional<Account> getByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    public Optional<Long> getIdByEmail(String email) {
        return accountRepository.findIdByEmail(email);
    }

    public Optional<Boolean> isAdmin(String email) {
        return accountRepository.findIsAdminByEmail(email);
    }

    @Transactional
    public void deleteByEmail(String email) {
        accountRepository.deleteByEmail(email);
    }
}
