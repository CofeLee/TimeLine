package com.cofe.timeline.Activity;

import android.os.Bundle;
import android.view.LayoutInflater;

import androidx.annotation.Nullable;

import com.cofe.timeline.Base.BaseActivity;
import com.cofe.timeline.databinding.ActivityBindBinding;

public class BindActivity extends BaseActivity {

    private ActivityBindBinding activityBindBinding;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        activityBindBinding = ActivityBindBinding.inflate(LayoutInflater.from(this));
    }
}
