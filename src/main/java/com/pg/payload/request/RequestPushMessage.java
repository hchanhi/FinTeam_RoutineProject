package com.pg.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RequestPushMessage {

    MORNING_ALARM("건강한 하루의 시작!", "아침 영양제 드셨나요? 루틴을 기록해 주세요!"),
    LUNCH_ALARM("점심식사 하셨어요?", "영양제 드실 시간입니다!"),
    DINNER_ALARM("저녁약 드세요~", "영양제 먹고 기록할 시간~!")
    ;

    String title;
    String body;
}
