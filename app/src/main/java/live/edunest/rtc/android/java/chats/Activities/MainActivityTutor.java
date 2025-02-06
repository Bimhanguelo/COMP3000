package live.edunest.rtc.android.java.chats.Activities;

import android.annotation.SuppressLint;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.MenuItem;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.fragment.app.Fragment;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;

import live.edunest.rtc.android.java.Common.Activity.CreateOrJoinActivity;
import live.edunest.rtc.android.java.chats.Fragments.MapActivity;
import live.edunest.rtc.android.java.chats.Fragments.MenuActivity;
import live.edunest.rtc.android.java.chats.Fragments.NotesAdapter;
import live.edunest.rtc.android.java.chats.Models.Fav;
import live.videosdk.rtc.android.java.R;

public class MainActivityTutor extends AppCompatActivity {
        private BottomNavigationView bottomNavigationView;

        private Fragment fragment = null;
        static NotesAdapter adapter ;
        static ArrayList<Fav> courseModalArrayList;
        static SharedPreferences sharedPreferences;

        @SuppressLint("MissingInflatedId")
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main_tutor);
//        startActivity(new Intent(MenuActivity.this,ResultShow.class));


            sharedPreferences = getSharedPreferences("shared preferences", MODE_PRIVATE);


            Gson gson = new Gson();

            String json = sharedPreferences.getString("courses", null);

            Type type = new TypeToken<ArrayList<Fav>>() {}.getType();


            courseModalArrayList = gson.fromJson(json, type);


            if (courseModalArrayList == null) {
                courseModalArrayList = new ArrayList<>();
            }



            adapter = new NotesAdapter(courseModalArrayList, live.edunest.rtc.android.java.chats.Activities.MainActivityTutor.this);





            bottomNavigationView = findViewById(R.id.bottomNavigation);
            bottomNavigationView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
                @Override
                public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                    if (item.getItemId() == R.id.menu_home) {
//                    startActivity(new Intent(MenuActivity.this,ResultShow.class));

                    } else if (item.getItemId() == R.id.menu_settings) {
                        startActivity(new Intent(live.edunest.rtc.android.java.chats.Activities.MainActivityTutor.this, CreateOrJoinActivity.class));

                    } else if (item.getItemId() == R.id.menu_location) {
                        startActivity(new Intent(live.edunest.rtc.android.java.chats.Activities.MainActivityTutor.this, MapActivity.class));

                    } else if (item.getItemId() == R.id.menu_quotes) {
                        startActivity(new Intent(live.edunest.rtc.android.java.chats.Activities.MainActivityTutor.this, MainActivity.class));

                    }

                    if (fragment != null) {
//                    replaceFragment(fragment);
                        return true;
                    } else {
                        return false;
                    }
                }
            });

        }



        @Override
        public void onBackPressed() {
            super.onBackPressed();
//        FragmentManager fm = getSupportFragmentManager();
//        if (fm.getBackStackEntryCount() > 1) {
//            // Pop the fragment from the stack if there is one
//            fm.popBackStack();
//        } else {
            // If there's only one fragment left, show the confirmation dialog
            showExitConfirmationDialog();
            // }
        }

        private void showExitConfirmationDialog() {
            new AlertDialog.Builder(this)
                    .setTitle("Exit")
                    .setMessage("Are you sure you want to exit?")
                    .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            // Exit the app
                            finish();
                        }
                    })
                    .setNegativeButton(android.R.string.no, null)
                    .show();
        }
    }
