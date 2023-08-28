package cse.rnsit.studentgrievance.service;

import cse.rnsit.studentgrievance.entity.Mail;
import cse.rnsit.studentgrievance.repository.MailRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MailSenderService {

    @Autowired
    @SuppressWarnings("unused")
    private JavaMailSender mailSender;

    @Autowired
    @SuppressWarnings("unused")
    private MailRepository mailRepository;

    @Transactional
    public void save(Mail mail) {
        Optional<Mail> mailOptional = mailRepository.findByEmail(mail.getEmail());
        mailOptional.ifPresent(value -> delete(value.getEmail()));
        mailRepository.save(mail);
    }

    public Optional<Mail> getMail(String email) {
        return mailRepository.findByEmail(email);
    }

    public void sendEmail(String toEmail, String subject, String text) throws MailException {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        String fromEmail = "this.is.mohith4124@gmail.com";
        simpleMailMessage.setFrom(fromEmail);
        simpleMailMessage.setTo(toEmail);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(text);

        mailSender.send(simpleMailMessage);
    }

    @Transactional
    public void delete(String email) {
        mailRepository.deleteByEmail(email);
    }
}
