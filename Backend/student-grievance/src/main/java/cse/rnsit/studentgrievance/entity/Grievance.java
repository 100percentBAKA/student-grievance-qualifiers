package cse.rnsit.studentgrievance.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.sql.Time;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private String description;
    private int status;
    private Date date;
    private Time time;

    @Column(columnDefinition = "INTEGER DEFAULT 0")
    private int popularity;

    @JsonIgnoreProperties({"grievances"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id")
    private Account student;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "grievance_faculty",
            joinColumns = @JoinColumn(name = "grievance_id"),
            inverseJoinColumns = @JoinColumn(name = "faculty_id")
    )
    private List<Account> faculty;

    @JsonIgnoreProperties({"grievances"})
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "grievance_category",
            joinColumns = @JoinColumn(name = "grievance_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> categories;
}