package wv.kalandar.kalandar_projekt;

import javafx.fxml.FXML;
import javafx.scene.control.Label;

public class EventsController {
    @FXML
    private Label welcomeText;

    @FXML
    protected void onHelloButtonClick() {
        welcomeText.setText("Welcome to JavaFX Application!");
    }
}