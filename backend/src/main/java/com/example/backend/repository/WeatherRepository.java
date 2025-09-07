package com.example.backend.repository;


import com.example.backend.entity.Weather;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WeatherRepository extends JpaRepository<Weather,Object>{
    Optional<Weather> findByCity(String city);
}
