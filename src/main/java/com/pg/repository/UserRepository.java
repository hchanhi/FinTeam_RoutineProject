package com.pg.repository;


import com.pg.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findById(Long id);
    User findByNickname(String nickname);
    Boolean existsByNickname(String nickname);
    Boolean existsByEmail(String email);

}