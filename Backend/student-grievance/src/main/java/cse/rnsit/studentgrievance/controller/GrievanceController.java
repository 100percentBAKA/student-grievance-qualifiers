package cse.rnsit.studentgrievance.controller;

import cse.rnsit.studentgrievance.entity.Grievance;
import cse.rnsit.studentgrievance.service.GrievanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@SuppressWarnings("unused")
@RestController
@RequestMapping("/api/grievance")
public class GrievanceController {

    @Autowired
    private GrievanceService grievanceService;

    @PostMapping("/add")
    public ResponseEntity<Object> addGrievance(@RequestBody Grievance grievance) {
        grievance.setDate(Date.valueOf(LocalDate.now()));
        grievance.setTime(Time.valueOf(LocalTime.now()));
        grievanceService.save(grievance);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getGrievance(@PathVariable long id) {
        Optional<Grievance> grievanceOptional = grievanceService.getGrievance(id);
        return grievanceOptional
                .<ResponseEntity<Object>>
                        map(grievance -> new ResponseEntity<>(grievance, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }

    @GetMapping("/student/{student_email}")
    public ResponseEntity<Object> getGrievancesByStudent(@PathVariable String student_email) {
        List<Object> grievanceList = grievanceService.getAllByStudentEmail(student_email);
        if(!grievanceList.isEmpty()) return new ResponseEntity<>(grievanceList, HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/popular")
    public ResponseEntity<Object> getByPopularity() {
        List<Object> grievanceList = grievanceService.getByPopularity();
        return new ResponseEntity<>(grievanceList, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteGrievance(@PathVariable long id) {
        grievanceService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/increment/{id}")
    public ResponseEntity<Object> updatePopularity(@PathVariable long id) {
        grievanceService.updatePopularity(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
