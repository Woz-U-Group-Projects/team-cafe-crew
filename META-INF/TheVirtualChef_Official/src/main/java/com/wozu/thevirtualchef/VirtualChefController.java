package com.wozu.thevirtualchef;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class VirtualChefController {
	@RequestMapping("/greeting")
	public String getGreeting() {
		return "Make It Happen!";
}

	@RequestMapping(value="/greeting", method=RequestMethod.POST)
	public String postGreeting() {
		return "Let's Eat!";
}
	
}