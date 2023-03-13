package wv.kalandar.backend.event;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wv.kalandar.backend.user.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepsoitory extends JpaRepository<Event, Long> {

    Optional<Event> findEventByEventAndStartTime(String event, LocalDateTime startTime);

    List<Event> findEventByUser(User user);


}
