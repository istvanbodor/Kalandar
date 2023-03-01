package wv.kalandar.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(path = "/api/user")
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
            userService.addNewStudent(user);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }


}
