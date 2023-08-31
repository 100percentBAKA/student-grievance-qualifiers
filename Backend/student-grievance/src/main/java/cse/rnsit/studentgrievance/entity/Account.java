package cse.rnsit.studentgrievance.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
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

    @JsonIgnoreProperties({"student", "faculty"})
    @OneToMany(mappedBy = "student", fetch = FetchType.LAZY)
    private List<Grievance> grievances;
}
