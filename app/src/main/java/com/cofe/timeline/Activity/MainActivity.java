package com.cofe.timeline.Activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.TextView;

import com.cofe.timeline.R;

public class MainActivity extends AppCompatActivity {

    private TextView result;
    private Button test,to_screenshot,to_drawline,to_calculate,to_slide;
    private boolean canpr = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        init();
    }

    private void init() {
        to_screenshot = findViewById(R.id.to_screenshot);
        to_drawline = findViewById(R.id.to_drawline);
        to_calculate = findViewById(R.id.to_calculate);
        result = findViewById(R.id.result);
        test = findViewById(R.id.test);
        to_slide = findViewById(R.id.to_slide);


        to_screenshot.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, StartActivity.class));
            }
        });

        to_drawline.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, DrawLineActivity.class));
            }
        });

        to_calculate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, CalculateActivity.class));
            }
        });

        to_slide.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, SlideActivity.class));
            }
        });

        test.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (canpr == true) {
                    canpr = false;
                    result.setText("不能截屏");
                    getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
                } else if (canpr == false) {
                    canpr = true;
                    result.setText("可以截屏");
                    getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
                }
            }
        });

    }
}
