package wv.kalandar.backend.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepsoitory extends JpaRepository<Event, Integer> {

}
