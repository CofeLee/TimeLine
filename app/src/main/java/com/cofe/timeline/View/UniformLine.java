package com.cofe.timeline.View;

import android.animation.AnimatorSet;
import android.animation.ValueAnimator;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.view.View;
import android.view.animation.LinearInterpolator;

public class UniformLine extends View {

    private int x, y, nextX, nextY, incrementY, incrementX;

    public UniformLine(Context context) {
        super(context);
    }

    public UniformLine(Context context, int x, int y, int nextX, int nextY) {
        super(context);
        this.x = x;
        this.y = y;
        this.nextX = nextX;
        this.nextY = nextY;
        init();
    }

    private void init() {
        p = new Paint();
        p.setColor(Color.WHITE);
        p.setAntiAlias(true);
        p.setStrokeWidth(4.0f);


        ValueAnimator valueAnimatorX = ValueAnimator.ofFloat(x, nextX);
        valueAnimatorX.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator animation) {
                incrementX =  Math.round((Float) animation.getAnimatedValue());
                invalidate();
            }
        });

        ValueAnimator valueAnimatorY = ValueAnimator.ofInt(y, nextY);
        valueAnimatorY.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator animation) {
                incrementY = (int) animation.getAnimatedValue();
                invalidate();
            }
        });

        AnimatorSet animatorSet = new AnimatorSet();
        LinearInterpolator ll = new LinearInterpolator();
        animatorSet.setInterpolator(ll);//匀速
        animatorSet.setDuration(2000);
        animatorSet.playTogether(valueAnimatorX, valueAnimatorY);
        animatorSet.start();
    }


    Paint p;


    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.drawLine(Math.round(x), Math.round(y),
                Math.round(incrementX), Math.round(incrementY), p);// 斜线

    }

}