package live.edunest.rtc.android.java.chats.Activities;


import android.app.Application;

import com.google.firebase.FirebaseApp;

public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        FirebaseApp.initializeApp(this);

    }
}
