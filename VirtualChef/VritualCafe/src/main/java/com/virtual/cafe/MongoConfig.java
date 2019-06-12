package com.virtual.cafe;

//Comment out to use MLabs
//@Configuration
public class MongoConfig {
 
    private static final String MONGO_DB_URL = "localhost";
    private static final String MONGO_DB_NAME = "recipe";
    //Comment out to use MLabs
    //@Bean
    //public MongoTemplate mongoTemplate() throws IOException {
        //EmbeddedMongoFactoryBean mongo = new EmbeddedMongoFactoryBean();
        //mongo.setBindIp(MONGO_DB_URL);
        //MongoClient mongoClient = mongo.getObject();
        //MongoTemplate mongoTemplate = new MongoTemplate(mongoClient, MONGO_DB_NAME);
        //return mongoTemplate;
    //}
}