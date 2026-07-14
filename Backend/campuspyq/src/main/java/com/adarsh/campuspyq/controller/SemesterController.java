package com.adarsh.campuspyq.controller;

import com.adarsh.campuspyq.entity.Semester;
import com.adarsh.campuspyq.entity.Subject;
import com.adarsh.campuspyq.service.SemesterService;
import com.adarsh.campuspyq.service.SubjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/semesters")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5173"
})
public class SemesterController {

    private final SemesterService semesterService;
    private final SubjectService subjectService;

    public SemesterController(SemesterService semesterService,
                              SubjectService subjectService) {
        this.semesterService = semesterService;
        this.subjectService = subjectService;
    }

  @PostMapping
public Semester saveSemester(@RequestBody Semester semester) {

    System.out.println("==================================");
    System.out.println("Semester Number = " + semester.getSemesterNumber());

    if (semester.getBranch() == null) {
        System.out.println("Branch = NULL");
    } else {
        System.out.println("Branch ID = " + semester.getBranch().getId());
    }

    System.out.println("==================================");

    return semesterService.saveSemester(semester);
    }
    
    @GetMapping
    public List<Semester> getAllSemesters() {
        return semesterService.getAllSemesters();
    }

    @GetMapping("/{id}")
    public Semester getSemester(@PathVariable Long id) {
        return semesterService.getSemesterById(id);
    }
    @GetMapping("/branch/{branchId}")
public List<Semester> getSemestersByBranch(@PathVariable Long branchId) {

    return semesterService.getSemestersByBranch(branchId);

}

    @GetMapping("/{semesterId}/subjects")
    public List<Subject> getSubjectsBySemester(@PathVariable Long semesterId) {
        return subjectService.getSubjectsBySemester(semesterId);
    }

    @DeleteMapping("/{id}")
    public void deleteSemester(@PathVariable Long id) {
        semesterService.deleteSemester(id);
    }
}