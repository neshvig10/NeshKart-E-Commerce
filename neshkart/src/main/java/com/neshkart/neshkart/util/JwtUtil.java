package com.neshkart.neshkart.util;


import com.neshkart.neshkart.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Component
public class JwtUtil {

/*    @Value("${jwt.secret}")*/
    private String SECRET="ZYFijv2+KJlbw+8guBbyrf8GHuBD5u6kjEOCQ3fzSLnkLu5vYvAIALHJC99kWwJL";
    private static final long EXPIRATION_TIME = 864_000_000; // 10 days

    public String generateToken(User user){
        Claims claims = Jwts.claims()
                .setIssuer(String.valueOf(user.getUserId()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME));

        Long userId = user.getUserId();
        String userIdString = userId.toString();
        claims.setId(userIdString);

        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS256, SECRET) // Signing the JWT with the secret key
                .compact();
    }

    public Boolean validateToken(String token,Long userId){
        final Long userID = extractUserId(token);
        return (userID.equals(userId) && !isTokenExpired(token));
    }

    // Method to extract user ID from the token
    public Long extractUserId(String token) {
        Claims claims = extractAllClaims(token);
        System.out.println(claims.toString());
        String userId = claims.getId(); // Ensure 'id' is set in the token
        return userId != null ? Long.valueOf(userId) : null;
    }

    // Method to extract all claims from the token
    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
    }

    public Boolean isTokenExpired(String token){
        return extractAllClaims(token).getExpiration().before(new Date());
    }


}
