package wv.kalandar.backend.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {

    private String lastName;
    private String firstName;
    private String username;
    private Role role;
    private Long id;
    private String email;



}
