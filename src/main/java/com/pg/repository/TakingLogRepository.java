package com.pg.repository;

import com.pg.model.Supplements;
import com.pg.model.TakingLog;
import com.pg.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TakingLogRepository extends JpaRepository<TakingLog, Long> {
    TakingLog findByUserAndSupplements(User user, Supplements supplements);

    @Transactional
    void deleteAllBySupplementsId(Long supplementsId);
}
