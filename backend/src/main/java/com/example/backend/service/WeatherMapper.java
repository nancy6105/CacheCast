package com.example.backend.service;


import java.time.LocalDateTime;

import com.example.backend.dto.OpenWeatherResponse;
import com.example.backend.entity.Weather;

public class WeatherMapper {

    public static Weather toEntity(OpenWeatherResponse dto){
        Weather weather = new Weather();
        weather.setCity(dto.getName());
        weather.setExternalCityId(dto.getId());
        weather.setTemperature(dto.getMain().getTemp());
        weather.setHumidity(dto.getMain().getHumidity());
        weather.setDescription(dto.getWeather().get(0).getDescription());
        weather.setFetchedAt(LocalDateTime.now());

        return weather;
    }
}
