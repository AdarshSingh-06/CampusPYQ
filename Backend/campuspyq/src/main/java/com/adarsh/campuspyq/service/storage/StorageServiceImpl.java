package com.adarsh.campuspyq.service.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class StorageServiceImpl implements StorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public String storeFile(MultipartFile file) {

        try {

            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            Path filePath = uploadPath.resolve(fileName);

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return fileName;

        } catch (IOException e) {
            throw new RuntimeException("Could not store file", e);
        }
    }
   @Override
public Resource loadFile(String fileName) {

    try {

        Path path = Paths.get(uploadDir).resolve(fileName);

        System.out.println("================================");
        System.out.println("Upload Dir : " + uploadDir);
        System.out.println("File Name  : " + fileName);
        System.out.println("Full Path  : " + path.toAbsolutePath());
        System.out.println("Exists     : " + Files.exists(path));
        System.out.println("================================");

        Resource resource = new UrlResource(path.toUri());

        if (resource.exists() && resource.isReadable()) {
            return resource;
        }

        throw new RuntimeException("File not found");

    } catch (Exception e) {
        throw new RuntimeException("File not found", e);
    }
}
}