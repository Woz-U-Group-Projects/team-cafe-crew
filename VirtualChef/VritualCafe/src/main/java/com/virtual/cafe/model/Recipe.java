package com.virtual.cafe.model;

import javax.persistence.GeneratedValue;
import javax.validation.constraints.NotNull;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Document(collection = "recipe")
public class Recipe {
    
	@Id
	@NotNull
	@GeneratedValue
	@JsonProperty(value="id", access=Access.READ_ONLY)
	ObjectId id;

    // The indexed allows it to be searchable, and the unique constraint makes it so
	// you can't have duplicates with the same name
	@Indexed(unique = true)
	@NotNull
	@JsonProperty
	String recipeName;
	
	@JsonProperty
	String recipeIngrediants;
	
	@Indexed
	@JsonProperty
	int servings;
	
	public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId  id) {
        this.id = id;
    }

	public String getRecipeName() {
		return recipeName;
	}

	public void setRecipeName(String recipeName) {
		this.recipeName = recipeName;
	}

	public String getRecipeIngrediants() {
		return recipeIngrediants;
	}

	public void setRecipeIngrediants(String recipeIngrediants) {
		this.recipeIngrediants = recipeIngrediants;
	}

	public int getServings() {
		return servings;
	}

	public void setServings(int servings) {
		this.servings = servings;
	}
	
	public String toString() {
		return "Recipe Name: " + recipeName + "the ingrediants: " + recipeIngrediants + "Nummber of servings: " + servings;
	}

	
}
