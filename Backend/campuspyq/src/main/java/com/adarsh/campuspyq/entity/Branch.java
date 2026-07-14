package com.adarsh.campuspyq.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "branches")
public class Branch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "branch_name", nullable = false, unique = true)
    private String branchName;

     @JsonManagedReference
    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL)
    private List<Semester> semesters = new ArrayList<>();

    public Branch() {
    }

    public Branch(String branchName) {
        this.branchName = branchName;
    }

    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
    this.id = id;
     }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public List<Semester> getSemesters() {
        return semesters;
    }

    public void setSemesters(List<Semester> semesters) {
        this.semesters = semesters;
    }
}