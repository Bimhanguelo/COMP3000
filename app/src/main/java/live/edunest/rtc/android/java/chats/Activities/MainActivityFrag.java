package live.edunest.rtc.android.java.chats.Activities;
import android.annotation.SuppressLint;
import android.os.Build;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;
import androidx.viewpager.widget.ViewPager;

import com.google.android.material.tabs.TabLayout;
import com.google.firebase.FirebaseApp;

import live.edunest.rtc.android.java.chats.Fragments.LoginFragment;
import live.edunest.rtc.android.java.chats.Fragments.RegisterFragment;
import live.videosdk.rtc.android.java.R;

public class MainActivityFrag extends AppCompatActivity {
    TextView topText;

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(getResources().getColor(R.color.app_color));
        }
        FirebaseApp.initializeApp(this);
        topText = findViewById(R.id.toptext);
        // Find views
        ViewPager viewPager = findViewById(R.id.viewPager);
        TabLayout tabLayout = findViewById(R.id.tabLayout);

        // Set up ViewPager with PagerAdapter
        viewPager.setAdapter(new PagerAdapter(getSupportFragmentManager()));

        // Connect ViewPager with TabLayout
        tabLayout.setupWithViewPager(viewPager);

        // Set up listener to update topText when tabs are selected
        tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                updateTopText(tab.getPosition());
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {
                // Not needed for your implementation
            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {
                // Not needed for your implementation
            }
        });
    }

    // Method to update the topText based on the selected tab
    private void updateTopText(int position) {
        switch (position) {
            case 0:
                topText.setText("Sign in");
                break;
            case 1:
                topText.setText("New account");
                break;
            default:
                topText.setText("Sign in");
                break;
        }
    }

    private class PagerAdapter extends FragmentPagerAdapter {

        PagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @NonNull
        @Override
        public Fragment getItem(int position) {
            switch (position) {
                case 0:
                    return new LoginFragment();
                case 1:
                    return new RegisterFragment();
                default:
                    return null;
            }
        }

        @Override
        public int getCount() {
            return 2; // Number of fragments
        }

        @Override
        public CharSequence getPageTitle(int position) {
            // Set tab titles
            switch (position) {
                case 0:
                    return "Sign in";
                case 1:
                    return "Signup";
                default:
                    return null;
            }
        }
    }
}
