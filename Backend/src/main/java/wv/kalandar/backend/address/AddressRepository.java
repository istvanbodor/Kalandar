package wv.kalandar.backend.address;

import net.snowflake.client.jdbc.internal.apache.arrow.flatbuf.Int;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Int> {
}
