package com.example.tourmanagementservice.repository;

import com.example.tourmanagementservice.model.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {

}