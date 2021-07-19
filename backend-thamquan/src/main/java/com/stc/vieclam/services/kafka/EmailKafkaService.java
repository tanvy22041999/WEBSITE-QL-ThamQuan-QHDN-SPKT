package com.stc.vieclam.services.kafka;

import com.stc.vieclam.dtos.kafka.FileEmail;
import com.stc.vieclam.dtos.kafka.TextEmail;
import org.springframework.scheduling.annotation.Async;

/**
 * Created by: IntelliJ IDEA
 * User      : thangpx
 * Date      : 4/11/21
 * Time      : 14:20
 * Filename  : EmailKafkaService
 */
public interface EmailKafkaService {
    @Async
    void sendTextEmail(TextEmail textEmail);

    @Async
    void sendTemplateEmail(TextEmail textEmail);

    @Async
    void sendFileEmail(FileEmail fileEmail);
}
