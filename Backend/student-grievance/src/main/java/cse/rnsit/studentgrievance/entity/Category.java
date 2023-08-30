package cse.rnsit.studentgrievance.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String category_name;

    @Column(columnDefinition = "INTEGER DEFAULT 0")
    private int popularity;

    @JsonIgnoreProperties({"categories"})
    @JsonBackReference
    @ManyToMany(mappedBy = "categories", fetch = FetchType.LAZY)
    private List<Grievance> grievances;
}
