package wv.kalandar.backend.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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


}
