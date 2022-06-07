package com.pg.controller;

import com.pg.model.TakingLog;
import com.pg.service.TakingLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TakingLogController {
    final private TakingLogService takingLogService;

    @PostMapping("/supplements/check")
    public TakingLog supplementsCheck(@RequestBody HashMap<String,String> params){
        String nickname = params.get("nickname");
        String supplementName = params.get("supplementName");

        return takingLogService.addTakingLog(nickname, supplementName);
    }

    @DeleteMapping("/supplements/uncheck")
    public void supplementsUncheck(@RequestBody HashMap<String,String> params){
        String nickname = params.get("nickname");
        String supplementsName = params.get("supplementName");

        takingLogService.deleteTakingLog(nickname, supplementsName);
    }
}
