/*
package wv.kalandar.backend.address;

import net.snowflake.client.jdbc.internal.apache.arrow.flatbuf.Int;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping(path = "/api/address")
public class AddressController {

    public final AddressService addressService;

    @Autowired
    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping
    public List<Address> getAddresses() {
        return this.addressService.getAddresses();
    }

    @PostMapping
    public void addUser(@RequestBody Address address) {
        try {
            addressService.addNewAddress(address);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path = "{addressId}")
    public void deleteAddress(@PathVariable("addressId") Long addressId) {
        addressService.deleteAddress(addressId);
    }

    @PutMapping(path = "{addressId}")
    public void updateAddress(@PathVariable("addressId") Long addressId, @RequestBody Address address) {
        try {
            addressService.updateAddress(addressId, address);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

}
*/