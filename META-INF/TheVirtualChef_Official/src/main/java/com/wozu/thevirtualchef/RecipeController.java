package com.wozu.thevirtualchef;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RecipeController {
	@RequestMapping("/user/{recipe}")
	public String getRecipe(@PathVariable String recipe) {
		return "Key Ingredients & Cooking Instructions " + recipe;
    }
	
	@RequestMapping(value="/user", method=RequestMethod.POST)
	public String postRecipe(@RequestBody String deliciousDish) {
		return "Follow Instructions & Prepare Ingredients " + deliciousDish; 
	}		

	@RequestMapping(value="/user/add", method=RequestMethod.POST)
	public <Recipe> Recipe addRecipe(@RequestBody Recipe recipe)
	{
		return recipe;
	}
	
	}

