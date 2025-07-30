package com.example.demo.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class Flat implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false,updatable = false)
    private Long id;
    private String residentName;
    private int flatNumber;
    private double dues;
    private double squareMeters;
    private boolean isPaid;
    private String numberOfRooms;
    private int floor;
    private String imageUrl;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Flat(){}

    public Flat(String residentName,double squareMeters,String numberOfRooms,int floor, String imageUrl){
        this.residentName=residentName;
        this.squareMeters=squareMeters;
        this.numberOfRooms=numberOfRooms;
        this.floor=floor;
        this.imageUrl=imageUrl;
    }

    public double getDues() {return dues;}
    public void setDues(double dues) {this.dues=dues;}

    public int getFlatNumber() {return flatNumber;}
    public void setFlatNumber(int flatNumber) {this.flatNumber=flatNumber;}

    public boolean isPaid() {return isPaid;}
    public void setPaid(boolean isPaid) {
        this.isPaid = isPaid;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id=id;
    }

    public String getResidentName(){
        return residentName;
    }
    public void setResidentName(String residentName){
        this.residentName=residentName;
    }

    public double getSquareMeters(){
        return squareMeters;
    }
    public void setSquareMeters(double squareMeters){
        this.squareMeters=squareMeters;
    }

    public String getNumberOfRooms(){
        return numberOfRooms;
    }
    public void setNumberOfRooms(String numberOfRooms){
        this.numberOfRooms=numberOfRooms;
    }

    public int getFloor(){
        return floor;
    }
    public void setFloor(int floor){
        this.floor=floor;
    }

    public String getImageUrl(){
        return imageUrl;
    }
    public void setImageUrl(String imageUrl){
        this.imageUrl=imageUrl;
    }

    public String toString(){
        return "Flat, \n"+
                "Resident: "+residentName+"\n"+
                "Squaremeters: "+squareMeters+"\n"+
                "Number of rooms: "+numberOfRooms+"\n"+
                "Floor: "+floor+"\n"+
                "Image URL: "+imageUrl+"\n"+
                "ID: "+id;

    }
}
