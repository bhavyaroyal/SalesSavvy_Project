package com.salessavvy.salessavvy.controller;

import com.salessavvy.salessavvy.dto.CartRequest;
import com.salessavvy.salessavvy.model.CartItem;
import com.salessavvy.salessavvy.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    CartItem add(@RequestBody CartRequest req) {

        return cartService.addToCart(
                req.getUserId(),
                req.getProductId(),
                req.getQuantity());
    }

    @GetMapping("/{userId}")
    public List<CartItem> view(@PathVariable Long userId){
        return cartService.getUserCart(userId);
    }
    
 // REMOVE SINGLE ITEM
    @DeleteMapping("/remove/{cartItemId}")
    public String removeItem(@PathVariable Long cartItemId) {
        cartService.removeFromCart(cartItemId);
        return "Item removed from cart";
    }

    // CLEAR FULL CART
    @DeleteMapping("/clear/{userId}")
    public String clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return "Cart cleared";
    }
    
    
 // Update quantity
    @PutMapping("/update/{cartItemId}")
    public CartItem updateCart(@PathVariable Long cartItemId, @RequestBody Map<String, Integer> body) {
        int qty = body.get("quantity");
        return cartService.updateQuantity(cartItemId, qty);
    }

    // Remove item (already have)
    @DeleteMapping("/{cartItemId}")
    public void remove(@PathVariable Long cartItemId) {
        cartService.removeFromCart(cartItemId);
    }


}
