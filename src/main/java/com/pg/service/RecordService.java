package com.pg.service;

import com.pg.model.Record;
import com.pg.model.User;
import com.pg.repository.RecordRepository;
import com.pg.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class RecordService {
    private final RecordRepository recordRepository;

    private final UserRepository userRepository;

    @Transactional
    public Record saveRecord(int continuity, int maxContinuity, String nickname) {
        User user = userRepository.findByNickname(nickname);
        Record record = recordRepository.findRecordByUser(user);
        if(record == null) {
            record = new Record();
            record.setUser(user);
        }
        record.setContinuity(continuity);
        record.setMaxContinuity(maxContinuity);
        recordRepository.save(record);

        return record;
    }

    public List<Record> ranking() {
        return recordRepository.recordRanking();
    }
}
