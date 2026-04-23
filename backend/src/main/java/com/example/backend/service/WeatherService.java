package com.example.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.backend.dto.OpenWeatherResponse;
import com.example.backend.entity.Weather;
import com.example.backend.repository.WeatherRepository;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.TimeUnit;


import java.util.Optional;
@Service
public class WeatherService {
    
    @Value("${openweather.api.key}")
    private String apiKey;

    @Value("${openweather.api.url}")
    private String apiUrl;


    private final WeatherRepository weatherRepository;
    private final RedisTemplate<String,Object> redisTemplate;
    private final RestTemplate restTemplate;


    public WeatherService(WeatherRepository weatherRepository,RedisTemplate<String,Object> redisTemplate){

        this.weatherRepository = weatherRepository;
        this.redisTemplate = redisTemplate;
        this.restTemplate = new RestTemplate();
    }

    public Weather getWeather(String city){
        String cacheKey = "weather::" + city.toLowerCase();
        ValueOperations<String,Object> ops = redisTemplate.opsForValue();

        Weather cachedWeather = (Weather) ops.get(cacheKey);
        if(cachedWeather != null){
            System.out.println("Fetched from Redis Cache");
            return cachedWeather;
        }

        Optional<Weather> dbWeather = weatherRepository.findByCity(city);
        if (dbWeather.isPresent()) {
            System.out.println("Fetched From Database");
            ops.set(cacheKey, dbWeather.get(), 10, TimeUnit.MINUTES);
            return dbWeather.get();
        }
        String url = apiUrl +"?q=" + city + "&appid=" + apiKey + "&units=metric";
        OpenWeatherResponse response = restTemplate.getForObject(url, OpenWeatherResponse.class);

        if (response == null || response.getMain() == null) {
            throw new RuntimeException("Weather API failed for city: " + city);
        }

        Weather weather = new Weather();

        weather.setCity(response.getName());
        weather.setTemperature(response.getMain().getTemp());
        weather.setHumidity(response.getMain().getHumidity());
        weather.setDescription((response.getWeather() != null && !response.getWeather().isEmpty())? response.getWeather().get(0).getDescription():"No data");
        weather.setExternalCityId(response.getId());
        weather.setFetchedAt(LocalDateTime.now());
        weather.setWindSpeed(response.getWind() != null ? response.getWind().getSpeed() : 0);

        weatherRepository.save(weather);
        
        ops.set(cacheKey, weather, 10, TimeUnit.MINUTES);

        System.out.println("Fetched from API and stored in DB + Redis");
        return weather;
    }

}
