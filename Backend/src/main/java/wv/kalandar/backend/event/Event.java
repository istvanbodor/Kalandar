package wv.kalandar.backend.event;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "EVENTS")
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

    public Event(String event, LocalDateTime startTime, LocalDateTime endTime, boolean isFullDay, String category) {
        this.event = event;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isFullDay = isFullDay;
        this.category = category;
    }

    public Event(Long id, String event, LocalDateTime startTime, LocalDateTime endTime, boolean isFullDay, String category) {
        this.id = id;
        this.event = event;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isFullDay = isFullDay;
        this.category = category;
    }
}
