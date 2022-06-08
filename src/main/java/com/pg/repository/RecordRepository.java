package com.pg.repository;

import com.pg.model.Record;
import com.pg.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record, Long> {
    Record findRecordByUser(User user);
}
