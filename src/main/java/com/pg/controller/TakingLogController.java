package com.pg.controller;

import com.pg.model.Supplements;
import com.pg.model.TakingLog;
import com.pg.service.TakingLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TakingLogController {
    final private TakingLogService takingLogService;

    @PostMapping("/supplements/check")
    public TakingLog supplementsCheck(@RequestBody HashMap<String,String> params){
        String nickname = params.get("nickname");
        String supplementsName = params.get("supplementsName");

        return takingLogService.addTakingLog(nickname, supplementsName);
    }

    @GetMapping("/supplements/eatenlist")
    public List<Supplements> eantenList(String nickname){
        return takingLogService.selectEatenSupplements(nickname);
    }

    @GetMapping("/supplements/takinglog")
    public List<Integer> takingLoglistByUser(String nickname){
        return takingLogService.selectTakingLogByUser(nickname);
    }

    @DeleteMapping("/supplements/uncheck")
    public void supplementsUncheck(@RequestBody HashMap<String,String> params){
        String nickname = params.get("nickname");
        String supplementsName = params.get("supplementsName");

        takingLogService.deleteTakingLog(nickname, supplementsName);
    }
}
