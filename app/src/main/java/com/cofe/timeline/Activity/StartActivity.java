package com.cofe.timeline.Activity;

import android.os.Bundle;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.cofe.timeline.R;
import com.cofe.timeline.Screenshot.ScreenShotManager;

public class StartActivity extends AppCompatActivity {

    private ScreenShotManager.OnScreenShotListener onScreenShotListener = new ScreenShotManager.OnScreenShotListener() {
        @Override
        public void onShot(String imagePath) {
            Toast.makeText(getApplicationContext(), "来了", Toast.LENGTH_SHORT).show();
        }
    };
    private ScreenShotManager screenShotManager;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start);

        init();
    }

    private void init() {
//        screenShotManager.newInstance(this.getApplication()).startListen();
        screenShotManager.newInstance(this.getApplication(), onScreenShotListener).startListen();
    }

    @Override
    public void onStop(){
        super.onStop();
        if (screenShotManager != null){
            screenShotManager.stopListen();
            screenShotManager = null;
        }
    }
}
