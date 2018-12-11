package com.virtual.chef.controller;

import java.util.List;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.virtual.cafe.model.Recipe;
import com.virtual.cafe.repository.RecipeRepository;

@RestController
@RequestMapping("/recipes")
public class RecipeController {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(RecipeController.class);
    
    @Autowired
    private RecipeRepository recipeRepository;
	
	@RequestMapping(value = "/", method = RequestMethod.POST)
	public Recipe createRecipe(@Valid @RequestBody Recipe recipe) {
	    LOGGER.info( "Creating Recipe: " + recipe.getRecipeName());
		return recipeRepository.save(recipe);
	}
	
	@RequestMapping(value = "/name/{recipeName}", method = RequestMethod.GET)
	public Recipe getRecipe(@PathVariable String recipeName) {
	    LOGGER.info( "Finding Receipe: " + recipeName );
		return recipeRepository.findByRecipeName(recipeName);
	}
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public List<Recipe> getAll(){
		return recipeRepository.findAll();
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable("id") String id, @Valid @RequestBody Recipe recipe) {
		recipe.setId(new ObjectId(id));
		recipeRepository.save(recipe);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public Recipe delete(@PathVariable String id) {
	    Recipe recipe = recipeRepository.findById(id).get();
	    recipeRepository.delete(recipe);
		return recipe;
	}
	
	// Need to be careful with this as this will delete all of the recipes
	@RequestMapping(value = "/deleteAll", method = RequestMethod.DELETE)
	public void deleteAll() {
	    recipeRepository.deleteAll();
	    LOGGER.info( "Deleted all recipes" );
	}
}
