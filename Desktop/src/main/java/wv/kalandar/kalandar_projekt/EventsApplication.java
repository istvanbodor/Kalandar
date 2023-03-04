package wv.kalandar.kalandar_projekt;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.stage.Stage;

import java.io.IOException;

public class EventsApplication extends Application {
    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(EventsApplication.class.getResource("events-view.fxml"));
        Scene scene = new Scene(fxmlLoader.load());
        stage.setTitle("Kalandár");
        stage.setResizable(false);
        stage.setScene(scene);
        stage.show();
    }
}