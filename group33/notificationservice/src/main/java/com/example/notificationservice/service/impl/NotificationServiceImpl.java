package com.example.notificationservice.service.impl;

import com.example.notificationservice.model.Notification;
import com.example.notificationservice.repository.NotificationRepository;
import com.example.notificationservice.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    @Override
    public Notification getNotificationById(Long id) {
        return notificationRepository.findById(id).orElse(null);
    }

    @Override
    public Notification updateNotification(Long id, Notification notification) {

        Notification existing =
                notificationRepository.findById(id).orElse(null);

        if (existing != null) {

            existing.setRecipient(notification.getRecipient());
            existing.setMessage(notification.getMessage());
            existing.setType(notification.getType());
            existing.setStatus(notification.getStatus());
            existing.setSentDate(notification.getSentDate());

            return notificationRepository.save(existing);
        }

        return null;
    }

    @Override
    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
}