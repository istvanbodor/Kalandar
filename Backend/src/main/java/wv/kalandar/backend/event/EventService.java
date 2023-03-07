package wv.kalandar.backend.event;

import net.snowflake.client.jdbc.internal.apache.arrow.flatbuf.Int;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepsoitory eventRepsoitory;

    @Autowired
    public EventService(EventRepsoitory eventRepsoitory) {
        this.eventRepsoitory = eventRepsoitory;
    }

    public List<Event> getEvents() {
        return eventRepsoitory.findAll();
    }


    public void addNewEvent(Event event) {
        Optional<Event> checkIfEventExists = this.eventRepsoitory.findEventByEventAndStartTime(
                event.getEvent(), event.getStartTime()
        );

        if (checkIfEventExists.isPresent()) {
            throw new IllegalStateException();
        }

        eventRepsoitory.save(event);
    }

    public void deleteEvent(Long eventId) {
        boolean eventExists = eventRepsoitory.existsById(eventId);
        if (!eventExists) {
            throw new IllegalStateException();
        }
        eventRepsoitory.deleteById(eventId);
    }
}
