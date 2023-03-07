package wv.kalandar.backend.address;

import net.snowflake.client.jdbc.internal.apache.arrow.flatbuf.Int;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {

    Optional<Address> findAddressByCityAndCountryAndZipAndStreetAndHouseNumber(
            String city, String country, String zip, String street, String houseNumber);
}
