package com.neshkart.neshkart.service.impl;

import com.neshkart.neshkart.model.Product;
import com.neshkart.neshkart.repository.ProductRepository;
import com.neshkart.neshkart.repository.UserRepository;
import com.neshkart.neshkart.service.ProductService;
import com.neshkart.neshkart.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Value("${product.image}")
    String uploadDir;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }


    @Override
    public List<Product> productByUserId(Long id){
        return productRepository.productSoldByUser(id);
    }

    @Override
    public Product addProduct(Product product, MultipartFile imageFile){
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs(); // Create directory if it doesn't exist
        }
        String filePath = uploadDir + imageFile.getOriginalFilename();
        File dest = new File(filePath);
        try (FileOutputStream fos = new FileOutputStream(dest)) {
            fos.write(imageFile.getBytes()); // Transfer the file to the defined path
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        product.setPathToImage(imageFile.getOriginalFilename());
        Product productSaved = productRepository.save(product);
        return productSaved;
    }

    @Override
    public InputStream getProductImage(String path) throws FileNotFoundException {
        InputStream is = new FileInputStream(uploadDir+path);
        return is;
    }
}
