package com.cofe.timeline.Activity;

import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.cofe.timeline.Base.BaseActivity;
import com.cofe.timeline.R;

import java.util.ArrayList;
import java.util.List;

public class SlideActivity extends BaseActivity {

    private ListView listView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_slide);

        listView = findViewById(R.id.lv);
        List<String> list = new ArrayList<>();
        int[] sum = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        for (int i : sum) {
            list.add("TEXT" + i);
        }
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, list);
        listView.setAdapter(adapter);
    }
}
