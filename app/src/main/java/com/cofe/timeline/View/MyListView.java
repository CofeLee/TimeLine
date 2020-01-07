package com.cofe.timeline.View;

import android.content.Context;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.widget.ListView;

public class MyListView extends ListView {

    public MyListView(Context context) {
        super(context);
    }

    public MyListView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public MyListView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public MyListView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
    }

    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                break;
            case MotionEvent.ACTION_MOVE:
                //禁止拦截触摸事件(允许往下传递)
                requestDisallowInterceptTouchEvent(true);
                break;
            case MotionEvent.ACTION_UP:
            case MotionEvent.ACTION_CANCEL:
                //释放-禁止拦截触摸事件
                requestDisallowInterceptTouchEvent(false);
                break;
            default:
                break;
        }
        return super.dispatchTouchEvent(ev);
    }
}
