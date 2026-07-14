package com.adarsh.campuspyq.repository;

import com.adarsh.campuspyq.entity.Pyq;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PyqRepository extends JpaRepository<Pyq, Long> {

    List<Pyq> findBySubjectId(Long subjectId);

}