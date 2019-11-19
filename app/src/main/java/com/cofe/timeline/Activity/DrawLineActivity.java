package com.cofe.timeline.Activity;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.cofe.timeline.R;
import com.cofe.timeline.View.UniformLine;

public class DrawLineActivity extends AppCompatActivity {

    private UniformLine mainView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_drawline);

        mainView = findViewById(R.id.main_view);

        UniformLine uniformLine = new UniformLine(this, 300, 500, 600, 200);


    }
}
