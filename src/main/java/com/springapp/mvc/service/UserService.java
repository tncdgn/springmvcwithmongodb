package com.springapp.mvc.service;

import com.springapp.mvc.model.User;
import com.springapp.mvc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.jws.soap.SOAPBinding;
import java.util.List;

/**
 * Created by Tunç on 28.7.2015.
 */
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public void insertData(User user){

        userRepository.insertData(user);
    }
    public List<User> getAllUser(){

        return userRepository.getAllUser();
    }
    public void deleteUser(String id){

        userRepository.deleteUser(id);
    }
    public void updateUser(User user){
        userRepository.updateUser(user);
    }
}
