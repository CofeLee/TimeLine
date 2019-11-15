package com.cofe.timeline.Screenshot;

import android.content.Context;
import android.database.ContentObserver;
import android.database.Cursor;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.provider.MediaStore;
import android.util.Log;

import static java.lang.Thread.sleep;

public class MediaContentObserverImpl extends AbsScreenShotResolver {

    private static final String TAG = "MediaContentObserverImp";

    /**
     * 读取媒体数据库时需要读取的列, 其中 WIDTH 和 HEIGHT 字段在 API 16 以后才有
     * 因此在16 之前 可以只查询
     * MediaStore.Images.ImageColumns.DATA,
     * MediaStore.Images.ImageColumns.DATE_TAKEN,
     * 我目前的app是支持范围最低6.0
     */
    private static final String[] MEDIA_PROJECTIONS = {
            MediaStore.MediaColumns._ID,
            MediaStore.Images.ImageColumns.DATA,
            MediaStore.Images.ImageColumns.DATE_TAKEN,
            MediaStore.Images.ImageColumns.WIDTH,
            MediaStore.Images.ImageColumns.HEIGHT,
    };

    /**
     * 内部存储器内容观察者
     */
    private MediaContentObserver mInternalObserver;

    /**
     * 外部存储器内容观察者
     */
    private MediaContentObserver mExternalObserver;

    /**
     * Handler, 用于运行监听器回调
     */
    private final Handler mMainHandler = new Handler(Looper.getMainLooper());

    public MediaContentObserverImpl(Context context, ScreenShotManager screenShotManager) {
        super(context);
        mScreenShotManager = screenShotManager;
    }

    @Override
    public void startListen() {
        // 创建内容观察者
        mInternalObserver = new MediaContentObserver(MediaStore.Images.Media.INTERNAL_CONTENT_URI, mMainHandler);
        mExternalObserver = new MediaContentObserver(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, mMainHandler);
        // 记录开始监听的时间戳
        mStartListenTime = System.currentTimeMillis();
        // 注册内容观察者
        mContext.getContentResolver().registerContentObserver(
                MediaStore.Images.Media.INTERNAL_CONTENT_URI,
                false,
                mInternalObserver
        );
        mContext.getContentResolver().registerContentObserver(
                MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
                false,
                mExternalObserver
        );
    }

    @Override
    public void stopListen() {
        // 注销内容观察者
        if (mInternalObserver != null) {
            mContext.getContentResolver().unregisterContentObserver(mInternalObserver);
        }
        if (mExternalObserver != null) {
            mContext.getContentResolver().unregisterContentObserver(mExternalObserver);
        }
    }

    /**
     * 处理媒体数据库的内容改变
     *
     * @param contentUri uri 地址
     */
    private void handleChange(Uri contentUri) {
        Cursor cursor = null;
        try {
            // 数据改变时查询数据库中最后加入的一条数据
            cursor = mContext.getContentResolver().query(
                    contentUri,
                    MEDIA_PROJECTIONS,
                    null,
                    null,
                    MediaStore.Images.ImageColumns.DATE_ADDED + " desc limit 1"
            );

            if (cursor == null) {
                Log.e(TAG, "Deviant logic.");
                return;
            }
            if (!cursor.moveToFirst()) {
                Log.d(TAG, "Cursor no data.");
                return;
            }


            // 获取各列的索引
            int dataIndex = cursor.getColumnIndex(MediaStore.Images.ImageColumns.DATA);
            int dateTakenIndex = cursor.getColumnIndex(MediaStore.Images.ImageColumns.DATE_TAKEN);
            // 文件索引值
            int ringtoneID = cursor.getInt(cursor.getColumnIndex(MediaStore.MediaColumns._ID));

            // 宽高获取
            int widthIndex = cursor.getColumnIndex(MediaStore.Images.ImageColumns.WIDTH);
            int heightIndex = cursor.getColumnIndex(MediaStore.Images.ImageColumns.HEIGHT);


            // 获取行数据
            String data = cursor.getString(dataIndex);
            long dateTaken = cursor.getLong(dateTakenIndex);
            int width = cursor.getInt(widthIndex);
            int height = cursor.getInt(heightIndex);
            // 获取uri信息
            Uri imageContentUri = Uri.withAppendedPath(contentUri, "" + ringtoneID);
            // 处理获取到的第一行数据
            handleMediaRowData(data, dateTaken, width, height, imageContentUri);

        } catch (Exception e) {
            e.printStackTrace();

        } finally {
            if (cursor != null && !cursor.isClosed()) {
                cursor.close();
            }
        }
    }

    private void handleMediaRowData(String data, long dateTaken, int width, int height, Uri contentUri) {
        if (checkContentData(data, dateTaken, width, height)) {
            Log.d(TAG, "ScreenShot: path = " + data + "; size = " + width + " * " + height
                    + "; date = " + dateTaken + " contentUri = " + contentUri);
            handleRowData(data, CONTENT_FROM_TYPE);
        } else {
            // 数据库有数据改变，规则，则输出到 log
            Log.w(TAG, "Media content changed, but not screenshot: path = " + data
                    + "; size = " + width + " * " + height + "; date = " + dateTaken
                    + " contentUri = " + contentUri);
        }
    }

    /**
     * 媒体内容观察者(观察媒体数据库的改变)
     */
    private class MediaContentObserver extends ContentObserver {

        private Uri mContentUri;

        public MediaContentObserver(Uri contentUri, Handler handler) {
            super(handler);
            mContentUri = contentUri;
        }

        @Override
        public void onChange(boolean selfChange) {
            super.onChange(selfChange);
            handleChange(mContentUri);
        }
    }
}