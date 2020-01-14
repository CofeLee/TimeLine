package com.cofe.timeline.Activity;

import android.content.ContentValues;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.cofe.timeline.Database.Data;
import com.cofe.timeline.Database.DatabaseHelper;
import com.cofe.timeline.R;

import java.util.ArrayList;

public class YugeActivity extends AppCompatActivity implements View.OnClickListener {

    private Spinner spinner1, spinner2;
    private Button database_button, data_button, getrxy, getrmse;
    private TextView result;

    private DatabaseHelper databaseHelper = null;
    private SQLiteDatabase db = null;
    private String[] param;
    private ArrayAdapter adapter;
    private int p1 = 0, p2 = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_yuge);
        init();
    }

    public void init() {
        spinner1 = findViewById(R.id.spinner1);
        spinner2 = findViewById(R.id.spinner2);
        database_button = findViewById(R.id.init_database);
        data_button = findViewById(R.id.init_data);
        getrxy = findViewById(R.id.getrxy);
        getrmse = findViewById(R.id.getrmse);
        result = findViewById(R.id.result);
        database_button.setOnClickListener(this);
        data_button.setOnClickListener(this);
        getrxy.setOnClickListener(this);
        getrmse.setOnClickListener(this);
        param = new String[]{"致密度", "r", "δr", "D.r", "γ", "χ", "Δχ", "VEC", "ΔH(KJ/mol)", "ΔS(J/K/mol)", "Ω", "Λ", "D.χ", "G", "η", " δG", "D.G", "w"};
        adapter = new ArrayAdapter<>(YugeActivity.this, R.layout.support_simple_spinner_dropdown_item, param);
        spinner1.setAdapter(adapter);
        spinner2.setAdapter(adapter);
        spinner1.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                switch (adapter.getItem(position).toString()) {
                    case "致密度":
                        p1 = 1;
                        break;
                    case "r":
                        p1 = 2;
                        break;
                    case "δr":
                        p1 = 3;
                        break;
                    case "D.r":
                        p1 = 4;
                        break;
                    case "γ":
                        p1 = 5;
                        break;
                    case "χ":
                        p1 = 6;
                        break;
                    case "Δχ":
                        p1 = 7;
                        break;
                    case "VEC":
                        p1 = 8;
                        break;
                    case "ΔH(KJ/mol)":
                        p1 = 9;
                        break;
                    case "ΔS(J/K/mol)":
                        p1 = 10;
                        break;
                    case "Ω":
                        p1 = 11;
                        break;
                    case "Λ":
                        p1 = 12;
                        break;
                    case "D.χ":
                        p1 = 13;
                        break;
                    case "G":
                        p1 = 14;
                        break;
                    case "η":
                        p1 = 15;
                        break;
                    case "δG":
                        p1 = 16;
                        break;
                    case "D.G":
                        p1 = 17;
                        break;
                    case "w":
                        p1 = 18;
                        break;
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
        spinner2.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                switch (adapter.getItem(position).toString()) {
                    case "致密度":
                        p2 = 1;
                        break;
                    case "r":
                        p2 = 2;
                        break;
                    case "δr":
                        p2 = 3;
                        break;
                    case "D.r":
                        p2 = 4;
                        break;
                    case "γ":
                        p2 = 5;
                        break;
                    case "χ":
                        p2 = 6;
                        break;
                    case "Δχ":
                        p2 = 7;
                        break;
                    case "VEC":
                        p2 = 8;
                        break;
                    case "ΔH(KJ/mol)":
                        p2 = 9;
                        break;
                    case "ΔS(J/K/mol)":
                        p2 = 10;
                        break;
                    case "Ω":
                        p2 = 11;
                        break;
                    case "Λ":
                        p2 = 12;
                        break;
                    case "D.χ":
                        p2 = 13;
                        break;
                    case "G":
                        p2 = 14;
                        break;
                    case "η":
                        p2 = 15;
                        break;
                    case "δG":
                        p2 = 16;
                        break;
                    case "D.G":
                        p2 = 17;
                        break;
                    case "w":
                        p2 = 18;
                        break;
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.init_database:
                Toast.makeText(YugeActivity.this, "初始化数据库...", Toast.LENGTH_LONG).show();
                databaseHelper = new DatabaseHelper(YugeActivity.this, "test_db", null, 1);
                break;
            case R.id.init_data:
                Toast.makeText(YugeActivity.this, "初始化数据...", Toast.LENGTH_LONG).show();
                db = databaseHelper.getWritableDatabase();
                String sql = "delete from test";
                db.execSQL(sql);
                ContentValues values = new ContentValues();
                Data data = new Data();
                for (int i = 0; i < 80; i++) {
                    values.put("id", i + 1);
                    values.put("param1", data.x1[i]);
                    values.put("param2", data.x2[i]);
                    values.put("param3", data.x3[i]);
                    values.put("param4", data.x4[i]);
                    values.put("param5", data.x5[i]);
                    values.put("param6", data.x6[i]);
                    values.put("param7", data.x7[i]);
                    values.put("param8", data.x8[i]);
                    values.put("param9", data.x9[i]);
                    values.put("param10", data.x10[i]);
                    values.put("param11", data.x11[i]);
                    values.put("param12", data.x12[i]);
                    values.put("param13", data.x13[i]);
                    values.put("param14", data.x14[i]);
                    values.put("param15", data.x15[i]);
                    values.put("param16", data.x16[i]);
                    values.put("param17", data.x17[i]);
                    values.put("param18", data.x18[i]);
                    db.insert("test", null, values);
                }
                break;
            case R.id.getrxy:
                if (p1 == 0 || p2 == 0) {
                    Toast.makeText(YugeActivity.this, "请选择参数", Toast.LENGTH_SHORT).show();
                } else {
                    ArrayList<Double> array1 = new ArrayList<>();
                    ArrayList<Double> array2 = new ArrayList<>();
                    double pa1, pa2;
                    db = databaseHelper.getWritableDatabase();
                    //创建游标对象
                    Cursor cursor = db.query("test", new String[]{"id", "param1", "param2", "param3", "param4", "param5", "param6", "param7", "param8",
                                    "param9", "param10", "param11", "param12", "param13", "param14", "param15", "param16", "param17", "param18"},
                            null, null, null, null, null);
                    //利用游标遍历所有数据对象
                    while (cursor.moveToNext()) {
                        pa1 = Double.parseDouble(cursor.getString(cursor.getColumnIndex("param" + p1)));
                        pa2 = Double.parseDouble(cursor.getString(cursor.getColumnIndex("param" + p2)));
                        array1.add(pa1);
                        array2.add(pa2);
                    }
                    result.setText("Rxy = " + getRxy(array1, array2));
                }
                break;
            case R.id.getrmse:
                break;
        }
    }

    public double getRxy(ArrayList<Double> array1, ArrayList<Double> array2) {
        double sum = 0;
        double average_x, average_y, biaozhuncha_x, biaozhuncha_y;
        average_x = average(array1);
        average_y = average(array2);
        biaozhuncha_x = standardDeviation(array1, average_x);
        biaozhuncha_y = standardDeviation(array2, average_y);
        for (int i = 0; i < array1.size(); i++) {
            sum = sum + (array1.get(i) - average_x) * (array2.get(i) - average_y);
        }
        return sum / ((array1.size() - 1) * biaozhuncha_x * biaozhuncha_y);
    }

    public static double average(ArrayList<Double> array) {
        double sum = 0;
        for (int i = 0; i < array.size(); i++) {
            sum = sum + array.get(i);
        }
        return sum / array.size();
    }

    public static double standardDeviation(ArrayList<Double> array, double average) {
        double sum = 0;
        for (int i = 0; i < array.size(); i++) {
            sum = sum + Math.pow((array.get(i) - average), 2);
        }
        return Math.sqrt(sum / array.size());
    }

    public static double getRMSE(ArrayList<Double> array, double y) {
        double sum = 0;
        for (int i = 0; i < array.size(); i++) {
            sum = sum + Math.pow(array.get(i) - y, 2);
        }
        return Math.sqrt(sum / array.size());
    }
}
