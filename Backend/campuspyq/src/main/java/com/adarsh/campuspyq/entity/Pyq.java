package com.adarsh.campuspyq.entity;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
 
@Entity
@Table(name = "pyqs")
public class Pyq {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String filePath;

     @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    public Pyq() {
    }

    public Pyq(String title, Integer year, String fileName, String filePath, Subject subject) {
        this.title = title;
        this.year = year;
        this.fileName = fileName;
        this.filePath = filePath;
        this.subject = subject;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }
}