package com.salessavvy.salessavvy.util;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	

    private static final SecretKey KEY =
            Keys.hmacShaKeyFor(
                    "mysupersecretkeymysupersecretkey12345"
                            .getBytes());

    // GENERATE TOKEN
    public static String generateToken(String email) {

        return Jwts.builder()
                .subject(email)
                .signWith(KEY)
                .compact();
    }

    // EXTRACT EMAIL
    public static String extractUsername(String token) {

        Claims claims = Jwts.parser()
                .verifyWith(KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }

	public String extractEmail(String token) {
		// TODO Auto-generated method stub
		return null;
	}

	public String extractRole(String token) {
		// TODO Auto-generated method stub
		return null;
	}
}
