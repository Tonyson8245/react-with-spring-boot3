package com.packt.cardatabase.web;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import com.packt.cardatabase.domain.Car;
import com.packt.cardatabase.domain.CarRepository;

@RestController
public class CarController {
	private final CarRepository repository;
	
	public CarController(CarRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping("/cars")
	public Iterable<Car> getCars(){
		//자동차 반환
		return repository.findAll();
	}
}
