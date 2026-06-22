package com.example.bookingservice.service.impl;

import com.example.bookingservice.model.Booking;
import com.example.bookingservice.repository.BookingRepository;
import com.example.bookingservice.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.web.client.RestTemplate;
import java.time.LocalDate;
import com.example.bookingservice.model.Notification;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public Booking saveBooking(Booking booking) {

        Booking savedBooking = bookingRepository.save(booking);

        Notification notification = new Notification();

        notification.setRecipient(savedBooking.getCustomerName());
        notification.setMessage("Your booking has been confirmed");
        notification.setType("BOOKING");
        notification.setStatus("SENT");
        notification.setSentDate(LocalDate.now().toString());

        restTemplate.postForObject(
                "http://localhost:8086/api/notifications",
                notification,
                Notification.class
        );

        return savedBooking;
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    @Override
    public Booking updateBooking(Long id, Booking booking) {

        Booking existingBooking = bookingRepository.findById(id).orElse(null);

        if (existingBooking != null) {

            existingBooking.setCustomerName(booking.getCustomerName());
            existingBooking.setTourId(booking.getTourId());
            existingBooking.setBookingDate(booking.getBookingDate());
            existingBooking.setNumberOfPeople(booking.getNumberOfPeople());
            existingBooking.setStatus(booking.getStatus());

            return bookingRepository.save(existingBooking);
        }

        return null;
    }

    @Override
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}