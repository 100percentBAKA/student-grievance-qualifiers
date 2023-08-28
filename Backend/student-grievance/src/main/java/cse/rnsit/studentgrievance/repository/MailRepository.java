package cse.rnsit.studentgrievance.repository;

import cse.rnsit.studentgrievance.entity.Mail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MailRepository extends JpaRepository<Mail, Long> {
    Optional<Mail> findByEmail(String email);
    void deleteByEmail(String email);
}
