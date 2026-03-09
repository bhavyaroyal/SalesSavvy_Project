package com.salessavvy.salessavvy.config;

import com.salessavvy.salessavvy.model.Product;
import com.salessavvy.salessavvy.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(ProductRepository productRepository) {
        return args -> {

            if(productRepository.count() == 0){

                Product p1 = new Product();
                p1.setName("Laptop");
                p1.setPrice(50000);
                p1.setDescription("High performance laptop");

                Product p2 = new Product();
                p2.setName("Smartphone");
                p2.setPrice(20000);
                p2.setDescription("Latest Android phone");

                Product p3 = new Product();
                p3.setName("Headphones");
                p3.setPrice(3000);
                p3.setDescription("Noise cancelling headphones");

                productRepository.save(p1);
                productRepository.save(p2);
                productRepository.save(p3);
            }

        };
    }
}