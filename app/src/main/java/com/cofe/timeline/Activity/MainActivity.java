package com.cofe.timeline.Activity;

import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.cofe.timeline.Base.BaseActivity;
import com.cofe.timeline.R;

public class MainActivity extends BaseActivity {

    private TextView result;
    private Button test, to_revolve, to_drawline, to_calculate, to_slide, to_yuge, to_menu;
    private boolean canpr = true;

    private long exitTime = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        init();
    }

    private void init() {
        to_yuge = findViewById(R.id.to_yuge);
        to_revolve = findViewById(R.id.to_revolve);
        to_drawline = findViewById(R.id.to_drawline);
        to_calculate = findViewById(R.id.to_calculate);
        result = findViewById(R.id.result);
        test = findViewById(R.id.test);
        to_slide = findViewById(R.id.to_slide);
        to_menu = findViewById(R.id.to_menu);


        to_yuge.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, YugeActivity.class));
            }
        });

        to_revolve.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, RevolveActivity.class));
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

        to_menu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, MenuActivity.class));
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

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == event.KEYCODE_BACK) {
            exit();
            return false;
        }
        return super.onKeyDown(keyCode, event);
    }

    public void exit(){
        if ((System.currentTimeMillis()-exitTime)>2000){
            Toast.makeText(this,"再按一次退出程序",Toast.LENGTH_SHORT).show();
            exitTime = System.currentTimeMillis();
        }else {
            finish();
            System.exit(0);
        }
    }
}
