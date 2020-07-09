package com.cofe.timeline.Activity;

import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.annotation.Nullable;

import com.cofe.timeline.Base.BaseActivity;
import com.cofe.timeline.R;

public class WebViewActivity extends BaseActivity {

    private WebView webView;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_webview);
        webView = findViewById(R.id.webview);
        webView.setWebViewClient(new WebViewClient(){
            @Nullable
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                Log.e("webview", "url:"+ request.getUrl());
                Log.e("webview", "ua:"+ request.getRequestHeaders().get("User-Agent"));
                return super.shouldInterceptRequest(view, request);
            }
        });
        webView.setWebChromeClient(new WebChromeClient());
        String ua = " mVersion4isOpen=1 androidVersion=4120 ICBCAndroidBS  ICBCAppType=ICBC_GLOBAL appChannel=2 areaInfo=0110|zh-CN mType=2 clientVersionName=4.1.2.0 devFlag=779495a87d42d155cbd4f920507b6f26 kkey=";
        webView.getSettings().setUserAgentString(webView.getSettings().getUserAgentString() + ua);
        webView.loadUrl("https://www.baidu.com/");
//        webView.loadUrl("http://http://emallwb-b2c.dccnet.com.cn:10805/servlet/LoginData?areaCode=0110&dse_locale=zh-CN&pub_QType=0&fPageId=null&deviceId=effa63e3f31f27c1&mType=2");
    }
}
