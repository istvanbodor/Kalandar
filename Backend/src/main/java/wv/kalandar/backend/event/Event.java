package wv.kalandar.backend.event;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "EVENTS")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int Id;

    @Column(name="event")
    private String Event;

    @Column(name = "start_time")
    private LocalDateTime StartTime;
    @Column(name = "end_time")
    private LocalDateTime EndTime;

    @Column(name = "is_fullday")
    private Boolean IsFullDay;
    @Column(name = "category")
    private String Category;


}
