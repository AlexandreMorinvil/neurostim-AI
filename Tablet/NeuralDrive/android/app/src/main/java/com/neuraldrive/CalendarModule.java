package com.neuraldrive;

import android.util.Log;
// import com.chaquo.python.PyObject;
// import com.chaquo.python.Python;
// import com.chaquo.python.android.AndroidPlatform;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class CalendarModule extends ReactContextBaseJavaModule {
    
    CalendarModule(ReactApplicationContext context) {
        super(context);
        // if (! Python.isStarted()) {
        //     Python.start(new AndroidPlatform(context));
        // }
    }

    @Override
    public String getName() {
        return "CalendarModule";
    }

    @ReactMethod
    public String createCalendarEvent() {
        Log.d("CalendarModule", "Create event");
        
        
        // new Thread( new Runnable() { @Override public void run() {
        //     Python py = Python.getInstance();
        //     //PyObject utilClass = py.getModule("server").get("Server");
        //     PyObject pyobj = py.getModule("server");
        //     //final PyObject pyobj = utilClass.call();
        //     pyobj.callAttr("main");
        // } } ).start();
        return "test";
    }
}
