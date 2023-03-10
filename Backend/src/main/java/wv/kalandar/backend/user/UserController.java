package wv.kalandar.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(path = "/api/user")
@CrossOrigin
public class UserController {

    public final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers() {
            return userService.getUsers();
    }

    @PostMapping
    public void registerNewUser(@RequestBody User user) {
        try {
            userService.addNewUser(user);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path = "{userId}")
    public void deleteUser(@PathVariable("userId") Long userId ) {
        try {
            userService.deleteUser(userId);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "{userId}")
    public void updateUser(@PathVariable("userId") Long userId, @RequestBody User user) {

        try {
            userService.updateUser(userId, user);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

    }


}
