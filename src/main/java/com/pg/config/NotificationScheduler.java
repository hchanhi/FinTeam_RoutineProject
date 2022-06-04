package com.pg.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.pg.payload.request.RequestPushMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.Arrays;

import static com.pg.payload.request.RequestPushMessage.*;

@Slf4j
@Service
@EnableScheduling
public class NotificationScheduler {

    @Value("${firebase.create.scoped}")
    String fireBaseCreateScoped;

    @Value("${firebase.topic}")
    String topic;

    private FirebaseMessaging instance;

    @PostConstruct
    public void firebaseSetting() throws IOException {
        GoogleCredentials googleCredentials = GoogleCredentials.fromStream(new ClassPathResource("firebase/pillgood-sdk.json").getInputStream())
                .createScoped((Arrays.asList(fireBaseCreateScoped)));
        FirebaseOptions secondaryAppConfig = FirebaseOptions.builder()
                .setCredentials(googleCredentials)
                .build();
        FirebaseApp app = FirebaseApp.initializeApp(secondaryAppConfig);
        this.instance = FirebaseMessaging.getInstance(app);
    }

    @Scheduled(cron = "0 0 09 * * ?")
    public void pushMorningAlarm() throws FirebaseMessagingException {
        log.info("아침 식사 알림");
        pushAlarm(MORNING_ALARM);
    }

    @Scheduled(cron = "0 0 13 * * ?")
    public void pushLunchAlarm() throws FirebaseMessagingException {
        log.info("점심 식사 알림");
        pushAlarm(LUNCH_ALARM);
    }


    @Scheduled(cron = "0 0 19 * * ?")
    public void pushDinnerAlarm() throws FirebaseMessagingException {
        log.info("저녁 식사 알림");
        pushAlarm(DINNER_ALARM);
    }

    private void pushAlarm(RequestPushMessage data) throws FirebaseMessagingException {
        Message message = getMessage(data);
        sendMessage(message);
    }

    private Message getMessage(RequestPushMessage data) {
        Notification notification = Notification.builder().setTitle(data.getTitle()).setBody(data.getBody()).build();
        Message.Builder builder = Message.builder();
        Message message = builder.setTopic(topic).setNotification(notification).build();
        return message;
    }

    public String sendMessage(Message message) throws FirebaseMessagingException {
        return this.instance.send(message);
    }
}
