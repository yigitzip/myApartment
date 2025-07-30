package com.example.demo.repo;

import com.example.demo.model.Flat;
import com.example.demo.model.User;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FlatRepo extends JpaRepository<Flat,Long> {


    Optional<Flat> findFlatById(Long id);

    List<Flat> findAllByUser(User user);

    List<Flat> findAllByUserAndIsPaidFalse(User user);

    List<Flat> findAllByUserAndIsPaidTrue(User user);


}
