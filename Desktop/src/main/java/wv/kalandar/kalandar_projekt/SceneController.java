package wv.kalandar.kalandar_projekt;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.stage.Stage;

import java.io.IOException;

public class SceneController {
   private Stage stage;
   private Scene scene;

   //Kalendár nézetbe lépés
    public void switchToCalendar(ActionEvent event) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(CalendarApplication.class.getResource("calendar-view.fxml"));
        stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        Scene scene = new Scene(fxmlLoader.load());
        stage.setScene(scene);
        stage.show();
    }

    //Események nézetbe lépés
    public void switchToEvents(ActionEvent event) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(CalendarApplication.class.getResource("events-view.fxml"));
        stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        Scene scene = new Scene(fxmlLoader.load());
        stage.setScene(scene);
        stage.show();
    }

    //Login nézetbe lépés
    public void switchToLogin(ActionEvent event) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(CalendarApplication.class.getResource("login-view.fxml"));
        stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        Scene scene = new Scene(fxmlLoader.load());
        stage.setScene(scene);
        stage.show();
    }

    public void switchToRegister(ActionEvent event) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(CalendarApplication.class.getResource("register-view.fxml"));
        stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        Scene scene = new Scene(fxmlLoader.load());
        stage.setScene(scene);
        stage.show();
    }


}