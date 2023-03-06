package wv.kalandar.backend.user;

import net.snowflake.client.jdbc.internal.apache.arrow.flatbuf.Int;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Int> {

    Optional<User> findUsersByEmail(String email);


}
