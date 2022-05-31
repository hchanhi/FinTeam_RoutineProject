package com.pg.controller;

import com.pg.service.PushNotificationService;
import io.netty.util.Constant;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class PushApiController {

    /*
     * 푸시 알람 요청
     * @param title
     * @param body
     * @throws IOException
     */
    @PostMapping("/fcm")
    public ResponseEntity<?> reqFcm(
            @RequestParam(required = true) String title,
            @RequestParam(required = true) String body
    ) {

        log.info("** title : {}",title);
        log.info("** body : {}",body);

        CommResponse res = new CommResponse();

        try {

            PushNotificationService.sendCommonMessage(title, body);
//            res.setCdResult(Constant.SUCCESS);

        } catch(Exception e) {
            log.error(e.getMessage());
//            res.setCdResult(Constant.FAILED);
            res.setMsgResult("처리중 에러 발생");
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.ok(res);
    }

    @Data
    public class CommResponse {
        private String cdResult;
        private String msgResult;
    }


}