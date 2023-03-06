package wv.kalandar.backend.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    private final EventRepsoitory eventRepsoitory;

    @Autowired
    public EventService(EventRepsoitory eventRepsoitory) {
        this.eventRepsoitory = eventRepsoitory;
    }
}
