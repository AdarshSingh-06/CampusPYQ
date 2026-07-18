package com.adarsh.campuspyq.controller;

import com.adarsh.campuspyq.dto.UploadPyqRequest;
import com.adarsh.campuspyq.entity.Pyq;
import com.adarsh.campuspyq.service.PyqService;
import com.adarsh.campuspyq.service.storage.StorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/pyqs")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "http://localhost:5173",
    "https://campus-pyq.vercel.app"
})
public class PyqController {

    private final PyqService pyqService;
    private final StorageService storageService;

    public PyqController(PyqService pyqService, StorageService storageService) {
        this.pyqService = pyqService;
        this.storageService = storageService;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Pyq uploadPyq(
            @RequestParam("title") String title,
            @RequestParam("year") Integer year,
            @RequestParam("subjectId") Long subjectId,
            @RequestParam("file") MultipartFile file
    ) {

        UploadPyqRequest request = new UploadPyqRequest();
        request.setTitle(title);
        request.setYear(year);
        request.setSubjectId(subjectId);

        return pyqService.uploadPyq(request, file);
    }

    @GetMapping
    public List<Pyq> getAllPyqs() {
        return pyqService.getAllPyqs();
    }

    // NEW API
    @GetMapping("/subject/{subjectId}")
    public List<Pyq> getPyqsBySubject(@PathVariable Long subjectId) {
        return pyqService.getPyqsBySubjectId(subjectId);
    }

    @GetMapping("/{id}")
    public Pyq getPyq(@PathVariable Long id) {
        return pyqService.getPyqById(id);
    }

    @DeleteMapping("/{id}")
    public void deletePyq(@PathVariable Long id) {
        pyqService.deletePyq(id);
    }
        @GetMapping("/view/{id}")
public ResponseEntity<Resource> viewFile(@PathVariable Long id) {

    Pyq pyq = pyqService.getPyqById(id);

    if (pyq == null) {
        return ResponseEntity.notFound().build();
    }

   Resource resource = storageService.loadFile(pyq.getFilePath());

    return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_PDF)
            .header(HttpHeaders.CONTENT_DISPOSITION,
                    "inline; filename=\"" + pyq.getFileName() + "\"")
            .body(resource);
}
           @GetMapping("/download/{id}")
public ResponseEntity<Resource> downloadFile(@PathVariable Long id) {

    Pyq pyq = pyqService.getPyqById(id);

    if (pyq == null) {
        return ResponseEntity.notFound().build();
    }

    Resource resource = storageService.loadFile(pyq.getFilePath());

    return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_PDF)
            .header(
                    HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"" + pyq.getTitle() + ".pdf\""
            )
            .body(resource);
}  
    @PutMapping("/{id}")
public Pyq updatePyq(@PathVariable Long id,
                     @RequestBody Pyq updatedPyq) {

    return pyqService.updatePyq(id, updatedPyq);
}
}