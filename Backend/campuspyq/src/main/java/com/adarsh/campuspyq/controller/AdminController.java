package com.adarsh.campuspyq.controller;

import com.adarsh.campuspyq.dto.LoginRequest;
import com.adarsh.campuspyq.dto.LoginResponse;
import com.adarsh.campuspyq.entity.Admin;
import com.adarsh.campuspyq.service.AdminService;
import com.adarsh.campuspyq.dto.ChangePasswordRequest;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/save")
    public Admin saveAdmin(@RequestBody Admin admin) {
        return adminService.saveAdmin(admin);
    }

    @GetMapping("/all")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping("/{username}")
    public Admin getAdmin(@PathVariable String username) {
        return adminService.getAdminByUsername(username);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        boolean valid = adminService.validateLogin(
                request.getUsername(),
                request.getPassword()
        );

        if (valid) {
            return new LoginResponse(true, "Login Successful");
        }

        return new LoginResponse(false, "Invalid Username or Password");
    }
    @PostMapping("/change-password")
public LoginResponse changePassword(
        @RequestBody ChangePasswordRequest request) {

    boolean changed = adminService.changePassword(
            request.getUsername(),
            request.getCurrentPassword(),
            request.getNewPassword(),
            request.getConfirmPassword()
    );

    if (changed) {
        return new LoginResponse(true, "Password Changed Successfully");
    }

    return new LoginResponse(false, "Current Password is Incorrect or New Password does not match.");
}
}