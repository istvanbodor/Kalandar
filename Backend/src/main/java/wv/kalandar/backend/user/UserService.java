package wv.kalandar.backend.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public void addNewUser(User user) {

        Optional<User> userByEmail = userRepository.findUsersByEmail(user.getEmail());
        if (userByEmail.isPresent()) {
            throw new IllegalStateException("Email taken");
        }

        user.setAdmin(false);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

    }

    public void deleteUser(Long userId) {
        boolean userExists = userRepository.existsById(userId);
        if (!userExists) {
            throw new IllegalStateException();
        }
        userRepository.deleteById(userId);
    }

    @Transactional
    public void updateUser(Long userId, User user) {

        User repoUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException());


        if (userRepository.findUsersByEmail(user.getEmail()).isPresent() && (!Objects.equals(user.getEmail(), repoUser.getEmail())) ) {
            throw new IllegalStateException("Email already in use!");
        }

        if (user.getEmail() != null && user.getEmail().length() > 0
                && !Objects.equals(user.getEmail(), repoUser.getEmail())) {
            repoUser.setEmail(user.getEmail());
        }

        if (user.getLastName() != null && user.getLastName().length() > 0
                && !Objects.equals(user.getLastName(), repoUser.getLastName())) {
            repoUser.setLastName(user.getLastName());
        }

        if (user.getFirstName() != null && user.getFirstName().length() > 0
                && !Objects.equals(user.getFirstName(), repoUser.getFirstName())) {
            repoUser.setFirstName(user.getFirstName());
        }

        if (user.getUsername() != null && user.getUsername().length() > 0
                && !Objects.equals(user.getUsername(), repoUser.getUsername())) {
            repoUser.setUsername(user.getUsername());
        }

        if (user.getPassword() != null && user.getPassword().length() > 0
                && !Objects.equals(user.getPassword(), repoUser.getPassword())) {
            repoUser.setPassword(user.getPassword());
        }

        Boolean admin = user.isAdmin();

        if (admin != null && user.isAdmin() != repoUser.isAdmin()) {

            repoUser.setAdmin(user.isAdmin());

        }


        userRepository.save(repoUser);
    }
}
