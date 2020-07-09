package com.cofe.timeline.ThreadPool;

import java.util.Comparator;

public class ComparePriority<T extends RunWithPriority> implements Comparator<T> {

    public ComparePriority() {
    }

    @Override
    public int compare(T lhs, T rhs) {
        return rhs.getPriority() - lhs.getPriority();
    }
}