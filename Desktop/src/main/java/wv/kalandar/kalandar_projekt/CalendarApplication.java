package wv.kalandar.kalandar_projekt;

import javafx.application.Application;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.image.Image;
import javafx.stage.Stage;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class CalendarApplication extends Application {
    long lastRefreshTime = 0;
    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(CalendarApplication.class.getResource("calendar-view.fxml"));
        Scene scene = new Scene(fxmlLoader.load());
        stage.setTitle("Kalandár");
        stage.getIcons().add(new Image("/icon.png"));
        stage.setResizable(false);
        stage.setScene(scene);
        stage.show();

        datumGeneralas();
    }

    public static void main(String[] args) {
        launch();
    }

private Parent root;
    public void datumGeneralas() throws IOException {

        Date date = new Date();
        System.out.println(date);


        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
        System.out.println(sdf.format(date));

        Integer dateYear = Integer.parseInt(sdf.format(date).split("/")[0]);
        System.out.println(dateYear);

        Integer dateMonth = Integer.parseInt(sdf.format(date).split("/")[1]);
        System.out.println(dateMonth);

        Integer dateDay = Integer.parseInt(sdf.format(date).split("/")[2]);
        System.out.println(dateDay);
        System.out.println();

        Integer lastDayOfMonth = Calendar.getInstance().getActualMaximum(Calendar.DAY_OF_MONTH);
        System.out.println(lastDayOfMonth);

        Calendar firstDayOfMonth = Calendar.getInstance();


        String[] days = new String[] { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" };
        System.out.println(firstDayOfMonth.get(Calendar.DAY_OF_WEEK)-1);

        Integer firstDay = firstDayOfMonth.get(Calendar.DAY_OF_WEEK)-1;

        naptarDatum(firstDay, lastDayOfMonth);
    }

    public void initialize() throws IOException {
        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(getClass().getResource("calendar-view.fxml"));
        root = loader.load();

        SceneController sceneController = loader.getController();
        sceneController.changeButtonText("13");
    }

    public void naptarDatum(Integer firstDayName, Integer lastDayOfMonth) {
        Integer counter = 1;
        Integer firstDay = firstDayName-1;

        for (int i = 0; i < 6; i++) {
            for (int j = 0; j < 7; j++) {
                if (j < firstDay){
                    System.out.print("x ");
                }
                else if (counter <= lastDayOfMonth) {
                    System.out.print(counter + " ");
                    counter++;
                    firstDay = 0;
                }
            }
            System.out.println("\n");
        }
        System.out.println(firstDayName);


    }

}