package wv.kalandar.backend.user;

import jakarta.persistence.*;

@Entity
@Table(name = "USERS")

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int Id;
    @Column(name = "last_name")
    private String LastName;
    @Column(name = "first_name")
    private String FirstName;
    @Column(name = "username")
    private String Username;
    @Column(name = "password")
    private String Password;
    @Column(name = "email")
    private String Email;
    @Column(name = "is_admin")
    private boolean IsAdmin;


    public User(String LastName, String FirstName, String username, String password, String email, boolean isAdmin) {
        this.LastName = LastName;
        this.FirstName = FirstName;
        this.Username = username;
        this.Password = password;
        this.Email = email;
        this.IsAdmin = isAdmin;
    }

    public User() {
    }

    public User(int id, String LastName, String FirstName, String username, String password, String email, boolean isAdmin) {
        this.Id = id;
        this.LastName = LastName;
        this.FirstName = FirstName;
        this.Username = username;
        this.Password = password;
        this.Email = email;
        this.IsAdmin = isAdmin;
    }

    public long getId() {
        return Id;
    }

    public void setId(int id) {
        this.Id = id;
    }

    public String getLastName() {
        return LastName;
    }

    public void setLastName(String last_name) {
        this.LastName = last_name;
    }

    public String getFirstName() {
        return FirstName;
    }

    public void setFirstName(String first_name) {
        this.FirstName = first_name;
    }

    public String getUsername() {
        return Username;
    }

    public void setUsername(String username) {
        this.Username = username;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        this.Password = password;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        this.Email = email;
    }

    public boolean isAdmin() {
        return IsAdmin;
    }

    public void setAdmin(boolean admin) {
        IsAdmin = admin;
    }
}
