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

    @Value("${jwt.secret}")
    private String SECRET;
    private static final long EXPIRATION_TIME = 864_000_000; // 10 days

    public String generateToken(User user){
        Map<String, Object> claims = new HashMap<>();
        String subject = String.valueOf(user.getUserId());
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET) // Signing the JWT with the secret key
                .compact();
    }

    public Boolean validateToken(String token,Long userId){
        final Long userID = extractUserId(token);
        return (userID.equals(userId) && !isTokenExpired(token));
    }

    public Long extractUserId(String token){
        return Long.valueOf(extractAllClaims(token).getSubject());
    }

    public Claims extractAllClaims(String token){
        return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
    }

    public Boolean isTokenExpired(String token){
        return extractAllClaims(token).getExpiration().before(new Date());
    }


}
