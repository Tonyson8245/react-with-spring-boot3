package com.packt.cardatabase.domain;

import jakarta.persistence.*;

@Entity
public class Car {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	private String brand, model, color, registerNumber;
	@Column(name="modelYear")
	private int modelYear;
	private int price;
	
	public Car() {}
	
	public Car(String brand, String model, String color, 
			String registerNumber, int modelYear, int price, Owner owner) {
		super();
		this.brand = brand;
		this.model = model;
		this.color = color;
		this.registerNumber = registerNumber;
		this.modelYear = modelYear;
		this.price = price;
		this.owner = owner;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "owner")
	private Owner owner;

	//Getter  and  setter
	public Owner getOwner()  {
	    return owner;
	}

	public void setOwner(Owner owner)  {
	    this.owner = owner;
	}
	
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getRegisterNumber() {
		return registerNumber;
	}

	public void setRegisterNumber(String registerNumber) {
		this.registerNumber = registerNumber;
	}

	public int getmodelYear() {
		return modelYear;
	}

	public void setmodelYear(int modelYear) {
		this.modelYear = modelYear;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
	
}
