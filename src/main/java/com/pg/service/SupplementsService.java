package com.pg.service;

import com.pg.model.Supplements;
import com.pg.model.User;
import com.pg.repository.SupplementsRepository;
import com.pg.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupplementsService {
    final private SupplementsRepository supplementsRepository;
    final private UserRepository userRepository;

    public Supplements addSupplements(String supplementsName, int quantity, int singleDose, String nickname){
        User user = userRepository.findByNickname(nickname);
        Supplements supplements = new Supplements();
        supplements.setSupplementsName(supplementsName);
        supplements.setQuantity(quantity);
        supplements.setSingleDose(singleDose);
        supplements.setUser(user);
        supplementsRepository.save(supplements);

        return supplements;
    }

    public List<Supplements> findAllByUser(String nickname){
        User user = userRepository.findByNickname(nickname);
        return supplementsRepository.findAllByUser(user);
    }

}
