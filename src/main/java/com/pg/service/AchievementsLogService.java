package com.pg.service;

import com.pg.model.Achievements;
import com.pg.model.AchievementsLog;
import com.pg.model.Supplements;
import com.pg.model.User;
import com.pg.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class AchievementsLogService {
    private final AchievementsRepository achievementsRepository;
    private final AchievementsLogRepository achievementsLogRepository;
    private final UserRepository userRepository;
    private final SupplementsRepository supplementsRepository;
    private final RecordRepository recordRepository;

    public List<AchievementsLog> saveAchievementsLog(String nickname) {
        User user = userRepository.findByNickname(nickname);
        Achievements achievements1 = achievementsRepository.findById(1L).get();
        Achievements achievements2 = achievementsRepository.findById(2L).get();
        Achievements achievements3 = achievementsRepository.findById(3L).get();
        List<AchievementsLog> list = new ArrayList<>();

        AchievementsLog achievementsLog1 = achievementsLogRepository.findByUserAndAchievements(user, achievements1);
        AchievementsLog achievementsLog2 = achievementsLogRepository.findByUserAndAchievements(user, achievements2);
        AchievementsLog achievementsLog3 = achievementsLogRepository.findByUserAndAchievements(user, achievements3);

        if(achievementsLog1 == null) {
            achievementsLog1 = new AchievementsLog();
            achievementsLog1.setUser(user);
            achievementsLog1.setAchievements(achievements1);
            achievementsLogRepository.save(achievementsLog1);
            list.add(achievementsLog1);
        }

        if(achievementsLog2 == null) {
            int count = supplementsRepository.findAllByUser(user).size();
            if(count >= achievements2.getNeedsCount()) {
                achievementsLog2 = new AchievementsLog();
                achievementsLog2.setUser(user);
                achievementsLog2.setAchievements(achievements2);
                achievementsLogRepository.save(achievementsLog2);
                list.add(achievementsLog2);
            }
        }

        if(achievementsLog3 == null) {
            int count = recordRepository.findRecordByUser(user).getMaxContinuity();
            if(count >= achievements3.getNeedsCount()) {
                achievementsLog3 = new AchievementsLog();
                achievementsLog3.setUser(user);
                achievementsLog3.setAchievements(achievements3);
                achievementsLogRepository.save(achievementsLog3);
                list.add(achievementsLog3);
            }
        }

        return list;
    }

    public Boolean[] getAchievementList(String nickname) {
        User user = userRepository.findByNickname(nickname);
        List<AchievementsLog> list = achievementsLogRepository.findAllByUserOrderByAchievements(user);
        Boolean[] returnList = new Boolean[9];
        Arrays.fill(returnList, false);
        for(int i = 0; i < list.size(); i++){
            returnList[i] = true;
        }
        return returnList;
    }


}
