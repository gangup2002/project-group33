package com.example.staffservice.service;

import com.example.staffservice.model.Staff;

import java.util.List;

public interface StaffService {

    Staff saveStaff(Staff staff);

    List<Staff> getAllStaff();

    Staff getStaffById(Long id);

    Staff updateStaff(Long id, Staff staff);

    void deleteStaff(Long id);
}