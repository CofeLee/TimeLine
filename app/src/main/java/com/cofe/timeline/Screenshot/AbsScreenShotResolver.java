package com.cofe.timeline.Screenshot;

import android.content.Context;
import android.graphics.Point;
import android.os.Build;
import android.text.TextUtils;
import android.util.Log;
import android.view.Display;
import android.view.WindowManager;

import java.lang.reflect.Method;

public abstract class AbsScreenShotResolver {
    private static final String TAG = "AbsScreenShotResolver";
    // 截屏依据中的路径判断关键字
    private static final String[] KEYWORDS = {
            "SCREENSHOT", "SCREEN_SHOT", "SCREEN-SHOT", "SCREEN SHOT",
            "SCREENCAPTURE", "SCREEN_CAPTURE", "SCREEN-CAPTURE", "SCREEN CAPTURE",
            "SCREENCAP", "SCREEN_CAP", "SCREEN-CAP", "SCREEN CAP", "截屏"
    };

    public static String CONTENT_FROM_TYPE = "contentFromData";
    public static String FILE_FROM_TYPE = "fileFromData";

    long mStartListenTime;
    protected Context mContext;
    private Point sScreenRealSize;
    protected ScreenShotManager mScreenShotManager;

    AbsScreenShotResolver(Context context) {
        mContext = context;
        // 获取屏幕真实的分辨率
        if (sScreenRealSize == null) {
            sScreenRealSize = getRealScreenSize();
            if (sScreenRealSize != null) {
                Log.d(TAG, "屏幕 Real Size: " + sScreenRealSize.x + " * " + sScreenRealSize.y);
            } else {
                Log.e(TAG, "获取失败");
            }
        }
    }


    public abstract void startListen();

    public abstract void stopListen();


    protected void handleRowData(String data, String fromType) {
        Log.e(TAG, "handleRowData: " + data + " type: " + fromType);
        mScreenShotManager.handleData(data);
    }

    /**
     * 判断指定的数据行是否符合截屏条件
     * content 数据是否符合要求
     */
    boolean checkContentData(String data, long dateTaken, int width, int height) {
        /*
         * 时间判断 2s的间隔
         */
        // 如果加入数据库的时间在开始监听之前, 或者与当前时间相差大于1秒, 则认为当前没有截屏
        if (dateTaken < mStartListenTime || (System.currentTimeMillis() - dateTaken) >  2000) {
            return false;
        }

        /*
         * 尺寸判断 超过屏幕肯定不行
         */
        if (sScreenRealSize != null) {
            // 如果图片尺寸超出屏幕, 则认为当前没有截屏
            if (!((width <= sScreenRealSize.x && height <= sScreenRealSize.y)
                    || (height <= sScreenRealSize.x && width <= sScreenRealSize.y))) {
                return false;
            }
        }

        /*
         *  这个路径判断，其实是认为添加的，但是大部分手机都符合这个路径
         */
        if (TextUtils.isEmpty(data)) {
            return false;
        }
        data = data.toLowerCase();
        // 判断图片路径是否含有指定的关键字之一, 如果有, 则认为当前截屏了
        for (String keyWork : KEYWORDS) {
            if (data.contains(keyWork)) {
                return true;
            }
        }

        return false;
    }

    /**
     * 获取屏幕分辨率
     */
    private Point getRealScreenSize() {
        Point screenSize = null;
        try {
            screenSize = new Point();
            WindowManager windowManager = (WindowManager) mContext.getSystemService(Context.WINDOW_SERVICE);
            Display defaultDisplay = windowManager.getDefaultDisplay();
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
                defaultDisplay.getRealSize(screenSize);
            } else {
                try {
                    Method mGetRawW = Display.class.getMethod("getRawWidth");
                    Method mGetRawH = Display.class.getMethod("getRawHeight");
                    screenSize.set(
                            (Integer) mGetRawW.invoke(defaultDisplay),
                            (Integer) mGetRawH.invoke(defaultDisplay)
                    );
                } catch (Exception e) {
                    screenSize.set(defaultDisplay.getWidth(), defaultDisplay.getHeight());
                    e.printStackTrace();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return screenSize;
    }
}