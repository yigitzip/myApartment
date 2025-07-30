package com.example.demo.Service;

import com.example.demo.model.User;
import com.example.demo.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AuthService {
    private final UserRepo userRepo;

    public AuthService(UserRepo userRepo){

        this.userRepo=userRepo;

    }

    public Optional<User> findUserByUsername() {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepo.findByUserName(username);
    }

    public boolean validateUser(String username, String password){
        return userRepo.findByUserName(username)
                .map(user -> user.getPassword().equals(password))
                .orElse(false);
    }

    public boolean userExists(String username){
        return userRepo.findByUserName(username).isPresent();
    }

    public void registerUser(String username, String password, String apartmentName){

        User user = new User();
        user.setUserName(username);
        user.setPassword(password);
        user.setApartmentName(apartmentName);
        userRepo.save(user);

    }
}
