package com.salessavvy.salessavvy.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.salessavvy.salessavvy.model.CartItem;
import com.salessavvy.salessavvy.model.Product;
import com.salessavvy.salessavvy.repository.CartItemRepository;
import com.salessavvy.salessavvy.repository.ProductRepository;

@Service
public class CartServiceImpl implements CartService {

    private final CartItemRepository cartRepo;
    private final ProductRepository productRepo;

    public CartServiceImpl(
            CartItemRepository cartRepo,
            ProductRepository productRepo) {
        this.cartRepo = cartRepo;
        this.productRepo = productRepo;
    }

    @Override
    public CartItem addToCart(Long userId, Long productId, int quantity) {

        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem item = new CartItem();
        item.setUserId(userId);
        item.setProduct(product);
        item.setQuantity(quantity);

        return cartRepo.save(item);
    }
    


    @Override
    public List<CartItem> getUserCart(Long userId) {
        return cartRepo.findByUserId(userId);
    }

    @Override
    public void removeFromCart(Long cartItemId) {
        cartRepo.deleteById(cartItemId);
    }

    @Override
    public void clearCart(Long userId) {
        cartRepo.deleteByUserId(userId);
    }
    
    @Override
    public CartItem updateQuantity(Long cartItemId, int quantity) {
        CartItem item = cartRepo.findById(cartItemId)
            .orElseThrow(() -> new RuntimeException("Cart item not found"));
        item.setQuantity(quantity);
        return cartRepo.save(item);
    }
}
