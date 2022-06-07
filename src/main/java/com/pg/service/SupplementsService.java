package com.pg.service;

import com.pg.model.Supplements;
import com.pg.model.User;
import com.pg.repository.SupplementsRepository;
import com.pg.repository.TakingLogRepository;
import com.pg.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SupplementsService {
    final private SupplementsRepository supplementsRepository;
    final private UserRepository userRepository;
    final private TakingLogRepository takingLogRepository;

    public Supplements addSupplements(String supplementsName, int quantity, int singleDose, String slot, String nickname){
        User user = userRepository.findByNickname(nickname);
        Supplements supplements = new Supplements();
        supplements.setSupplementsName(supplementsName);
        supplements.setQuantity(quantity);
        supplements.setQuantityLeft(quantity);
        supplements.setSingleDose(singleDose);
        supplements.setSlot(slot);
        supplements.setUser(user);
        supplementsRepository.save(supplements);

        return supplements;
    }

    public List<Supplements> findAllByUser(String nickname){
        User user = userRepository.findByNickname(nickname);
        return supplementsRepository.findAllByUser(user);
    }

    public void deleteById(Long id){
        takingLogRepository.deleteAllBySupplementsId(id);
        supplementsRepository.deleteById(id);
    }

}
