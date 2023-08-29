package cse.rnsit.studentgrievance.repository;

import cse.rnsit.studentgrievance.entity.Grievance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GrievanceRepository extends JpaRepository<Grievance, Long> {
}
