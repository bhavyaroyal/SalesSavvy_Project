package com.salessavvy.salessavvy.service;

import java.util.List;
import com.salessavvy.salessavvy.model.CartItem;

public interface CartService {

    CartItem addToCart(Long userId, Long productId, int quantity);

    List<CartItem> getUserCart(Long userId);

    void removeFromCart(Long cartItemId);

    void clearCart(Long userId);

	CartItem updateQuantity(Long cartItemId, int qty);
}
