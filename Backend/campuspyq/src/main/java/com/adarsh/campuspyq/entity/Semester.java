package com.adarsh.campuspyq.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "semesters")
public class Semester {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer semesterNumber;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @JsonManagedReference
    @OneToMany(mappedBy = "semester", cascade = CascadeType.ALL)
    private List<Subject> subjects = new ArrayList<>();

    public Semester() {
    }

    public Semester(Integer semesterNumber, Branch branch) {
        this.semesterNumber = semesterNumber;
        this.branch = branch;
    }

    public Long getId() {
        return id;
    }

    public Integer getSemesterNumber() {
        return semesterNumber;
    }

    public void setSemesterNumber(Integer semesterNumber) {
        this.semesterNumber = semesterNumber;
    }

    public Branch getBranch() {
        return branch;
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
    }

    public List<Subject> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<Subject> subjects) {
        this.subjects = subjects;
    }
}