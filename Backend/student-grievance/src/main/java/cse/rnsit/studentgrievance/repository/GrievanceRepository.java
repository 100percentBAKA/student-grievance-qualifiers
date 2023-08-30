package cse.rnsit.studentgrievance.repository;

import cse.rnsit.studentgrievance.entity.Grievance;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GrievanceRepository extends JpaRepository<Grievance, Long> {
    @Query("SELECT g.id, g.title, g.date, g.time FROM Grievance g WHERE g.student.email =:student_email")
    List<Object> findAllByStudentEmail(@Param("student_email") String student_email);

    @Query("SELECT g.id, g.title, g.date, g.time FROM Grievance g ORDER BY g.popularity DESC LIMIT 10")
    List<Object> findByPopularity();

    @Transactional
    @Modifying
    @Query("UPDATE Grievance g SET g.popularity = g.popularity + 1 WHERE g.id =:id")
    void updatePopularity(@Param("id") long id);
}
