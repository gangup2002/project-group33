package com.example.staffservice.model;

import lombok.Data;

@Data
public class Notification {

    private String recipient;
    private String message;
    private String type;
    private String status;
    private String sentDate;
}