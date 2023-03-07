package wv.kalandar.backend.address;

import net.snowflake.client.jdbc.internal.apache.arrow.flatbuf.Int;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    @Autowired
    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }


    public List<Address> getAddresses() {
        return addressRepository.findAll();
    }

    public void addNewAddress(Address address) {
        Optional<Address> checkIfAddressExists = this.addressRepository.findAddressByCityAndCountryAndZipAndStreetAndHouseNumber(
                address.getCity(), address.getCountry(), address.getZip(), address.getStreet(), address.getHouseNumber()
        );

        if (checkIfAddressExists.isPresent()) {
            throw new IllegalStateException("Address already exists");
        }

        addressRepository.save(address);
    }

    public void deleteAddress(Long addressId) {
        boolean addressExists = addressRepository.existsById(addressId);
        if (!addressExists) {
            throw new IllegalStateException();
        }
        addressRepository.deleteById(addressId);

    }
}
