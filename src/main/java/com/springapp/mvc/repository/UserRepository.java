package com.springapp.mvc.repository;

import com.springapp.mvc.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.logging.Logger;

/**
 * Created by Tunç on 28.7.2015.
 */
@Repository
public class UserRepository {

    @Autowired
    MongoTemplate mongoTemplate;
    static final Logger log=Logger.getLogger(UserRepository.class.getName());

    public void insertData(User user){
        if(!mongoTemplate.collectionExists(User.class)){
            mongoTemplate.createCollection(User.class);
        }
        mongoTemplate.insert(user,"users");

    }
    public List<User> getAllUser(){
        List<User> list=mongoTemplate.findAll(User.class,"users");
        return list;
    }
    public void deleteUser(String id){
        for(User user:getAllUser()){
            if(user.getPersonId().equals(id)) {
                mongoTemplate.remove(user,"users");

                break;
            }
        }
    }
    public void updateUser(User user){
        Query query=new Query(Criteria.where("_id").is(user.getPersonId()));
        log.info("user name1******* " + user.getPersonId());
        User user1=mongoTemplate.findOne(query,User.class,"users");
        user1.setName(user.getName());
        user1.setSurname(user.getSurname());
        user1.setAddress(user.getAddress());
        user1.setPhoneNumber(user.getPhoneNumber());
        mongoTemplate.save(user1,"users");
    }
}
