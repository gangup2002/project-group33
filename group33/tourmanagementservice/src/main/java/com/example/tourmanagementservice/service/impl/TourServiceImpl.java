package com.example.tourmanagementservice.service.impl;

import com.example.tourmanagementservice.model.Tour;
import com.example.tourmanagementservice.repository.TourRepository;
import com.example.tourmanagementservice.service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TourServiceImpl implements TourService {

    @Autowired
    private TourRepository tourRepository;

    @Override
    public Tour saveTour(Tour tour) {
        return tourRepository.save(tour);
    }

    @Override
    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    @Override
    public Tour getTourById(Long id) {
        return tourRepository.findById(id).orElse(null);
    }

    @Override
    public Tour updateTour(Long id, Tour tour) {

        Tour existingTour = tourRepository.findById(id).orElse(null);

        if (existingTour != null) {

            existingTour.setTourName(tour.getTourName());
            existingTour.setDestination(tour.getDestination());
            existingTour.setDuration(tour.getDuration());
            existingTour.setPrice(tour.getPrice());
            existingTour.setAvailability(tour.getAvailability());

            return tourRepository.save(existingTour);
        }

        return null;
    }

    @Override
    public void deleteTour(Long id) {
        tourRepository.deleteById(id);
    }
}