package com.adarsh.campuspyq.service.storage;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@Service
public class StorageServiceImpl implements StorageService {

    private final Cloudinary cloudinary;

    public StorageServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

   
   @Override
public String storeFile(MultipartFile file) {

    try {

        System.out.println("========== UPLOAD START ==========");
        System.out.println("Original File Name = " + file.getOriginalFilename());
        System.out.println("Content Type = " + file.getContentType());
        System.out.println("File Size = " + file.getSize());

        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                        "resource_type", "raw",
                        "use_filename", true,
                        "unique_filename", true,
                        "overwrite", false
                )
        );

        System.out.println("Upload Result = " + uploadResult);
        System.out.println("========== UPLOAD END ==========");

        return uploadResult.get("secure_url").toString();

    } catch (Exception e) {
        e.printStackTrace();
        throw new RuntimeException("Cloudinary Upload Failed", e);
    }
}
   
   
  @Override
public Resource loadFile(String fileUrl) {

    try {

        URL url = new URL(fileUrl);

        return new UrlResource(url);

    } catch (Exception e) {

        throw new RuntimeException("Could not load file", e);

    }
}
}