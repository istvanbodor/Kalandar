package wv.kalandar.backend.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UsersConfig {

    @Bean
    CommandLineRunner commandLineRunner(UsersRepository repository) {

        return args -> {
            Users user = new Users(
                    "Test", "User", "Username",
                    "12345678", "test@example.com", false);


            repository.save(user);
        };


    }
}
