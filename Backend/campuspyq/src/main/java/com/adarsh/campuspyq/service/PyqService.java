package com.adarsh.campuspyq.service;

import com.adarsh.campuspyq.dto.UploadPyqRequest;
import com.adarsh.campuspyq.entity.Pyq;
import com.adarsh.campuspyq.entity.Subject;
import com.adarsh.campuspyq.repository.PyqRepository;
import com.adarsh.campuspyq.service.storage.StorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class PyqService {

    private final PyqRepository pyqRepository;
    private final SubjectService subjectService;
    private final StorageService storageService;

    public PyqService(PyqRepository pyqRepository,
                      SubjectService subjectService,
                      StorageService storageService) {
        this.pyqRepository = pyqRepository;
        this.subjectService = subjectService;
        this.storageService = storageService;
    }

    public Pyq uploadPyq(UploadPyqRequest request, MultipartFile file) {

        Subject subject = subjectService.findById(request.getSubjectId());

        String fileName = storageService.storeFile(file);

        Pyq pyq = new Pyq();

        pyq.setTitle(request.getTitle());
        pyq.setYear(request.getYear());
        pyq.setSubject(subject);

        pyq.setFileName(fileName);
        pyq.setFilePath("uploads/" + fileName);

        return pyqRepository.save(pyq);
    }

    public Pyq savePyq(Pyq pyq) {
        return pyqRepository.save(pyq);
    }

    public List<Pyq> getAllPyqs() {
        return pyqRepository.findAll();
    }

    public List<Pyq> getPyqsBySubjectId(Long subjectId) {
        return pyqRepository.findBySubjectId(subjectId);
    }

    public Pyq getPyqById(Long id) {
        return pyqRepository.findById(id).orElse(null);
    }

    public void deletePyq(Long id) {
        pyqRepository.deleteById(id);
    }
    
     public List<Pyq> getPyqsBySubject(Long subjectId) {
    return pyqRepository.findBySubjectId(subjectId);
    }

}