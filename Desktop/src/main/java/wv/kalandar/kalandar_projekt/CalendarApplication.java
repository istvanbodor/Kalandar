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

        // Visszaadja a mai dátumot
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
        System.out.println(sdf.format(date));

        // Visszaadja a jelenlegi évet
        Integer dateYear = Integer.parseInt(sdf.format(date).split("/")[0]);
        System.out.println(dateYear);

        // Visszaadja a jelenlegi hónapot
        Integer dateMonth = Integer.parseInt(sdf.format(date).split("/")[1]);
        System.out.println(dateMonth);

        // Visszaadja a jelenlegi napot
        Integer dateDay = Integer.parseInt(sdf.format(date).split("/")[2]);

        // Visszaadja az utolsó napot INT-ben
        Integer lastDayOfMonth = Calendar.getInstance().getActualMaximum(Calendar.DAY_OF_MONTH);

        //Visszaadja a jelenlegi napot
        Calendar firstDayOfMonth = Calendar.getInstance();

        // Visszaadja a jelenlegi hét napját számban, például szerda = 3
        Integer firstDay = firstDayOfMonth.get(Calendar.DAY_OF_WEEK)-1;


        naptarDatum(firstDay, lastDayOfMonth);
    }
    public void naptarDatum(Integer firstDayName, Integer lastDayOfMonth) {
        Integer counter = 1;
        Integer firstDay = firstDayName-1;

        for (int i = 0; i < 6; i++) {
            for (int j = 0; j < 7; j++) {
                if (j < firstDay){ // Ha a j index kisebb, mint az adott hóna első napja, akkor X-et rak a helyére
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