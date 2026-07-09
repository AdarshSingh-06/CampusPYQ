package com.adarsh.campuspyq.controller;

import com.adarsh.campuspyq.entity.Pyq;
import com.adarsh.campuspyq.service.PyqService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pyqs")

public class PyqController {

    private final PyqService pyqService;

    public PyqController(PyqService pyqService) {
        this.pyqService = pyqService;
    }

    @PostMapping
    public Pyq savePyq(@RequestBody Pyq pyq) {
        return pyqService.savePyq(pyq);
    }

    @GetMapping
    public List<Pyq> getAllPyqs() {
        return pyqService.getAllPyqs();
    }

    @GetMapping("/{id}")
    public Pyq getPyq(@PathVariable Long id) {
        return pyqService.getPyqById(id);
    }

    @DeleteMapping("/{id}")
    public void deletePyq(@PathVariable Long id) {
        pyqService.deletePyq(id);
    }
}