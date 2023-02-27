package wv.kalandar.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UsersRepository usersRepository;

    @Autowired
    public UserService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }


    public List<Users> getUsers() {
        return usersRepository.findAll();
    }

    public void addNewStudent(Users user) {

        Optional<Users> userByEmail = usersRepository.findUsersByEmail(user.getEmail());
        if (userByEmail.isPresent()) {
            throw new IllegalStateException("Email taken");
        }
        usersRepository.save(user);

    }
}
