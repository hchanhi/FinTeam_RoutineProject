package com.pg.repository;

import com.pg.model.Record;
import com.pg.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecordRepository extends JpaRepository<Record, Long> {
    Record findRecordByUser(User user);

    @Query(value="select * from record order by continuity desc limit 5", nativeQuery = true)
    List<Record> recordRanking();

    @Query(value="select * from record order by max_continuity desc limit 5",nativeQuery = true )
    List<Record> recordMaxRanking();
}
