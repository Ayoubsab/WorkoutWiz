package com.ayoub.workoutApp.model;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
public class Exercise {
    private String id;
    private String name;
    private String type;
    private String target;
    private String bodyPart;
    private String equipment;
    private String[] instructions;

    private String[] secondaryMuscles;
    private String gifUrl;

    public Exercise(String id, String name, String type, String target, String bodyPart, String equipment, String[] instructions, String[] secondaryMuscles, String gifUrl) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.target = target;
        this.bodyPart = bodyPart;
        this.equipment = equipment;
        this.instructions = instructions;
        this.secondaryMuscles = secondaryMuscles;
        this.gifUrl = gifUrl;
    }

    public Exercise(){}

}
