package wv.kalandar.backend.address;

import jakarta.persistence.*;
import wv.kalandar.backend.event.Event;
import wv.kalandar.backend.user.User;

import java.util.List;


@Entity
@Table(name = "ADDRESSES")
public class Address {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "zip")
    private String zip;

    @Column(name = "city")
    private String city;

    @Column(name = "street")
    private String street;

    @Column(name = "house_number")
    private String houseNumber;

    @Column(name = "country")
    private String country;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Address() {
    }

    public Address(String zip, String city, String street, String houseNumber, String country) {
        this.zip = zip;
        this.city = city;
        this.street = street;
        this.houseNumber = houseNumber;
        this.country = country;
    }

    public Address(Long id, String zip, String city, String street, String houseNumber, String country) {
        this.id = id;
        this.zip = zip;
        this.city = city;
        this.street = street;
        this.houseNumber = houseNumber;
        this.country = country;
    }
}
