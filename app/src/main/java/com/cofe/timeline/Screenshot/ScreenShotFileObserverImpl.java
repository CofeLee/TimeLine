package com.cofe.timeline.Screenshot;

import android.content.Context;
import android.os.Environment;
import android.os.FileObserver;
import android.util.Log;

import androidx.annotation.Nullable;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class ScreenShotFileObserverImpl extends AbsScreenShotResolver {

    private static final String TAG = "ScreenShotFileObserverI";
    // 监控的路径
    private static final String[] paths = new String[]{
            Environment.getExternalStorageDirectory()
                    + File.separator + Environment.DIRECTORY_PICTURES
                    + File.separator + "Screenshots" + File.separator,
            Environment.getExternalStorageDirectory()
                    + File.separator + Environment.DIRECTORY_DCIM
                    + File.separator + "Screenshots" + File.separator,
    };

    // 文件监听对象集合
    private List<FileObserver> mFileObserverList;


    public ScreenShotFileObserverImpl(Context context, ScreenShotManager screenShotManager) {
        super(context);
        mScreenShotManager = screenShotManager;
        mFileObserverList = new ArrayList<>();
    }

    @Override
    public void startListen() {
        stopListen();
        for (String path : paths) {
            if (path != null && path.length() > 0) {
                FileObserver observer = new ScreenShotFileObserver(path);
                observer.startWatching();
                mFileObserverList.add(observer);
            }
        }
    }

    @Override
    public void stopListen() {
        for (FileObserver observer : mFileObserverList) {
            observer.stopWatching();
        }
    }

    private class ScreenShotFileObserver extends FileObserver {

        private String mPath;

        public ScreenShotFileObserver(String path) {
            super(path);
            mPath = path;
            Log.e(TAG, "ScreenShotFileObserver: " + mPath);
        }

        @Override
        public void onEvent(int event, @Nullable String path) {
            Log.e(TAG, "onEvent: "+ event +" : "+ path);
            if (event == FileObserver.CREATE && path != null) {
                if (path.length() > 0) {
                    String result = mPath + path; // 全路径
                    handleRowData(result, FILE_FROM_TYPE);
                }
            }
        }
    }
}