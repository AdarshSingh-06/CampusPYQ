package com.adarsh.campuspyq.repository;

import com.adarsh.campuspyq.entity.Semester;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SemesterRepository extends JpaRepository<Semester, Long> {

    List<Semester> findByBranchId(Long branchId);

}