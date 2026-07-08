package com.adarsh.campuspyq.controller;

import com.adarsh.campuspyq.entity.Admin;
import com.adarsh.campuspyq.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
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
}