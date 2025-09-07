package com.example.backend.dto;

import java.util.List;
public class OpenWeatherResponse {
    
    private Long id;
    private String name;
    private Main main;
    private List<WeatherInfo> weather;
    
    public static class Main {
        private Double temp;
        private Integer humidity;

        public Double getTemp() {
            return temp;
        }
        public void setTemp(Double temp) {
            this.temp = temp;
        }
        public Integer getHumidity() {
            return humidity;
        }
        public void setHumidity(Integer humidity) {
            this.humidity = humidity;
        }
    }

    public static class WeatherInfo{
        private String description;

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Main getMain() {
        return main;
    }

    public void setMain(Main main) {
        this.main = main;
    }

    public List<WeatherInfo> getWeather() {
        return weather;
    }

    public void setWeather(List<WeatherInfo> weather) {
        this.weather = weather;
    }
    
}
