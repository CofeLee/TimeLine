package com.cofe.timeline.Activity;


import android.os.Bundle;
import android.util.Log;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.annotation.Nullable;

import com.cofe.timeline.Base.BaseActivity;
import com.cofe.timeline.R;

import java.io.InputStream;

public class CacheActivity extends BaseActivity {

    private WebView mWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cache);
        initView();
    }

    private void initView() {
        mWebView = findViewById(R.id.demo_webview);

        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);


        mWebView.setWebViewClient(new MyWebViewClient());

        mWebView.loadUrl("https://www.baidu.com?filename=litingnong");

    }

    private class MyWebViewClient extends WebViewClient {

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            return super.shouldOverrideUrlLoading(view, url);
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            return super.shouldOverrideUrlLoading(view, request);
        }

        @Nullable
        @Override
        public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
            Log.d("MyWebViewClient", url+"已缓存");

            return null;
        }

        @Nullable
        @Override
        public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {

            String url = request.getUrl().toString();
            Log.d("MyWebViewClient", url+"已缓存");
            InputStream inputStream;
            WebResourceResponse response;
            try {
                inputStream = getAssets().open("test/index.html");

                response = new WebResourceResponse("text/html", "UTF-8", inputStream);

            } catch (Exception e) {
                e.printStackTrace();
                response = null;
            }
            return response;
        }
    }
}
