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

    private TextView start,result;
    private Button test;
    private boolean canpr = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        init();
    }

    private void init() {
        start = findViewById(R.id.start);
        result = findViewById(R.id.result);
        test = findViewById(R.id.test);

        start.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, StartActivity.class));
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
