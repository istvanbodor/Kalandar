package wv.kalandar.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(path = "/api/")
@CrossOrigin
public class UserController {

    public final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "/admin/users")
    public List<UserResponseDto> getUsers() {
            return userService.getUsers();
    }


    @DeleteMapping(path = "/admin/user/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId ) {
        try {
            userService.deleteUser(userId);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "/admin/role/user/{userId}")
    public void updateUser(@PathVariable("userId") Long userId) {

        try {
            userService.updateUserRole(userId);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping(path = "/user/profile")
    public UserResponseDto getUserProfile() {

       return userService.getUserProfile();
    }

    @PutMapping(path = "/user/password")
    public void updateUser(@RequestBody() PasswordDto password) {

        try {
            userService.updateUserPassword(password);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

    }
}
