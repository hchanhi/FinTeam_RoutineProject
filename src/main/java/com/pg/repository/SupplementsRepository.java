package com.pg.repository;

import com.pg.model.Supplements;
import com.pg.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplementsRepository extends JpaRepository<Supplements, Long> {
    List<Supplements> findAllByUser(User user);

    Supplements findSupplementsBySupplementsName(String supplementsName);

    void deleteAllByUser(User user);
}
