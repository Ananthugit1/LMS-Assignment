package com.app.LMS.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.LMS.entity.branchentity;
import com.app.LMS.repositories.branchrepositories;
import com.app.LMS.services.branchservices;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/branches")
public class branchcontroller {

    @Autowired
    private branchservices branchService;
    
    @Autowired
    private branchrepositories repo;

    @GetMapping("/uniqueSnames")
    public List<String> getUniqueSnames() {
        return branchService.getUniqueSnames();
    }

    @GetMapping("/getCname/{Sname}")
    public List<String> getCnameBySname(@PathVariable String Sname) {
        return branchService.getCnameBySname(Sname);
    }

    @GetMapping("/getBranchaddByCname/{cname}")
    public List<Object[]> getBranchaddByCname(@PathVariable String cname) {
        return branchService.getBranchaddByCname(cname);
    }

    @PostMapping("/addBranch")
    public ResponseEntity<?> addBranch(@RequestBody branchentity branch) {
        try {
            branchService.addBranch(branch);
            return ResponseEntity.ok("Branch added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding branch");
        }
    }
    
    @DeleteMapping("/deleteByCname/{Cname}")
    public ResponseEntity<?> deleteBranchByCname(@PathVariable String Cname) {
        try {
            branchService.deleteBranchByCname(Cname);
            return ResponseEntity.ok("Branches with city name '" + Cname + "' deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting branches by city name");
        }
    }
   
//    @GetMapping("/getAllBranches")
//    public List<branchentity> getAllBranches(){
//    	return branchService.getAllBranches();
//    }
}
