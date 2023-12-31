package com.ayoub.workoutApp.service.impl;

import com.ayoub.workoutApp.model.Exercise;
import com.ayoub.workoutApp.service.ExerciseService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.data.domain.PageRequest;

import java.util.List;

@Service
public class ExerciseServiceImpl implements ExerciseService {
    private final RestClient restClient = RestClient.create();

    @Value("${api.url}")
    private String apiUrl;
    @Value("${api.key}")

    private String apiKey;
    @Value("${api.host}")

    private String apiHost;




    public List<Exercise> getRandomExercises(PageRequest pageRequest){

        String url = this.apiUrl + "?limit=" + pageRequest.getPageSize() + "&offset=" + pageRequest.getPageNumber();
        return restClient.get()
                .uri(url)
                .header("X-RapidAPI-Key", this.apiKey)
                .header("X-RapidAPI-Host", this.apiHost)
                .retrieve()
                .body(List.class);

    }


    @Override
    public Exercise getExerciseById(String id) {
        String url = this.apiUrl + "/exercise/" + id;

        return restClient.get()
                .uri(url)
                .header("X-RapidAPI-Key", this.apiKey)
                .header("X-RapidAPI-Host", this.apiHost)
                .retrieve()
                .body(Exercise.class);

    }

    @Override
    public List<Exercise> getExerciseByBodyPart(String bodyPart, PageRequest pageRequest) {
        String url = this.apiUrl + "/bodyPart/" + bodyPart +"?limit=" + pageRequest.getPageSize() + "&offset=" + pageRequest.getPageNumber();
        return restClient.get()
                .uri(url)
                .header("X-RapidAPI-Key", this.apiKey)
                .header("X-RapidAPI-Host", this.apiHost)
                .retrieve()
                .body(List.class);

    }

    @Override
    public List<Exercise> getExerciseByTarget(String target, PageRequest pageRequest) {
        String url = this.apiUrl + "/target/" + target +"?limit=" + pageRequest.getPageSize() + "&offset=" + pageRequest.getPageNumber();
        return restClient.get()
                .uri(url)
                .header("X-RapidAPI-Key", this.apiKey)
                .header("X-RapidAPI-Host", this.apiHost)
                .retrieve()
                .body(List.class);

    }

    @Override
    public List<Exercise> getExerciseByEquipment(String equipment, PageRequest pageRequest) {
        String url = this.apiUrl + "/equipment/" + equipment +"?limit=" + pageRequest.getPageSize() + "&offset=" + pageRequest.getPageNumber();
        return restClient.get()
                .uri(url)
                .header("X-RapidAPI-Key", this.apiKey)
                .header("X-RapidAPI-Host", this.apiHost)
                .retrieve()
                .body(List.class);

    }

    @Override
    public List<String> getBodyPartList() {
        String url = this.apiUrl + "/bodyPartList";
        return restClient.get()
                .uri(url)
                .header("X-RapidAPI-Key", this.apiKey)
                .header("X-RapidAPI-Host", this.apiHost)
                .retrieve()
                .body(List.class);

    }

    @Override
    public List<String> getTargetList() {
        String url = this.apiUrl + "/targetList";
        return restClient.get()
                .uri(url)
                .header("X-RapidAPI-Key", this.apiKey)
                .header("X-RapidAPI-Host", this.apiHost)
                .retrieve()
                .body(List.class);

    }

    @Override
    public List<String> getEquipmentList() {
        String url = this.apiUrl + "/equipmentList";
        return restClient.get()
                .uri(url)
                .header("X-RapidAPI-Key", this.apiKey)
                .header("X-RapidAPI-Host", this.apiHost)
                .retrieve()
                .body(List.class);

    }
}
