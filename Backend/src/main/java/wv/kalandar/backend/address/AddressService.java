package wv.kalandar.backend.address;

import jakarta.transaction.Transactional;
import net.snowflake.client.jdbc.internal.apache.arrow.flatbuf.Int;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
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

    @Transactional
    public void updateAddress(Long addressId, Address address) {

        Address repoAddress = addressRepository.findById(addressId)
                .orElseThrow(() -> new IllegalStateException());

        if (address.getCity() != null && address.getCity().length() > 0
                && !Objects.equals(address.getCity(), repoAddress.getCity())
        ) {
            repoAddress.setCity(address.getCity());
        }

        if (address.getCountry() != null && address.getCountry().length() > 0
                && !Objects.equals(address.getCountry(), repoAddress.getCountry())
        ) {
            repoAddress.setCountry(address.getCountry());
        }

        if (address.getZip() != null && address.getZip().length()>0
                &&!Objects.equals(address.getZip(), repoAddress.getZip())
        ) {
            repoAddress.setZip(address.getZip());
        }

        if (address.getStreet() != null && address.getStreet().length()>0
                &&!Objects.equals(address.getStreet(), repoAddress.getStreet())
        ) {
            repoAddress.setStreet(address.getStreet());
        }

        if (address.getHouseNumber() != null && address.getHouseNumber().length()>0
                &&!Objects.equals(address.getHouseNumber(), repoAddress.getHouseNumber())
        ) {
            repoAddress.setHouseNumber(address.getHouseNumber());
        }

        addressRepository.save(repoAddress);
    }
}
