package com.pg.controller;

import com.pg.model.AchievementsLog;
import com.pg.service.AchievementsLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AcheivementsController {
    private final AchievementsLogService achievementsLogService;

    @GetMapping("/supplements/addbadge")
    public void addbadge(String nickname){
        achievementsLogService.saveAchievementsLog(nickname);
    }

    @GetMapping("/supplements/badgelist")
    public Boolean[] badgelist(String nickname) {
        return achievementsLogService.getAchievementList(nickname);
    }
}
