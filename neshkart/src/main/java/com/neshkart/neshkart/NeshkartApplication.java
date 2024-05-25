package com.neshkart.neshkart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@EnableJpaRepositories(basePackages = "com.neshkart.neshkart.repository")
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
public class NeshkartApplication {

	public static void main(String[] args) {
		SpringApplication.run(NeshkartApplication.class, args);
	}

}
