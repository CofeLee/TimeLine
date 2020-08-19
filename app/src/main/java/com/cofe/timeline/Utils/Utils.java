package com.cofe.timeline.Utils;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;


public class Utils {
    public static void openAppByPackageName(Context context, String packageName) {
        Intent intent = new Intent();
        intent = context.getPackageManager().getLaunchIntentForPackage(packageName);
        context.startActivity(intent);
    }

    public static void openAppByUrlScheme(Context context, String urlScheme) {
        Intent intent = new Intent();
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setAction(Intent.ACTION_VIEW);
        intent.addCategory(Intent.CATEGORY_DEFAULT);
        intent.setData(Uri.parse(urlScheme));
        context.startActivity(intent);
    }
}
