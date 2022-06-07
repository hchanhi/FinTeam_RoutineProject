package com.pg.repository;

import com.pg.model.Supplements;
import com.pg.model.TakingLog;
import com.pg.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TakingLogRepository extends JpaRepository<TakingLog, Long> {
    TakingLog findByUserAndSupplement(User user, Supplements supplements);
}
