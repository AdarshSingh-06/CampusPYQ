package com.adarsh.campuspyq.service;

import com.adarsh.campuspyq.entity.Pyq;
import com.adarsh.campuspyq.repository.PyqRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PyqService {

    private final PyqRepository pyqRepository;

    public PyqService(PyqRepository pyqRepository) {
        this.pyqRepository = pyqRepository;
    }

    public Pyq savePyq(Pyq pyq) {
        return pyqRepository.save(pyq);
    }

    public List<Pyq> getAllPyqs() {
        return pyqRepository.findAll();
    }

    public Pyq getPyqById(Long id) {
        return pyqRepository.findById(id).orElse(null);
    }

    public void deletePyq(Long id) {
        pyqRepository.deleteById(id);
    }
}