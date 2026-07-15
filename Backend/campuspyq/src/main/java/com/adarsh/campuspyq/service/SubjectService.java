package com.adarsh.campuspyq.service;

import com.adarsh.campuspyq.entity.Subject;
import com.adarsh.campuspyq.repository.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepository;

    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public Subject saveSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public Subject getSubjectById(Long id) {
        return subjectRepository.findById(id).orElse(null);
    }

    public Subject findById(Long id) {
        return subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));
    }

    // NEW METHOD
    public List<Subject> getSubjectsBySemester(Long semesterId) {
        return subjectRepository.findBySemesterId(semesterId);
    }

    public void deleteSubject(Long id) {
        subjectRepository.deleteById(id);
    }
    public Subject updateSubject(Long id, Subject updatedSubject) {

    Subject subject = subjectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Subject not found"));

    subject.setSubjectName(updatedSubject.getSubjectName());

    return subjectRepository.save(subject);
}
}