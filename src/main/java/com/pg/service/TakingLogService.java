package com.pg.service;

import com.pg.model.Supplements;
import com.pg.model.TakingLog;
import com.pg.model.User;
import com.pg.repository.SupplementsRepository;
import com.pg.repository.TakingLogRepository;
import com.pg.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.LongStream;

@Service
@RequiredArgsConstructor
@Transactional
@Log4j2
public class TakingLogService {
    private final TakingLogRepository takingLogRepository;
    private final UserRepository userRepository;
    private final SupplementsRepository supplementsRepository;

    public TakingLog addTakingLog(String nickname, String supplementsName) {
        User user = userRepository.findByNickname(nickname);
        Supplements supplements = supplementsRepository.findBySupplementsNameAndUser(supplementsName, user);
        TakingLog takingLog = new TakingLog();
        takingLog.setUser(user);
        takingLog.setSupplements(supplements);
        takingLogRepository.save(takingLog);

        int quantityLeft = supplements.getQuantityLeft() - supplements.getSingleDose();
        supplements.setQuantityLeft(quantityLeft);
        supplementsRepository.save(supplements);

        return takingLog;
    }

    public List<Supplements> selectEatenSupplements(String nickname){
        LocalDateTime startDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(0,0,0));
        LocalDateTime endDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23,59,59));

        User user = userRepository.findByNickname(nickname);
        List<Supplements> eatenSupplementsList = new ArrayList<>();
        takingLogRepository.findAllBycreatedDateIsBetweenAndUser(startDatetime, endDatetime, user).forEach(e -> eatenSupplementsList.add(e.getSupplements()));

        return eatenSupplementsList;
    }

    public List<Integer> selectTakingLogByUser(String nickname) {
        User user = userRepository.findByNickname(nickname);

        LocalDateTime start = user.getCreatedDate();
        LocalDateTime end = LocalDateTime.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        List<String> eatenDates = takingLogRepository.findByUserOrderByCreatedDate(user).stream().map(e -> e.getCreatedDate().format(formatter)).collect(Collectors.toSet())
                .stream().collect(Collectors.toList());

        long numOfDaysBetween = ChronoUnit.DAYS.between(start, end);
        List<String> dates =  LongStream.iterate(0, i -> i + 1)
                .limit(numOfDaysBetween)
                .mapToObj(i -> start.plusDays(i)).collect(Collectors.toList())
                .stream().map(e -> e.format(formatter)).collect(Collectors.toList());

        List<Integer> pillList = new ArrayList<>();

        for(int i = 0; i < dates.size(); i++){
            if(eatenDates.contains(dates.get(i))){
                pillList.add(1);
            } else pillList.add(0);
        }

        return pillList;
    }

    public void deleteTakingLog(String nickname, String supplementsName) {
        User user = userRepository.findByNickname(nickname);
        Supplements supplements = supplementsRepository.findBySupplementsNameAndUser(supplementsName, user);

        supplements.setQuantityLeft(supplements.getQuantityLeft() + supplements.getSingleDose());
        supplementsRepository.save(supplements);

        TakingLog takingLog = takingLogRepository.findByUserAndSupplements(user, supplements);
        takingLogRepository.delete(takingLog);
    }
}
