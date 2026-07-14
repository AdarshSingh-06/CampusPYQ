package com.adarsh.campuspyq.entity;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "subjects")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String subjectName;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "semester_id", nullable = false)
    private Semester semester;

    @JsonManagedReference
    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL)
    private List<Pyq> pyqs = new ArrayList<>();

    public Subject() {
    }

    public Subject(String subjectName, Semester semester) {
        this.subjectName = subjectName;
        this.semester = semester;
    }

    public Long getId() {
        return id;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public Semester getSemester() {
        return semester;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }

    public List<Pyq> getPyqs() {
        return pyqs;
    }

    public void setPyqs(List<Pyq> pyqs) {
        this.pyqs = pyqs;
    }
}