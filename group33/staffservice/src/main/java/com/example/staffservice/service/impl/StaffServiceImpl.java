package com.example.staffservice.service.impl;

import com.example.staffservice.model.Staff;
import com.example.staffservice.repository.StaffRepository;
import com.example.staffservice.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.web.client.RestTemplate;
import java.time.LocalDate;
import com.example.staffservice.model.Notification;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private StaffRepository staffRepository;

    @Override
    public Staff saveStaff(Staff staff) {

        Staff savedStaff = staffRepository.save(staff);

        Notification notification = new Notification();

        notification.setRecipient(savedStaff.getFullName());
        notification.setMessage("Staff member added successfully");
        notification.setType("STAFF");
        notification.setStatus("SENT");
        notification.setSentDate(LocalDate.now().toString());

        restTemplate.postForObject(
                "http://localhost:8086/api/notifications",
                notification,
                Notification.class
        );

        return savedStaff;
    }

    @Override
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    @Override
    public Staff getStaffById(Long id) {
        return staffRepository.findById(id).orElse(null);
    }

    @Override
    public Staff updateStaff(Long id, Staff staff) {

        Staff existingStaff = staffRepository.findById(id).orElse(null);

        if (existingStaff != null) {

            existingStaff.setFullName(staff.getFullName());
            existingStaff.setPosition(staff.getPosition());
            existingStaff.setDepartment(staff.getDepartment());
            existingStaff.setTaskAssigned(staff.getTaskAssigned());
            existingStaff.setSchedule(staff.getSchedule());

            return staffRepository.save(existingStaff);
        }

        return null;
    }

    @Override
    public void deleteStaff(Long id) {
        staffRepository.deleteById(id);
    }
}