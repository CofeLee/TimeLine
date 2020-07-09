package com.cofe.timeline.ThreadPool;

public abstract class RunWithPriority implements Runnable {
    public int priority;

    public RunWithPriority(int priority) {
        this.priority = priority;
    }

    public int getPriority() {
        return priority;
    }
}
