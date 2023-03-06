package wv.kalandar.backend.event;

import net.snowflake.client.jdbc.internal.apache.arrow.flatbuf.Int;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepsoitory extends JpaRepository<Event, Int> {

}
