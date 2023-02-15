module wv.kalandar.kalandar_projekt {
    requires javafx.controls;
    requires javafx.fxml;


    opens wv.kalandar.kalandar_projekt to javafx.fxml;
    exports wv.kalandar.kalandar_projekt;
}