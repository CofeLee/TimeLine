package com.cofe.timeline.Activity;

import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.cofe.timeline.Base.BaseActivity;
import com.cofe.timeline.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Stack;

public class SlideActivity extends BaseActivity {

    private ListView listView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_slide);

        listView = findViewById(R.id.lv);
        List<String> list = new ArrayList<>();
        int[] sum = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20};
        for (int i : sum) {
            list.add("TEXT" + i);
        }
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, list);
        listView.setAdapter(adapter);
    }

//    public static void main(String[] args) {
////        System.out.println((int)Math.ceil(10241 / 1024));
//        System.out.println(addTwoNumbers(new ListNode(), new ListNode()));
//    }
//
//    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
//        return l1;
//    }
//
//    public class ListNode {
//        int val;
//        ListNode next;
//
//        ListNode(int x) {
//            val = x;
//        }
//    }
}
