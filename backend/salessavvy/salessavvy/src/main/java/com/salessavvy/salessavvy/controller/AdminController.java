package com.salessavvy.salessavvy.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.salessavvy.salessavvy.model.*;
import com.salessavvy.salessavvy.repository.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ProductRepository productRepo;
    private final OrderRepository orderRepo;

    public AdminController(ProductRepository productRepo,
                           OrderRepository orderRepo) {
        this.productRepo = productRepo;
        this.orderRepo = orderRepo;
    }

    @PostMapping("/product")
    public Product addProduct(@RequestBody Product product) {
        return productRepo.save(product);
    }

    @PutMapping("/product/{id}")
    public Product updateProduct(@PathVariable Long id,
                                 @RequestBody Product updated) {

        Product product = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(updated.getName());
        product.setPrice(updated.getPrice());
        product.setQuantity(updated.getQuantity());

        return productRepo.save(product);
    }

    @DeleteMapping("/product/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productRepo.deleteById(id);
        return "Product deleted";
    }

    @GetMapping("/orders")
    public List<Order> viewAllOrders() {
        return orderRepo.findAll();
    }
}
