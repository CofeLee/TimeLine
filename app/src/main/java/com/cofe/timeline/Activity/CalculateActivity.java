package com.cofe.timeline.Activity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.cofe.timeline.Base.BaseActivity;
import com.cofe.timeline.R;

import java.text.DecimalFormat;

public class CalculateActivity extends BaseActivity {

    private EditText month_capital, year, total_year, rate;
    private TextView total_money;
    private Button submit;

    double money, in_year, all_year, rate1, result;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calculate);

        init();
    }

    public void init() {
        month_capital = findViewById(R.id.month_capital);
        year = findViewById(R.id.year);
        total_year = findViewById(R.id.total_year);
        rate = findViewById(R.id.rate);
        total_money = findViewById(R.id.total_money);
        submit = findViewById(R.id.submit);

        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (checkParam()) {
                    calculate();
                }
            }
        });
    }

    public Boolean checkParam() {
        if (month_capital.getText().toString().equals("") || month_capital == null) {
            Toast.makeText(this, "请输入每月定投金额", Toast.LENGTH_SHORT).show();
            return false;
        }
        if (year.getText().toString().equals("") || year == null) {
            Toast.makeText(this, "请输入投资本金年限", Toast.LENGTH_SHORT).show();
            return false;
        }
        if (total_year.getText().toString().equals("") || total_year == null) {
            Toast.makeText(this, "请输入投资总年限", Toast.LENGTH_SHORT).show();
            return false;
        }
        if (rate.getText().toString().equals("") || rate == null) {
            Toast.makeText(this, "请输入平均年收益率", Toast.LENGTH_SHORT).show();
            return false;
        }
        if (Double.parseDouble(year.getText().toString().trim()) > Double.parseDouble(total_year.getText().toString().trim())) {
            Toast.makeText(this, "投资本金年限要小于投资总年限，请重新输入", Toast.LENGTH_SHORT).show();
            year.setText("");
            total_year.setText("");
            return false;
        }
        return true;
    }

    public void calculate() {

        money = Double.parseDouble(month_capital.getText().toString().trim());
        in_year = Double.parseDouble(year.getText().toString().trim());
        all_year = Double.parseDouble(total_year.getText().toString().trim());
        rate1 = Double.parseDouble(rate.getText().toString().trim());

        result = money * 12;
        for (int i = 0; i < in_year - 1; i++) {
            result = result * (1 + rate1 * 0.01) + money * 12;
        }
        for (int i = 0; i < all_year - in_year; i++) {
            result = result * (1 + rate1 * 0.01);
        }

        DecimalFormat df = new DecimalFormat("#.00");
        df.format(result);
        total_money.setText(result + "");
    }
}
