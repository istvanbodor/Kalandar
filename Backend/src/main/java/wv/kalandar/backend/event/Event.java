package wv.kalandar.backend.event;

import jakarta.persistence.*;
import lombok.Builder;
import org.springframework.lang.NonNull;
import wv.kalandar.backend.address.Address;
import wv.kalandar.backend.user.User;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "EVENTS")
@Builder
public class Event {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="event")
    private String event;

    @Column(name = "start_time")
    private LocalDateTime startTime;
    @Column(name = "end_time")
    private LocalDateTime endTime;
    @Column(name = "is_fullday")
    private boolean isFullDay;
    @Column(name = "category")
    private String category;

    @JoinColumn(name = "user_id")
    @ManyToOne
    private User user;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Event(Long id, String event, LocalDateTime startTime, LocalDateTime endTime, boolean isFullDay, String category, User user, Address address) {
        this.id = id;
        this.event = event;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isFullDay = isFullDay;
        this.category = category;
        this.user = user;
        this.address = address;
    }

    public Event(String event, LocalDateTime startTime, LocalDateTime endTime, boolean isFullDay, String category, User user) {
        this.event = event;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isFullDay = isFullDay;
        this.category = category;
        this.user = user;
    }

    public Event(String event, LocalDateTime startTime, LocalDateTime endTime, boolean isFullDay, String category, User user, Address address) {
        this.event = event;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isFullDay = isFullDay;
        this.category = category;
        this.user = user;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(int Long) {
        this.id = id;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public boolean getFullDay() {
        return isFullDay;
    }

    public void setFullDay(boolean fullDay) {
        isFullDay = fullDay;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Event() {
    }


}
