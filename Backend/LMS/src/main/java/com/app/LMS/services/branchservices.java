package com.app.LMS.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.LMS.entity.branchentity;
import com.app.LMS.repositories.branchrepositories;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class branchservices {

    @Autowired
    private branchrepositories branchRepository;

    public List<String> getUniqueSnames() {
        return branchRepository.findDistinctSname();
    }

    public List<String> getCnameBySname(String Sname) {
        return branchRepository.findCnameBySname(Sname);
    }

    public List<Object[]> getBranchaddByCname(String cname) {
        return branchRepository.findBranchaddByCname(cname);
    }

    
    public void addBranch(branchentity branch) {
        branchRepository.save(branch);
       
    }
  
    public List<branchentity> getAllBranches(){
    	return branchRepository.findAll();
    }

    
    
    public void deleteBranchByCname(String Cname) {
        branchRepository.deleteByCname(Cname);
    }
    

}
