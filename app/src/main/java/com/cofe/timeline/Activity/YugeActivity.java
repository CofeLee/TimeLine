package com.cofe.timeline.Activity;

import android.content.ContentValues;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.cofe.timeline.Database.Data;
import com.cofe.timeline.Database.DatabaseHelper;
import com.cofe.timeline.R;

public class YugeActivity extends AppCompatActivity implements View.OnClickListener {

    private Spinner spinner;
    private Button database_button, data_button;
    private DatabaseHelper databaseHelper = null;
    private SQLiteDatabase db = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_yuge);
        init();
    }

    public void init() {
        spinner = findViewById(R.id.spinner);
        data_button = findViewById(R.id.init_data);
        database_button = findViewById(R.id.init_database);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.init_database:
                Toast.makeText(YugeActivity.this, "初始化数据库...", Toast.LENGTH_LONG);
                databaseHelper = new DatabaseHelper(YugeActivity.this, "test_db", null, 1);
            case R.id.init_data:
                Toast.makeText(YugeActivity.this, "初始化数据...", Toast.LENGTH_LONG);
                db = databaseHelper.getWritableDatabase();
                ContentValues values = new ContentValues();
                Data data = new Data();
                for (int i = 0; i < 80; i++) {
                    values.put("no", i);
                    values.put("致密度", data.x1[i]);
                    values.put("r", data.x2[i]);
                    values.put("δr", data.x3[i]);
                    values.put("D.r", data.x4[i]);
                    values.put("γ", data.x5[i]);
                    values.put("χ", data.x6[i]);
                    values.put("Δχ", data.x7[i]);
                    values.put("VEC", data.x8[i]);
                    values.put("ΔH(KJ/mol)", data.x9[i]);
                    values.put("ΔS(J/K/mol)", data.x10[i]);
                    values.put("Ω", data.x11[i]);
                    values.put("Λ", data.x12[i]);
                    values.put("D.χ", data.x13[i]);
                    values.put("G", data.x14[i]);
                    values.put("η", data.x15[i]);
                    values.put("δG", data.x16[i]);
                    values.put("D.G", data.x17[i]);
                    values.put("w", data.x18[i]);
                }
                db.insert("test_db", null, values);
        }
    }

    public void getRxy(double[] array1, double[] array2) {
        double sum = 0;
        double average_x, average_y, biaozhuncha_x, biaozhuncha_y;
        average_x = average(array1);
        average_y = average(array2);
        biaozhuncha_x = standardDeviation(array1, average_x);
        biaozhuncha_y = standardDeviation(array2, average_y);
        for (int i = 0; i < array1.length; i++) {
            sum = sum + (array1[i] - average_x) * (array2[i] - average_y);
        }
        System.out.println("rxy = " + sum / ((array1.length - 1) * biaozhuncha_x * biaozhuncha_y));
    }

    public static double average(double[] array) {
        double sum = 0;
        for (int i = 0; i < array.length; i++) {
            sum = sum + array[i];
        }
        return sum / array.length;
    }

    public static double standardDeviation(double[] array, double average) {
        double sum = 0;
        for (int i = 0; i < array.length; i++) {
            sum = sum + Math.pow((array[i] - average), 2);
        }
        return Math.sqrt(sum / array.length);
    }

    public static double getRMSE(double[] array, double y) {
        double sum = 0;
        for (int i = 0; i < array.length; i++) {
            sum = sum + Math.pow(array[i] - y, 2);
        }
        return Math.sqrt(sum / array.length);
    }
}
