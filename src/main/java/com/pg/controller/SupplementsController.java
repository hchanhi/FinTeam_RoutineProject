package com.pg.controller;

import com.pg.model.Supplements;
import com.pg.service.SupplementsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class SupplementsController {
    final private SupplementsService supplementsService;

    @PostMapping("/supplements/add")
    public Supplements addSupplements(@RequestBody HashMap<String,String> params){
        String supplementsName=params.get("supplementsName");
        int quantity=Integer.parseInt(params.get("quantity"));
        int singleDose=Integer.parseInt(params.get("singleDose"));
        String nickname=params.get("nickname");
        return supplementsService.addSupplements(supplementsName, quantity, singleDose, nickname);
    }

    @GetMapping("/supplements/list")
    public List<Supplements> findUserSupplements(@RequestParam String nickname){
        return supplementsService.findAllByUser(nickname);
    }

    @GetMapping("/supplements/delete")
    public void deleteSupplements(@RequestParam Long id){
        supplementsService.deleteById(id);
    }
}
