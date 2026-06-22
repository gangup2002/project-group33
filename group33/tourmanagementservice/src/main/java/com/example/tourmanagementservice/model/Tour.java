package com.example.tourmanagementservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tours")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tourName;

    private String destination;

    private Integer duration;

    private Double price;

    private String availability;
}
