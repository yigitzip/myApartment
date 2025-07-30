package com.example.demo;

import com.example.demo.Service.AuthService;
import com.example.demo.Service.FlatService;
import com.example.demo.model.Flat;
import com.example.demo.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/flat")
public class FlatResource {

    private final FlatService flatService;
    private final AuthService authService;

    public FlatResource(FlatService flatService,AuthService authService){
        this.flatService=flatService;
        this.authService=authService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Flat>> getAllFlats(){
        List<Flat> allFlats = flatService.findAllFlats();
        return new ResponseEntity<>(allFlats, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Flat> getFlatById(@PathVariable("id") Long id){
        Flat flat = flatService.findFlatById(id);
        return new ResponseEntity<>(flat,HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Flat> addFlat(@RequestBody Flat flat) {
        User user = authService.findUserByUsername()
                .orElseThrow(() -> new RuntimeException("User not found"));
        flat.setUser(user);
        Flat newFlat = flatService.addFlat(flat);
        return new ResponseEntity<>(newFlat, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFlat(@PathVariable Long id){
        flatService.deleteFlat(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/user")
    public ResponseEntity<List<Flat>> getFlatsByUser() {
        User user = authService.findUserByUsername()
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Flat> flatsByUser = flatService.findFlatsByUser(user);
        return new ResponseEntity<>(flatsByUser, HttpStatus.OK);
    }

    @PatchMapping("/{id}/dues")
    public ResponseEntity<Void> updateIsPaid(@PathVariable Long id, @RequestBody Map<String, Boolean> payload){
        boolean isPaid = payload.get("isPaid");
        flatService.setIsPaid(id,isPaid);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/unpaid")
    public ResponseEntity<List<Flat>> getUnpaidFlatsByUser() {
        User user = authService.findUserByUsername()
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Flat> unpaidFlats = flatService.findUnpaidFlatsByUser(user);
        return new ResponseEntity<>(unpaidFlats, HttpStatus.OK);
    }

    @GetMapping("/paid")
    public ResponseEntity<List<Flat>> getPaidFlatsByUser() {
        User user = authService.findUserByUsername()
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Flat> flats = flatService.findPaidFlatsByUser(user);
        return new ResponseEntity<>(flats, HttpStatus.OK);
    }


}
