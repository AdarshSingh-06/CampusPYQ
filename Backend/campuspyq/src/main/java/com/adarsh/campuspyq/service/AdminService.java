package com.adarsh.campuspyq.service;

import com.adarsh.campuspyq.entity.Admin;
import com.adarsh.campuspyq.repository.AdminRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository adminRepository,
                        PasswordEncoder passwordEncoder) {

        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Save Admin (Password Encrypt)
    public Admin saveAdmin(Admin admin) {

        admin.setPassword(passwordEncoder.encode(admin.getPassword()));

        return adminRepository.save(admin);
    }

    // Get All Admins
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Find By Username
    public Admin getAdminByUsername(String username) {
        return adminRepository.findByUsername(username);
    }

    // Login Validation
    public boolean validateLogin(String username, String password) {

        Admin admin = adminRepository.findByUsername(username);

        if (admin == null) {
            return false;
        }

        return passwordEncoder.matches(password, admin.getPassword());
    }

}