package com.adarsh.campuspyq.service;

import com.adarsh.campuspyq.entity.Semester;
import com.adarsh.campuspyq.repository.SemesterRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SemesterService {

    private final SemesterRepository semesterRepository;

    public SemesterService(SemesterRepository semesterRepository) {
        this.semesterRepository = semesterRepository;
    }

    public Semester saveSemester(Semester semester) {
        return semesterRepository.save(semester);
    }

    public List<Semester> getAllSemesters() {
        return semesterRepository.findAll();
    }

    public Semester getSemesterById(Long id) {
        return semesterRepository.findById(id).orElse(null);
    }

    public List<Semester> getSemestersByBranch(Long branchId) {
        return semesterRepository.findByBranchId(branchId);
    }

    public void deleteSemester(Long id) {
        semesterRepository.deleteById(id);
    }
    public Semester updateSemester(Long id, Semester updatedSemester) {

    Semester semester = semesterRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Semester not found"));

    semester.setSemesterNumber(updatedSemester.getSemesterNumber());

    return semesterRepository.save(semester);
}
}