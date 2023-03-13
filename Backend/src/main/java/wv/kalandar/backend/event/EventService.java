package wv.kalandar.backend.event;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;
import wv.kalandar.backend.address.Address;
import wv.kalandar.backend.address.AddressRepository;
import wv.kalandar.backend.user.User;
import wv.kalandar.backend.user.UserRepository;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepsoitory eventRepsoitory;

    private final UserRepository userRepository;

    private final AddressRepository addressRepository;

    @Autowired
    public EventService(EventRepsoitory eventRepsoitory, UserRepository userRepository, AddressRepository addressRepository) {
        this.eventRepsoitory = eventRepsoitory;
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
    }

    public List<Event> getEvents() {
        return eventRepsoitory.findAll();
    }


    @Transactional
    public void addNewEvent(Event event) {
        Optional<Event> checkIfEventExists = this.eventRepsoitory.findEventByEventAndStartTime(
                event.getEvent(), event.getStartTime()
        );

        if (checkIfEventExists.isPresent()) {
            throw new IllegalStateException();
        }


        try {
            if (!userRepository.existsById(event.getUser().getId())) {
                throw new IllegalStateException();
            }
        } catch (HttpServerErrorException.InternalServerError e) {
            throw new IllegalStateException();
        }

        if  (event.getAddress() != null) {
            Optional<Address> savedAddress = findSameAddress(event.getAddress());
            event.setAddress(savedAddress.orElseGet(() -> addressRepository.save(event.getAddress())));
        }


        eventRepsoitory.save(event);
    }

    private Optional<Address> findSameAddress(Address address) {
        return addressRepository.
                findAddressByCityAndCountryAndZipAndStreetAndHouseNumber(
                        address.getCity(),
                        address.getCountry(),
                        address.getZip(),
                        address.getStreet(),
                        address.getHouseNumber()
                );
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

    public List<Event> getEventOfUser(Long userId) {

        User user = userRepository.findById(userId).get();

        return eventRepsoitory.findEventByUser(user);

    }
}
