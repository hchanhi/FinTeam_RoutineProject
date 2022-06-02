package com.pg.controller;

import com.pg.model.Supplements;
import com.pg.service.SupplementsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class SupplementsController {
    final private SupplementsService supplementsService;

    @PostMapping("/supplements/add")
    public Supplements addSupplements(@RequestParam String supplementsName, @RequestParam int quantity, @RequestParam int singleDose, @RequestParam String nickname){
        return supplementsService.addSupplements(supplementsName, quantity, singleDose, nickname);
    }

    @GetMapping("/supplements/list")
    public List<Supplements> findUserSupplements(@RequestParam String nickname){
        return supplementsService.findAllByUser(nickname);
    }

}
