package com.cofe.timeline.Utils;

import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

public class MyDialog extends Dialog {
    public MyDialog(@NonNull Context context) {
        super(context);
    }

    public MyDialog(@NonNull Context context, int themeResId) {
        super(context, themeResId);
    }

    protected MyDialog(@NonNull Context context, boolean cancelable, @Nullable OnCancelListener cancelListener) {
        super(context, cancelable, cancelListener);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.e("cofe", "dialog onCreate");
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.e("cofe", "dialog onStart");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.e("cofe", "dialog onStop");
    }

    @Override
    public void create() {
        super.create();
        Log.e("cofe", "dialog create");
    }

    @Override
    public void show() {
        super.show();
        Log.e("cofe", "dialog show");
    }

    @Override
    public void hide() {
        super.hide();
        Log.e("cofe", "dialog hide");
    }

    @Override
    public void dismiss() {
        super.dismiss();
        Log.e("cofe", "dialog dismiss");
    }

    @Override
    public void cancel() {
        super.cancel();
        Log.e("cofe", "dialog cancel");
    }
}
