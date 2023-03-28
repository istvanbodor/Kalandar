package wv.kalandar.backend.user;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserService {

    public static final Set<Role> EDITABLE_ROLES = EnumSet.of(Role.USER, Role.ADMIN);
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }



    public List<UserResponseDto> getUsers() {

        List<User> list = userRepository.findAll();
        List<UserResponseDto> responseDtoList = new ArrayList<UserResponseDto>();

        for (User item : list) {
            UserResponseDto user = UserResponseDto.builder()
                    .id(item.getId())
                    .email(item.getEmail())
                    .lastName(item.getLastName())
                    .firstName(item.getFirstName())
                    .role(item.getRole())
                    .username(item.getRealUsername())
                    .build();
            responseDtoList.add(user);
        }

        if (log.isTraceEnabled()) {
            log.trace("getUsers: {}", list.stream().map(User::getUsername).collect(Collectors.joining(", ")));
        }
        return responseDtoList;

    }

    public void deleteUser(Long userId) {
        boolean userExists = userRepository.existsById(userId);
        if (!userExists) {
            throw new IllegalStateException();
        }
        userRepository.deleteById(userId);
        log.info("User deleted: {}", userId);
        if (log.isDebugEnabled()) {

        }
    }

    @Transactional
    public void updateUserRole(Long userId) {

        User repoUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException());

        if (repoUser.getRole()==Role.ADMIN) {
            repoUser.setRole(Role.USER);
        }
        else {
            repoUser.setRole(Role.ADMIN);
        }

       /* if (userRepository.findUsersByEmail(user.getEmail()).isPresent() && (!Objects.equals(user.getEmail(), repoUser.getEmail()))) {
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
            repoUser.setPassword(passwordEncoder.encode(user.getPassword()));

        }*/

    }

    public UserResponseDto getUserProfile() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();

        User user = userRepository.findUsersByEmail(currentPrincipalName).get();
        return UserResponseDto.builder()
                .username(user.getRealUsername())
                .role(user.getRole())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .id(user.getId())
                .build();

    }

    @Transactional
    public void updateUserPassword(PasswordDto password) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();

        User user = userRepository.findUsersByEmail(currentPrincipalName).get();

        user.setPassword(passwordEncoder.encode(password.getPassword()));
    }
}
