package cse.rnsit.studentgrievance.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "grievance")
public class Grievance {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "system-uuid")
    @GenericGenerator(name = "system-uuid")
    private long id;

    private String title;
    private String description;
    private int status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id")
    @JsonIgnore
    private Account student;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "grievance_faculty",
            joinColumns = @JoinColumn(name = "grievance_id"),
            inverseJoinColumns = @JoinColumn(name = "faculty_id")
    )
    private List<Account> faculty;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "grievance_category",
            joinColumns = @JoinColumn(name = "grievance_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> categories;
}