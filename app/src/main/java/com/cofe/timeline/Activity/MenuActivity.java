package com.cofe.timeline.Activity;

import android.os.Bundle;
import android.view.MotionEvent;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.Nullable;

import com.cofe.timeline.Base.BaseActivity;
import com.cofe.timeline.R;

public class MenuActivity extends BaseActivity {

    private TextView tv2;
    private ViewGroup.MarginLayoutParams params;
    private int top;
    private float y1;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu);
        init();
    }

    public void init() {
        tv2 = findViewById(R.id.tv2);
        params = (ViewGroup.MarginLayoutParams) tv2.getLayoutParams();
        initToolbar("菜单Demo");
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                top = tv2.getTop();
                y1 = event.getY();
                break;
            case MotionEvent.ACTION_MOVE:
                float y = event.getY();
                int abs = (int) (y - y1);
                params.topMargin = top + abs;
                tv2.setLayoutParams(params);
                break;
            case MotionEvent.ACTION_UP:
                break;
        }
        return super.onTouchEvent(event);
    }
}
