package com.adarsh.campuspyq.repository;

import com.adarsh.campuspyq.entity.Semester;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SemesterRepository extends JpaRepository<Semester, Long> {

}