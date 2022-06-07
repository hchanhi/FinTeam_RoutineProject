package com.pg.repository;

import com.pg.model.Supplements;
import com.pg.model.TakingLog;
import com.pg.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
public interface TakingLogRepository extends JpaRepository<TakingLog, Long> {
    TakingLog findByUserAndSupplements(User user, Supplements supplements);

    List<TakingLog> findAllBycreatedDateIsBetweenAndUser(LocalDateTime start, LocalDateTime end, User user);
}
