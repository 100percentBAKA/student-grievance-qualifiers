package cse.rnsit.studentgrievance.controller;

import cse.rnsit.studentgrievance.entity.Mail;
import cse.rnsit.studentgrievance.service.MailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Random;

@SuppressWarnings("unused")
@RestController
@RequestMapping("/api/mail")
public class MailSenderController {

    @Autowired
    private MailSenderService mailSenderService;

    @PostMapping("/{toEmail}")
    public ResponseEntity<Object> sendOtp(@PathVariable String toEmail) {
        String subject = "OTP Verification";
        Random rand = new Random();
        String otp = String.valueOf( rand.nextInt(10000, 100000) );
        Mail mail = new Mail();
        mail.setEmail(toEmail);
        mail.setOtp(otp);

        try {
            mailSenderService.sendEmail(toEmail, subject, otp);
            mailSenderService.save(mail);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (MailException e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<Object> getOtp(@PathVariable String email) {
        Optional<Mail> mailOptional = mailSenderService.getMail(email);
        return mailOptional.<ResponseEntity<Object>>map
                (mail -> new ResponseEntity<>(mail, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }

    @DeleteMapping("/{email}")
    public void delete(@PathVariable String email) {
        mailSenderService.delete(email);
    }
}
