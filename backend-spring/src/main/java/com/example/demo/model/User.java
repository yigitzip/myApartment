package com.example.demo.model;


import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "username")
    private String userName;

    private String password;
    private String apartmentName;



    public Long getId(){return id;}
    public void setId(Long id){this.id=id;}

    public String getUserName(){return this.userName;}
    public void setUserName(String userName){this.userName=userName;}

    public String getPassword(){return this.password;}
    public void setPassword(String password){this.password=password;}

    public String getApartmentName(){return this.apartmentName;}
    public void setApartmentName(String apartmentName){this.apartmentName=apartmentName;}


}
