//package com.salessavvy.salessavvy.service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.salessavvy.salessavvy.exception.ResourceNotFoundException;
//import com.salessavvy.salessavvy.model.CartItem;
//import com.salessavvy.salessavvy.model.Order;
//import com.salessavvy.salessavvy.model.OrderItem;
//import com.salessavvy.salessavvy.model.User;
//import com.salessavvy.salessavvy.repository.CartItemRepository;
//import com.salessavvy.salessavvy.repository.OrderItemRepository;
//import com.salessavvy.salessavvy.repository.OrderRepository;
//import com.salessavvy.salessavvy.repository.UserRepository;
//
//@Service
//public class OrderServiceImpl implements OrderService {
//
//    @Autowired
//    private CartItemRepository cartRepo;
//
//    @Autowired
//    private OrderRepository orderRepo;
//
//    @Autowired
//    private OrderItemRepository orderItemRepo;
//
//    @Autowired
//    private UserRepository userRepo;
//
//    @Override
//    public Order placeOrder() {
//
//        // ✅ get logged user email from JWT
//        //String email = LoggedUserUtil.getLoggedInUserEmail();
//
//        // ✅ fetch user
//       // User user = userRepo.findByEmail(email)
//              //  .orElseThrow(() -> new RuntimeException("User not found"));
//
//      //  Long userId = user.getId();
//    	
//    	// TEMP: using userId directly
//    	Long userId = 14L;   // <-- your MySQL user id
//
//    	User user = userRepo.findById(userId)
//    	        .orElseThrow(() -> new RuntimeException("User not found"));
//    	
//    	
//
//
//        // ✅ get cart items
//        List<CartItem> cartItems = cartRepo.findByUserId(userId);
//
//        if (cartItems.isEmpty()) {
//            throw new RuntimeException("Cart is empty");
//        }
//
//        // ✅ create order
//        Order order = new Order();
//        order.setUser(user);
//        order.setStatus("PLACED");
//        order.setOrderDate(LocalDateTime.now());
//
//        order = orderRepo.save(order);
//
//        double total = 0;
//
//        // ✅ cart → order items
//        for (CartItem cart : cartItems) {
//
//            OrderItem item = new OrderItem();
//            item.setOrder(order);
//            item.setProduct(cart.getProduct());
//            item.setQuantity(cart.getQuantity());
//            item.setPrice(cart.getProduct().getPrice());
//
//            total += cart.getProduct().getPrice() * cart.getQuantity();
//
//            orderItemRepo.save(item);
//        }
//
//        order.setTotalAmount(total);
//        orderRepo.save(order);
//
//        // ✅ clear cart
//        cartRepo.deleteByUserId(userId);
//
//        return order;
//    }
//
//    @Override
//    public Order getOrderById(Long orderId) {
//        return orderRepo.findById(orderId)
//        		.orElseThrow(() -> new ResourceNotFoundException("Order not found"));
//
//        
//    }
//
//	@Override
//	public List<Order> getUserOrders(Long userId) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	@Override
//	public List<Order> getOrdersByUser(Long userId) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//	
//	
//	
//
//}

package com.salessavvy.salessavvy.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.salessavvy.salessavvy.exception.ResourceNotFoundException;
import com.salessavvy.salessavvy.model.CartItem;
import com.salessavvy.salessavvy.model.Order;
import com.salessavvy.salessavvy.model.OrderItem;
import com.salessavvy.salessavvy.model.User;
import com.salessavvy.salessavvy.repository.CartItemRepository;
import com.salessavvy.salessavvy.repository.OrderItemRepository;
import com.salessavvy.salessavvy.repository.OrderRepository;
import com.salessavvy.salessavvy.repository.UserRepository;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private CartItemRepository cartRepo;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private OrderItemRepository orderItemRepo;

    @Autowired
    private UserRepository userRepo;

    // ✅ PLACE ORDER
    @Override
    public Order placeOrder(Long userId) {

        // TEMP user (later JWT)

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<CartItem> cartItems = cartRepo.findByUserId(userId);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setUser(user);
        order.setStatus("PLACED");
        order.setOrderDate(LocalDateTime.now());

        order = orderRepo.save(order);

        double total = 0;

        for (CartItem cart : cartItems) {

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(cart.getProduct());
            item.setQuantity(cart.getQuantity());
            item.setPrice(cart.getProduct().getPrice());

            total += cart.getProduct().getPrice() * cart.getQuantity();

            orderItemRepo.save(item);
        }

        order.setTotalAmount(total);
        orderRepo.save(order);

        // clear cart
        cartRepo.deleteByUserId(userId);

        return order;
    }

    // ✅ GET ORDER BY ID
    @Override
    public Order getOrderById(Long orderId) {
        return orderRepo.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));
    }

    // ✅ GET ORDERS OF USER
    @Override
    public List<Order> getUserOrders(Long userId) {

        List<Order> orders = orderRepo.findByUserId(userId);

        if (orders.isEmpty()) {
            throw new ResourceNotFoundException("No orders found");
        }

        return orders;
    }

    // ✅ SAME METHOD (for interface compatibility)
    @Override
    public List<Order> getOrdersByUser(Long userId) {
        return orderRepo.findByUserId(userId);
    }

    
	@Override
	public List<Order> getAllOrders() {
	    return orderRepo.findAll();
	}

	@Override
	public Order placeOrder() {
		// TODO Auto-generated method stub
		return null;
	}
 
}

