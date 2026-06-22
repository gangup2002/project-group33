package com.example.crmservice.service.impl;

import com.example.crmservice.model.Customer;
import com.example.crmservice.repository.CustomerRepository;
import com.example.crmservice.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.web.client.RestTemplate;
import java.time.LocalDate;
import com.example.crmservice.model.Notification;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Customer saveCustomer(Customer customer) {

        Customer savedCustomer = customerRepository.save(customer);

        Notification notification = new Notification();

        notification.setRecipient(savedCustomer.getEmail());
        notification.setMessage("Customer profile created successfully");
        notification.setType("CRM");
        notification.setStatus("SENT");
        notification.setSentDate(LocalDate.now().toString());

        restTemplate.postForObject(
                "http://localhost:8086/api/notifications",
                notification,
                Notification.class
        );

        return savedCustomer;
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }

    @Override
    public Customer updateCustomer(Long id, Customer customer) {

        Customer existingCustomer =
                customerRepository.findById(id).orElse(null);

        if (existingCustomer != null) {

            existingCustomer.setFullName(customer.getFullName());
            existingCustomer.setEmail(customer.getEmail());
            existingCustomer.setPhone(customer.getPhone());
            existingCustomer.setPreferences(customer.getPreferences());
            existingCustomer.setFeedback(customer.getFeedback());

            return customerRepository.save(existingCustomer);
        }

        return null;
    }

    @Override
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}