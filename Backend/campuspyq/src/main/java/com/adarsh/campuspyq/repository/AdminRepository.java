package com.adarsh.campuspyq.repository;

import com.adarsh.campuspyq.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    Admin findByUsername(String username);

} 