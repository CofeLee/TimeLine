package com.cofe.timeline.Activity;

import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.annotation.Nullable;

import com.cofe.timeline.Base.BaseActivity;
import com.cofe.timeline.R;

import java.util.HashMap;

public class WebViewActivity extends BaseActivity {

    private WebView webView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_webview);
        webView = findViewById(R.id.webview);
        webView.setWebViewClient(new WebViewClient(){

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                HashMap<String, String> hashMap = new HashMap<>();
                hashMap.put("User-Agent", "aaaaa");
                view.loadUrl(String.valueOf(request.getUrl()), hashMap);
                return true;
            }

            @Nullable
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                Log.e("webview", "url:"+ request.getUrl());
                Log.e("webview", "ua:"+ request.getRequestHeaders().get("User-Agent"));
//                request.getRequestHeaders().replace("User-Agent", )
                return super.shouldInterceptRequest(view, request);
            }
        });
        webView.setWebChromeClient(new WebChromeClient());
        WebSettings.getDefaultUserAgent(this);
        String ua = " mVersion4isOpen=1 androidVersion=4120 ICBCAndroidBS ICBCAppType=ICBC_GLOBAL appChannel=2 areaInfo=0110|zh-CN mType=2 clientVersionName=4.1.2.0 devFlag=779495a87d42d155cbd4f920507b6f26 kkey=";
//        webView.getSettings().setUserAgentString(webView.getSettings().getUserAgentString() + ua);
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("User-Agent11111", "aaaaa");
        webView.loadUrl("https://www.baidu.com/", hashMap);
//        webView.loadUrl("http://http://emallwb-b2c.dccnet.com.cn:10805/servlet/LoginData?areaCode=0110&dse_locale=zh-CN&pub_QType=0&fPageId=null&deviceId=effa63e3f31f27c1&mType=2");
    }
}
