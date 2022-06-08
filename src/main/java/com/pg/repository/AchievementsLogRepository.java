package com.pg.repository;

import com.pg.model.Achievements;
import com.pg.model.AchievementsLog;
import com.pg.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AchievementsLogRepository extends JpaRepository<AchievementsLog, Long> {
    AchievementsLog findByUserAndAchievements(User user, Achievements achievements);

    List<AchievementsLog> findAllByUserOrderByAchievements(User user);
}
