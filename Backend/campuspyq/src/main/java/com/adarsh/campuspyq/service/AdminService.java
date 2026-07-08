package com.adarsh.campuspyq.service;

import com.adarsh.campuspyq.entity.Admin;
import com.adarsh.campuspyq.repository.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Admin getAdminByUsername(String username) {
        return adminRepository.findByUsername(username);
    }
}