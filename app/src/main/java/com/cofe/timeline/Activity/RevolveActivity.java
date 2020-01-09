package com.cofe.timeline.Activity;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.cofe.timeline.R;
import com.cofe.timeline.Screenshot.ScreenShotManager;

public class RevolveActivity extends AppCompatActivity {

    private Button left, right;
    private int status = 1;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start);

        init();
    }

    private void init() {
        left = findViewById(R.id.turn_left);
        right = findViewById(R.id.turn_right);

        left.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                revolve(RevolveActivity.this, -1);
            }
        });

        right.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                revolve(RevolveActivity.this, 1);
            }
        });
    }

    public void revolve(Activity activity, int change) {
        status = (status + change) % 4;
        Log.e("1111", status + "");
        switch (status) {
            case 1:
            case -3:
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
                break;
            case 2:
            case -2:
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
                break;
            case 3:
            case -1:
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_REVERSE_PORTRAIT);
                break;
            case 0:
                activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE);
                break;
            default:
                break;
        }
//        //判断并设置用户点击全屏/半屏按钮的显示逻辑
//        if (change == 1) {
//            //如果屏幕当前是横屏显示，则设置屏幕锁死为竖屏显示
//            activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
//        } else if (change == -1) {
//            //如果屏幕当前是竖屏显示，则设置屏幕锁死为横屏显示
//            activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
//        }
    }


}
