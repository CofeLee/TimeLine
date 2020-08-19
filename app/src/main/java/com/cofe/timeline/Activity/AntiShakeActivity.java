package com.cofe.timeline.Activity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.cofe.timeline.Base.AntiShakeClick;
import com.cofe.timeline.Base.BaseActivity;
import com.cofe.timeline.R;

public class AntiShakeActivity extends BaseActivity {
    private int count1 = 0, count2 = 0, count3 = 0;
    private Button btn1, btn2;
    private TextView btn1Text, btn2Text;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_antishake);
        btn1 = findViewById(R.id.btn1);
        btn2 = findViewById(R.id.btn2);
        btn1Text = findViewById(R.id.btn1_text);
        btn2Text = findViewById(R.id.btn2_text);

        btn1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                btn1Text.setText("普通按钮：" + ++count1);
            }
        });
        btn2.setOnClickListener(new View.OnClickListener() {
            @AntiShakeClick
            @Override
            public void onClick(View v) {
                btn2Text.setText("防抖按钮：" + ++count2);
            }
        });
    }
}
