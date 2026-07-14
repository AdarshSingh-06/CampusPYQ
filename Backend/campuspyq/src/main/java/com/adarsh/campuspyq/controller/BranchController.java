package com.adarsh.campuspyq.controller;

import com.adarsh.campuspyq.entity.Branch;
import com.adarsh.campuspyq.entity.Semester;
import com.adarsh.campuspyq.service.BranchService;
import com.adarsh.campuspyq.service.SemesterService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/branches")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:5173"
})
public class BranchController {

    private final BranchService branchService;
    private final SemesterService semesterService;

    public BranchController(BranchService branchService,
                            SemesterService semesterService) {
        this.branchService = branchService;
        this.semesterService = semesterService;
    }

    @PostMapping
    public Branch saveBranch(@RequestBody Branch branch) {
        return branchService.saveBranch(branch);
    }

    @GetMapping
    public List<Branch> getAllBranches() {
        return branchService.getAllBranches();
    }

    @GetMapping("/{id}")
    public Branch getBranch(@PathVariable Long id) {
        return branchService.getBranchById(id);
    }

    // Get all semesters of a branch
    @GetMapping("/{branchId}/semesters")
    public List<Semester> getSemestersByBranch(@PathVariable Long branchId) {
        return semesterService.getSemestersByBranch(branchId);
    }

    @DeleteMapping("/{id}")
    public void deleteBranch(@PathVariable Long id) {
        branchService.deleteBranch(id);
    }
}