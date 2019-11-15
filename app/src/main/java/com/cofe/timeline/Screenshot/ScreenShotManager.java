package com.cofe.timeline.Screenshot;

import android.app.Application;
import android.content.Context;
import android.os.Looper;

import java.util.ArrayList;
import java.util.List;

public class ScreenShotManager {

    private static final String TAG = "ScreenShotManager";


    /**
     * 已回调过的路径
     */
    private final List<String> sHasCallbackPaths = new ArrayList<String>();

    private Context mContext;

    // 回调监听
    private OnScreenShotListener mListener;

    // contentProvider 监听
    private AbsScreenShotResolver screenShotResolver;
    private AbsScreenShotResolver mFileObserver;

    private ScreenShotManager(Context context) {
        if (context == null) {
            throw new IllegalArgumentException("The context must not be null.");
        }
        mContext = context;
    }

    public static ScreenShotManager newInstance(Application context) {
        assertInMainThread();
        return new ScreenShotManager(context);
    }

    public static ScreenShotManager newInstance(Application context, OnScreenShotListener listener) {
        ScreenShotManager screenShotManager = newInstance(context);
        screenShotManager.setListener(listener);
        return screenShotManager;
    }


    /**
     * 启动监听
     */
    public void startListen() {
        assertInMainThread();

        sHasCallbackPaths.clear();

        // contentProvider 监听
        screenShotResolver = new MediaContentObserverImpl(mContext, this);
        screenShotResolver.startListen();
        // FileObserver 监听
        mFileObserver = new ScreenShotFileObserverImpl(mContext, this);
        mFileObserver.startListen();
    }


    /**
     * 停止监听
     */
    public void stopListen() {
        assertInMainThread();
        if (screenShotResolver != null) {
            screenShotResolver.stopListen();
        }
        if (mFileObserver != null) {
            mFileObserver.stopListen();
        }

        sHasCallbackPaths.clear();
    }


    /**
     * 处理数据
     */
    public void handleData(String data) {
        if (mListener != null && !checkCallback(data)) {
            mListener.onShot(data);
        }
    }


    /**
     * 判断是否已回调过 <br/>
     * 删除一个图片也会发通知, 同时防止删除图片时误将上一张符合截屏规则的图片当做是当前截屏.
     */
    private boolean checkCallback(String imagePath) {
        if (sHasCallbackPaths.contains(imagePath)) {
            return true;
        }
        // 大概缓存20条记录便可
        if (sHasCallbackPaths.size() >= 20) {
            for (int i = 0; i < 5; i++) {
                sHasCallbackPaths.remove(0);
            }
        }
        sHasCallbackPaths.add(imagePath);
        return false;
    }


    /**
     * 设置截屏监听器
     */
    public void setListener(OnScreenShotListener listener) {
        mListener = listener;
    }

    public static interface OnScreenShotListener {
        public void onShot(String imagePath);
    }
    //由于观察者的实现都是在子线程进行的，保证管理者的对象唯一，要求必须在主线程中使用
    private static void assertInMainThread() {
        if (Looper.myLooper() != Looper.getMainLooper()) {
            throw new IllegalStateException("Call the method must be in main thread: ");
        }
    }

}