package wv.kalandar.backend.event;

import lombok.*;
import wv.kalandar.backend.address.Address;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventDto {

    private String event;
    private LocalDateTime startTime;

    private LocalDateTime endTime;
    private boolean isFullDay;
    private Address address;

    private String category;
}
