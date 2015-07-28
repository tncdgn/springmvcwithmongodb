package com.springapp.mvc.controller;

import com.springapp.mvc.model.User;
import com.springapp.mvc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@Controller
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserService userService;
    static final Logger log=Logger.getLogger(UserController.class.getName());

	@RequestMapping(method = RequestMethod.GET)
	public String printWelcome(ModelMap model) {
        //to handle form data

        model.put("userForm",new User());
        //to show all person list
        model.put("user", new User());
        model.put("listPerson", userService.getAllUser());

        //to edit person
        model.put("userEdit",new User());
		return "hello";
	}

    @RequestMapping(method = RequestMethod.POST)
    public String insertData(@ModelAttribute("userForm") User user){
        userService.insertData(user);
        log.info("User id *************** " +user.getPersonId());
        return "redirect:/users";
    }
    @RequestMapping(value = "/delete",method = RequestMethod.GET)
    public @ResponseBody String deleteUser(@RequestParam String id){
        userService.deleteUser(id);
        return "true";
    }
    @RequestMapping(value = "/edit")
    public String updateUser(@ModelAttribute("userEdit") User user){
      //  log.info("user id******* "+user.getName());
        userService.updateUser(user);
        return "redirect:/users";
    }
}