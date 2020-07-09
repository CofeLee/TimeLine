package com.cofe.timeline.Activity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import androidx.annotation.Nullable;

import com.cofe.timeline.Base.BaseActivity;
import com.cofe.timeline.R;
import com.cofe.timeline.ThreadPool.ComparePriority;
import com.cofe.timeline.ThreadPool.RunWithPriority;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.Executor;
import java.util.concurrent.PriorityBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class ThreadPoolActivity extends BaseActivity {
    private TextView pool;
    PriorityBlockingQueue<Runnable> queue = new PriorityBlockingQueue<Runnable>(20, new ComparePriority());
    final Executor threadPoolExecutor = new ThreadPoolExecutor(1, 1, 1, TimeUnit.SECONDS, queue);
    Date date = new Date();
    SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_threadpool);
        pool = findViewById(R.id.pool);
        pool.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    newThread(1, 1);
                    newThread(2, 2);
                    newThread(3, 3);
                    newThread(4, 2);
                    newThread(5, 3);
                    newThread(6, 1);
                    newThread(7, 2);
                    newThread(8, 3);
                    newThread(9, 2);
                    newThread(10, 1);
                    newThread(11, 2);
                    newThread(12, 4);
                    newThread(13, 3);
                    newThread(14, 2);
                    newThread(15, 1);
                    newThread(16, 2);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public void newThread(final int x, int priority) {
        Runnable runnable = new RunWithPriority(priority) {
            @Override
            public void run() {
                try {
                    Log.e("pool", "线程" + x + "开始  当前线程：" + Thread.currentThread().getName() + "  优先级：" + priority);
                    Thread.sleep(3000);
                    Log.e("pool", "线程" + x + "结束  当前线程：" + Thread.currentThread().getName() + "  优先级：" + priority);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };
        threadPoolExecutor.execute(runnable);
    }
}
