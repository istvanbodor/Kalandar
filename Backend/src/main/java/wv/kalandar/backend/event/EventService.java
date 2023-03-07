package wv.kalandar.backend.event;

import jakarta.transaction.Transactional;
import net.snowflake.client.jdbc.internal.apache.arrow.flatbuf.Bool;
import net.snowflake.client.jdbc.internal.apache.arrow.flatbuf.Int;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wv.kalandar.backend.user.User;

import java.util.List;
import java.util.Objects;
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

    @Transactional
    public void updateEvent(Long eventId, Event event) {

        Event repoEvent = eventRepsoitory.findById(eventId)
                .orElseThrow(() -> new IllegalStateException());

        Boolean fullday = event.getFullDay();
        if (fullday != null && event.getFullDay() != repoEvent.getFullDay()) {
            repoEvent.setFullDay(event.getFullDay());
        }

        if (event.getEvent() != null && event.getEvent().length() > 0
                && !Objects.equals(event.getEvent(), repoEvent.getEvent())
        ) {
            repoEvent.setEvent(event.getEvent());
        }

        if (event.getCategory() != null && event.getCategory().length() > 0
                && !Objects.equals(event.getCategory(), repoEvent.getCategory())
        ) {
            repoEvent.setCategory(event.getCategory());
        }

        if (event.getStartTime() != null && event.getStartTime().toString().length() > 0
                && !Objects.equals(event.getStartTime(), repoEvent.getStartTime())
        ) {
            repoEvent.setStartTime(event.getStartTime());
        }

        if (event.getEndTime() != null && event.getEndTime().toString().length() > 0
                && !Objects.equals(event.getEndTime(), repoEvent.getEndTime())
        ) {
            repoEvent.setEndTime(event.getEndTime());
        }
    }
}
