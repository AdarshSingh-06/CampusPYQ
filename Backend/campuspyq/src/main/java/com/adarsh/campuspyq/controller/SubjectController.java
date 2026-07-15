package com.adarsh.campuspyq.controller;

import com.adarsh.campuspyq.entity.Subject;
import com.adarsh.campuspyq.service.SubjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5173"
})
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @PostMapping
    public Subject saveSubject(@RequestBody Subject subject) {
        return subjectService.saveSubject(subject);
    }

    @GetMapping
    public List<Subject> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    // NEW API
    @GetMapping("/semester/{semesterId}")
    public List<Subject> getSubjectsBySemester(@PathVariable Long semesterId) {
        return subjectService.getSubjectsBySemester(semesterId);
    }

    @GetMapping("/{id}")
    public Subject getSubject(@PathVariable Long id) {
        return subjectService.getSubjectById(id);
    }
    @PutMapping("/{id}")
public Subject updateSubject(@PathVariable Long id,
                             @RequestBody Subject subject) {

    return subjectService.updateSubject(id, subject);
}

    @DeleteMapping("/{id}")
    public void deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubject(id);
    }
} 