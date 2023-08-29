package cse.rnsit.studentgrievance.entity;

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

    private int popularity;

    @ManyToMany(mappedBy = "categories", fetch = FetchType.LAZY)
    private List<Grievance> grievances;
}
