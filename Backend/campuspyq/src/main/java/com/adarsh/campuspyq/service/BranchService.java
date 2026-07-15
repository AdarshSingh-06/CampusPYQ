package com.adarsh.campuspyq.service;

import com.adarsh.campuspyq.entity.Branch;
import com.adarsh.campuspyq.repository.BranchRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BranchService {

    private final BranchRepository branchRepository;

    public BranchService(BranchRepository branchRepository) {
        this.branchRepository = branchRepository;
    }

    public Branch saveBranch(Branch branch) {
        return branchRepository.save(branch);
    }

    public List<Branch> getAllBranches() {
        return branchRepository.findAll();
    }

    public Branch getBranchById(Long id) {
        return branchRepository.findById(id).orElse(null);
    }

    public void deleteBranch(Long id) {
        branchRepository.deleteById(id);
    }
    public Branch updateBranch(Long id, Branch updatedBranch) {

    Branch branch = branchRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Branch not found"));

    branch.setBranchName(updatedBranch.getBranchName());

    return branchRepository.save(branch);
}
}
