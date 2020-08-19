package com.cofe.timeline.Activity;

import android.app.Dialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.cofe.timeline.Base.BaseActivity;
import com.cofe.timeline.R;
import com.cofe.timeline.Utils.MyDialog;
import com.cofe.timeline.Utils.Utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.CountDownLatch;

public class MainActivity extends BaseActivity {

    private TextView result;
    private Button test, to_revolve, to_drawline, to_calculate, to_slide, to_yuge, to_menu, to_cache,
            to_bind, to_antiShake, to_threadPool, to_webview, to_ui, goto_icbc, open_dialog;
    private boolean canpr = true;

    private long exitTime = 0;

    private static Dialog dialog;

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
        to_cache = findViewById(R.id.to_cache);
        to_bind = findViewById(R.id.to_bind);
        to_antiShake = findViewById(R.id.to_antiShake);
        to_threadPool = findViewById(R.id.to_threadPool);
        to_webview = findViewById(R.id.to_webview);
        to_ui = findViewById(R.id.to_ui);
        goto_icbc = findViewById(R.id.goto_icbc);
        open_dialog = findViewById(R.id.open_dialog);

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

        to_cache.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, CacheActivity.class));
            }
        });

        to_bind.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, BindActivity.class));
            }
        });

        to_antiShake.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, AntiShakeActivity.class));
            }
        });

        to_threadPool.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, ThreadPoolActivity.class));
            }
        });

        to_webview.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, WebViewActivity.class));
            }
        });

        to_ui.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, UIActivity.class));
            }
        });

        goto_icbc.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Utils.openAppByUrlScheme(MainActivity.this, "icbcabroadbank://com.icbc.abroadbank.launch/loginICBC?langCode=zh-CN&areaCode=0119&abc=1");
            }
        });

        open_dialog.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                show();
                show();
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

    private static int account = 0;

    public void show(){
        if (dialog != null) {
            dialog.dismiss();
            dialog.cancel();
            dialog = null;
        }
        dialog = new MyDialog(MainActivity.this);
        dialog.setContentView(R.layout.loading_ether_cancel);
        TextView tv_loading = (TextView) dialog.findViewById(R.id.tv_loading);
        tv_loading.setText("This is Dialog..." + account++);
        Log.e("cofe", "当前dialog：" + account);
        dialog.show();
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == event.KEYCODE_BACK) {
            exit();
            return false;
        }
        return super.onKeyDown(keyCode, event);
    }

    public void exit() {
        if ((System.currentTimeMillis() - exitTime) > 2000) {
            Toast.makeText(this, "再按一次退出程序", Toast.LENGTH_SHORT).show();
            exitTime = System.currentTimeMillis();
        } else {
            finish();
            System.exit(0);
        }
    }

//    public static void main(String[] args) {
//        for (int i = 0; i < 100; i++)
//            new ReaderThread().start();
//        number = 42;
//        ready = true;
//    }
//
//    private static boolean ready;
//    private static int number;
//
//    private static class ReaderThread extends Thread {
//        @Override
//        public void run() {
//            while (!ready) {
//                Thread.yield();
//            }
//            System.out.println("number is " + number);
//        }
//    }
}
