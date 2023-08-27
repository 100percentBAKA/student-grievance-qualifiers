package cse.rnsit.studentgrievance.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String first_name;
    private String last_name;
    private boolean is_admin;

    @Column(unique = true)
    private String email;
    private String password;
}
