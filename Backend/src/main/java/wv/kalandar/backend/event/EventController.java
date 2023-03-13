package wv.kalandar.backend.event;

import net.snowflake.client.jdbc.internal.apache.arrow.flatbuf.Int;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import wv.kalandar.backend.user.User;

import java.util.List;

@RestController
@RequestMapping(path = "/api/events")
@CrossOrigin
public class EventController {

    public final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<Event> getEvents() {
        return eventService.getEvents();
    }

    @GetMapping(path = "/user/{userId}")
    public List<Event> getEventOfUser(@PathVariable("userId") Long userId) {
        return eventService.getEventOfUser(userId);
    }

    @PostMapping
    public void addNewEvent(@RequestBody Event event) {

        try {
            this.eventService.addNewEvent(event);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path = "{eventId}")
    public void deleteEvent(@PathVariable("eventId") Long eventId ) {
        try {
            eventService.deleteEvent(eventId);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "{eventId}")
    public void updateEvent(@PathVariable("eventId") Long eventId, @RequestBody Event event) {

        try {
            eventService.updateEvent(eventId, event);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

    }

}
