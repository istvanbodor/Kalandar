package wv.kalandar.backend.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import wv.kalandar.backend.address.Address;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EventResponseDto {

    private String username;
    private String event;
    private String category;
    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private boolean isFullDay;

    private Address address;




}
