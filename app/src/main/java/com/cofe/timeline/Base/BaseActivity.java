package com.cofe.timeline.Base;

import android.os.Build;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.cofe.timeline.R;

public class BaseActivity extends AppCompatActivity {

    private Toolbar mToolbar;

    public void initToolbar(String title) {
        mToolbar = findViewById(R.id.toolbar);
//        mToolbar.setPadding(0, getStatusBarHeight(), 0, 0);
        mToolbar.setTitle(title);
        mToolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
    }

    /**
     * 获取状态栏高度
     *
     * @return
     */
    private int getStatusBarHeight() {
        int result = 0;
        int resourceId = getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            result = getResources().getDimensionPixelSize(resourceId);
        }
        return result;
    }

    public static void main(String[] args) {
        System.out.println("15501213728".substring(0, "15501213728".length()-4));
    }
}
