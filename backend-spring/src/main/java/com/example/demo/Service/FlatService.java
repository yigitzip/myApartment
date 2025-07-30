package com.example.demo.Service;

import com.example.demo.exceptions.FlatNotFoundException;
import com.example.demo.model.Flat;
import com.example.demo.model.User;
import com.example.demo.repo.FlatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class FlatService {
    private final FlatRepo flatRepo;

    @Autowired
    public FlatService(FlatRepo flatRepo){
        this.flatRepo=flatRepo;
    }

    public Flat addFlat(Flat flat){
        return flatRepo.save(flat);
    }

    public List<Flat> findFlatsByUser(User user) {
        return flatRepo.findAllByUser(user);
    }

    public void setIsPaid(Long flatId, boolean isPaid){
        Flat flat = flatRepo.findFlatById(flatId)
                .orElseThrow(() -> new FlatNotFoundException("flat, id: "+flatId+" not found!"));
        flat.setPaid(isPaid);
        flatRepo.save(flat);
    }

    public List<Flat> findAllFlats(){
        return flatRepo.findAll();
    }

    public void deleteFlat(Long id){
        flatRepo.deleteById(id);
    }

    public Flat findFlatById(Long id){
        return flatRepo.findFlatById(id).orElseThrow(() -> new FlatNotFoundException(id+" was not found!"));
    }

    public List<Flat> findUnpaidFlatsByUser(User user) {
        return flatRepo.findAllByUserAndIsPaidFalse(user);
    }

    public List<Flat> findPaidFlatsByUser(User user) {
        return flatRepo.findAllByUserAndIsPaidTrue(user);
    }





}
