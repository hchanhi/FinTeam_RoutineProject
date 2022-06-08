package com.pg.controller;

import com.pg.model.Supplements;
import com.pg.model.TakingLog;
import com.pg.service.RecordService;
import com.pg.service.TakingLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TakingLogController {
    final private TakingLogService takingLogService;

    final private RecordService recordService;

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

    @GetMapping("/supplements/record")
    public Map<String, Integer> getContinuousDose(String nickname){
        List<Integer> pillList = takingLogService.selectTakingLogByUser(nickname);
        Map<String, Integer> record = new HashMap<>();
        int continuousDose = 0;
        int index = 0;
        for(int i = pillList.size() - 1; i >= 0; i--) {
            if(pillList.get(i) == 1) continuousDose++;
            else {
                index = i;
                break;
            }
        }

        int maxContinuousDose = continuousDose;
        int temp = 0;
        for(int i = index; i >= 0; i--) {
            if(pillList.get(i) == 1) temp++;
            else if(pillList.get(i) == 0 || i == 0){
                maxContinuousDose = temp > maxContinuousDose ? temp : maxContinuousDose;
                temp = 0;
            }
        }

        record.put("continuity", continuousDose);
        record.put("maxContinuity", maxContinuousDose);

        recordService.saveRecord(continuousDose, maxContinuousDose, nickname);

        return record;
    }

    @DeleteMapping("/supplements/uncheck")
    public void supplementsUncheck(@RequestBody HashMap<String,String> params){
        String nickname = params.get("nickname");
        String supplementsName = params.get("supplementsName");

        takingLogService.deleteTakingLog(nickname, supplementsName);
    }
}
