package com.adarsh.campuspyq.controller;

import com.adarsh.campuspyq.entity.Semester;
import com.adarsh.campuspyq.service.SemesterService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/semesters")
@CrossOrigin("*")
public class SemesterController {

    private final SemesterService semesterService;

    public SemesterController(SemesterService semesterService) {
        this.semesterService = semesterService;
    }

    @PostMapping
    public Semester saveSemester(@RequestBody Semester semester) {
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

    @DeleteMapping("/{id}")
    public void deleteSemester(@PathVariable Long id) {
        semesterService.deleteSemester(id);
    }
}