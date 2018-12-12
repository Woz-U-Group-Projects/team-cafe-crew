package com.wozu.thevirtualchef;

public class Meals {
	private Long id;
	private String ingredients;
	private String instructions;
	private String mealtypes;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getIngredients() {
		return ingredients;
	}
	public void setIngredients(String ingredients) {
		this.ingredients = ingredients;
	}
	public String getInstructions() {
		return instructions;
	}
	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}
	public String getMealtypes() {
		return mealtypes;
	}
	public void setMealtypes(String mealtypes) {
		this.mealtypes = mealtypes;
	}
}
