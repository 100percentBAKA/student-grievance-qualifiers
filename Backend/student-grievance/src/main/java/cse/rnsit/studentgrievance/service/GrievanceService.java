package cse.rnsit.studentgrievance.service;

import cse.rnsit.studentgrievance.entity.Grievance;
import cse.rnsit.studentgrievance.repository.GrievanceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GrievanceService {

    @SuppressWarnings("unused")
    @Autowired
    private GrievanceRepository grievanceRepository;

    @Transactional
    public void save(Grievance grievance) {
        grievanceRepository.save(grievance);
    }

    @Transactional
    @Modifying
    public void updatePopularity(long id) {
        grievanceRepository.updatePopularity(id);
    }

    public Optional<Grievance> getGrievance(long id) {
        return grievanceRepository.findById(id);
    }

    public List<Object> getAllByStudentEmail(String student_email) {
        return grievanceRepository.findAllByStudentEmail(student_email);
    }

    public List<Object> getByPopularity() {
        return grievanceRepository.findByPopularity();
    }

    @Transactional
    public void delete(long id) {
        grievanceRepository.deleteById(id);
    }
}
