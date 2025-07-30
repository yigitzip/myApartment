package com.example.demo.exceptions;

public class FlatNotFoundException extends RuntimeException {
    public FlatNotFoundException(String message){
        super(message);
    }
}
