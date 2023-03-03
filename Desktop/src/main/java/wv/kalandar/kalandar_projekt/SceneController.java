package wv.kalandar.kalandar_projekt;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.geometry.Insets;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.CornerRadii;
import javafx.scene.paint.Color;
import javafx.stage.Stage;
import javafx.stage.Window;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class SceneController {
   private Stage stage;

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
    //Register nézetbe lépés
    public void switchToRegister(ActionEvent event) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(CalendarApplication.class.getResource("register-view.fxml"));
        stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        Scene scene = new Scene(fxmlLoader.load());
        stage.setScene(scene);
        stage.show();
    }
    Button[] buttons;

    @FXML
    public void initialize() {
        initializeButtonArray();
    }

    public void initializeButtonArray() {
        buttons = new Button[42];
        buttons[0] = buttonDate0_0;
        buttons[1] = buttonDate0_1;
        buttons[2] = buttonDate0_2;
        buttons[3] = buttonDate0_3;
        buttons[4] = buttonDate0_4;
        buttons[5] = buttonDate0_5;
        buttons[6] = buttonDate0_6;
        buttons[7] = buttonDate1_0;
        buttons[8] = buttonDate1_1;
        buttons[9] = buttonDate1_2;
        buttons[10] = buttonDate1_3;
        buttons[11] = buttonDate1_4;
        buttons[12] = buttonDate1_5;
        buttons[13] = buttonDate1_6;
        buttons[14] = buttonDate2_0;
        buttons[15] = buttonDate2_1;
        buttons[16] = buttonDate2_2;
        buttons[17] = buttonDate2_3;
        buttons[18] = buttonDate2_4;
        buttons[19] = buttonDate2_5;
        buttons[20] = buttonDate2_6;
        buttons[21] = buttonDate3_0;
        buttons[22] = buttonDate3_1;
        buttons[23] = buttonDate3_2;
        buttons[24] = buttonDate3_3;
        buttons[25] = buttonDate3_4;
        buttons[26] = buttonDate3_5;
        buttons[27] = buttonDate3_6;
        buttons[28] = buttonDate4_0;
        buttons[29] = buttonDate4_1;
        buttons[30] = buttonDate4_2;
        buttons[31] = buttonDate4_3;
        buttons[32] = buttonDate4_4;
        buttons[33] = buttonDate4_5;
        buttons[34] = buttonDate4_6;
        buttons[35] = buttonDate5_0;
        buttons[36] = buttonDate5_1;
        buttons[37] = buttonDate5_2;
        buttons[38] = buttonDate5_3;
        buttons[39] = buttonDate5_4;
        buttons[40] = buttonDate5_5;
        buttons[41] = buttonDate5_6;

    }
    @FXML
    public Button buttonDate0_0, buttonDate0_1, buttonDate0_2, buttonDate0_3, buttonDate0_4,
    buttonDate0_5, buttonDate0_6,

    buttonDate1_0, buttonDate1_1, buttonDate1_2, buttonDate1_3, buttonDate1_4,
            buttonDate1_5, buttonDate1_6,

    buttonDate2_0, buttonDate2_1, buttonDate2_2, buttonDate2_3, buttonDate2_4,
            buttonDate2_5, buttonDate2_6,

    buttonDate3_0, buttonDate3_1, buttonDate3_2, buttonDate3_3, buttonDate3_4,
    buttonDate3_5, buttonDate3_6,


    buttonDate4_0, buttonDate4_1, buttonDate4_2, buttonDate4_3, buttonDate4_4, buttonDate4_5, buttonDate4_6,
    buttonDate5_0, buttonDate5_1, buttonDate5_2, buttonDate5_3, buttonDate5_4, buttonDate5_5, buttonDate5_6;
    public void editButtonText(ActionEvent event) throws IOException {
        datumGeneralas();
    }

    public void datumGeneralas() throws IOException {

        Date date = new Date();
//        System.out.println(date);

        // Visszaadja a mai dátumot
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
//        System.out.println(sdf.format(date));

        // Visszaadja a jelenlegi évet
        Integer dateYear = Integer.parseInt(sdf.format(date).split("/")[0]);
//        System.out.println(dateYear);

        // Visszaadja a jelenlegi hónapot
        Integer dateMonth = Integer.parseInt(sdf.format(date).split("/")[1]);
//        System.out.println(dateMonth);

        // Visszaadja a jelenlegi napot
        Integer dateDay = Integer.parseInt(sdf.format(date).split("/")[2]);

        // Visszaadja az utolsó napot INT-ben
        Integer lastDayOfMonth = Calendar.getInstance().getActualMaximum(Calendar.DAY_OF_MONTH);

        //Visszaadja a jelenlegi napot
        Calendar firstDayOfMonth = Calendar.getInstance();

        // Visszaadja a jelenlegi hét napját számban, például szerda = 3
        Integer firstDay = firstDayOfMonth.get(Calendar.DAY_OF_WEEK)-1;


        naptarDatum(firstDay, lastDayOfMonth, dateDay);
    }
    public void naptarDatum(Integer firstDayName, Integer lastDayOfMonth, Integer dateDay) {
        Integer counter = 1;
        Integer firstDay = firstDayName-3;
        Integer indexCounter = 0;
        Integer todayDate = dateDay;
        System.out.println(firstDay);
        for (int i = 0; i < 6; i++) {
            for (int j = 0; j < 7; j++) {
                if (j < firstDay){ // Ha a j index kisebb, mint az adott hónap első napja, akkor X-et rak a helyére
                    buttons[indexCounter].setVisible(false);
                    indexCounter++;

                }
                else if (counter <= lastDayOfMonth) {
                    buttons[indexCounter].setText(counter.toString() + "\n (0 events)");
                    if (counter == todayDate) {
                        buttons[indexCounter].setBackground(new Background(new BackgroundFill(Color.LIGHTGRAY, null, null)));
                    } else {
                        buttons[indexCounter].setBackground(new Background(new BackgroundFill(Color.GREY, null, null)));
                    }

                    counter++;
                    firstDay = 0;
                    indexCounter++;
                } else {
                    buttons[indexCounter].setVisible(false);
                    indexCounter++;
                }
            }
//            System.out.println("\n");
        }
//        System.out.println(firstDayName);
    }
}