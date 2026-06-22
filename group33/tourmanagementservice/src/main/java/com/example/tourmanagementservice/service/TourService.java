package com.example.tourmanagementservice.service;

import com.example.tourmanagementservice.model.Tour;

import java.util.List;

public interface TourService {

    Tour saveTour(Tour tour);

    List<Tour> getAllTours();

    Tour getTourById(Long id);

    Tour updateTour(Long id, Tour tour);

    void deleteTour(Long id);
}