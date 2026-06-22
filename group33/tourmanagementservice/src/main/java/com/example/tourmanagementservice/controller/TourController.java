package com.example.tourmanagementservice.controller;

import com.example.tourmanagementservice.model.Tour;
import com.example.tourmanagementservice.service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/tours")
public class TourController {

    @Autowired
    private TourService tourService;

    @PostMapping
    public Tour saveTour(@RequestBody Tour tour) {
        return tourService.saveTour(tour);
    }

    @GetMapping
    public List<Tour> getAllTours() {
        return tourService.getAllTours();
    }

    @GetMapping("/{id}")
    public Tour getTourById(@PathVariable Long id) {
        return tourService.getTourById(id);
    }

    @PutMapping("/{id}")
    public Tour updateTour(@PathVariable Long id,
                           @RequestBody Tour tour) {
        return tourService.updateTour(id, tour);
    }

    @DeleteMapping("/{id}")
    public String deleteTour(@PathVariable Long id) {
        tourService.deleteTour(id);
        return "Tour deleted successfully!";
    }
}