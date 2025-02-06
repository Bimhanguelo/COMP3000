package live.edunest.rtc.android.java.chats.Activities;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.view.Window;
import android.view.WindowManager;

import androidx.appcompat.app.AppCompatActivity;


import com.google.firebase.FirebaseApp;

import live.videosdk.rtc.android.java.R;

public class SplashActivity extends AppCompatActivity {

    private static final long SPLASH_TIME_OUT = 2000; // 2 seconds

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        FirebaseApp.initializeApp(this);

        // Set the status bar color
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(getResources().getColor(R.color.status_bar_color));
        }
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                // Start the next activity after the splash timeout
                Intent intent = new Intent(SplashActivity.this, MainActivityFrag.class);
                startActivity(intent);
                finish(); // Close the splash activity to prevent going back to it
            }
        }, SPLASH_TIME_OUT);
    }

}