package com.example.staffservice.controller;

import com.example.staffservice.model.Staff;
import com.example.staffservice.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/staff")
public class StaffController {
    @Autowired
    private StaffService staffService;

    @PostMapping
    public Staff saveStaff(@RequestBody Staff staff) {
        return staffService.saveStaff(staff);
    }

    @GetMapping
    public List<Staff> getAllStaff() {
        return staffService.getAllStaff();
    }

    @GetMapping("/{id}")
    public Staff getStaffById(@PathVariable Long id) {
        return staffService.getStaffById(id);
    }

    @PutMapping("/{id}")
    public Staff updateStaff(@PathVariable Long id,
                             @RequestBody Staff staff) {
        return staffService.updateStaff(id, staff);
    }

    @DeleteMapping("/{id}")
    public String deleteStaff(@PathVariable Long id) {
        staffService.deleteStaff(id);
        return "Staff deleted successfully!";
    }
}