package com.adarsh.campuspyq.service.storage;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {

    String storeFile(MultipartFile file);

}