package com.salessavvy.salessavvy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.salessavvy.salessavvy.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
