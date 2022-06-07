package com.pg.service;

import com.pg.model.Supplements;
import com.pg.model.TakingLog;
import com.pg.model.User;
import com.pg.repository.SupplementsRepository;
import com.pg.repository.TakingLogRepository;
import com.pg.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TakingLogService {
    private final TakingLogRepository takingLogRepository;
    private final UserRepository userRepository;
    private final SupplementsRepository supplementsRepository;

    public TakingLog addTakingLog(String nickname, String supplementsName) {
        User user = userRepository.findByNickname(nickname);
        Supplements supplements = supplementsRepository.findSupplementsBySupplementsName(supplementsName);

        supplements.setQuantityLeft(supplements.getQuantity() - supplements.getSingleDose());
        supplementsRepository.save(supplements);

        TakingLog takingLog = new TakingLog();
        takingLog.setUser(user);
        takingLog.setSupplements(supplements);
        takingLogRepository.save(takingLog);

        return takingLog;
    }

    public void deleteTakingLog(String nickname, String supplementsName) {
        User user = userRepository.findByNickname(nickname);
        Supplements supplements = supplementsRepository.findSupplementsBySupplementsName(supplementsName);

        supplements.setQuantityLeft(supplements.getQuantity() + supplements.getSingleDose());
        supplementsRepository.save(supplements);

        TakingLog takingLog = takingLogRepository.findByUserAndSupplements(user, supplements);
        takingLogRepository.delete(takingLog);
    }
}
