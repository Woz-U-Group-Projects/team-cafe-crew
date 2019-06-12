package com.virtual.cafe.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.virtual.cafe.model.Recipe;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String> {
    
	public Recipe findByRecipeName(String recipeName);
	public List<Recipe> findByServings(int servings);
}
