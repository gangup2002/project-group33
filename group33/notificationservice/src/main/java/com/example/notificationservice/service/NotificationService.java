package com.example.notificationservice.service;

import com.example.notificationservice.model.Notification;

import java.util.List;

public interface NotificationService {

    Notification saveNotification(Notification notification);

    List<Notification> getAllNotifications();

    Notification getNotificationById(Long id);

    Notification updateNotification(Long id, Notification notification);

    void deleteNotification(Long id);
}