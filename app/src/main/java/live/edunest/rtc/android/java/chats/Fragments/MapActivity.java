package live.edunest.rtc.android.java.chats.Fragments;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import android.view.MenuItem;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;


import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.List;

import live.edunest.rtc.android.java.chats.Activities.MainActivity;
import live.edunest.rtc.android.java.chats.Models.DataApi;
import live.edunest.rtc.android.java.chats.Models.DataModel;
import live.edunest.rtc.android.java.chats.Models.DataResponse;
import live.videosdk.rtc.android.java.R;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MapActivity extends FragmentActivity implements OnMapReadyCallback {
    private BottomNavigationView bottomNavigationView;

    private GoogleMap googleMap;
    private MapView mapView;
    private LocationManager locationManager;
    String category;
    private Fragment fragment = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_map);
        mapView = findViewById(R.id.mapView);
        mapView.onCreate(savedInstanceState);
        mapView.getMapAsync(this);
        bottomNavigationView = findViewById(R.id.bottomNavigation);
        bottomNavigationView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {

                if (item.getItemId() == R.id.menu_location) {
                    startActivity(new Intent(MapActivity.this,MapActivity.class));

                } else if (item.getItemId() == R.id.menu_quotes) {
                    startActivity(new Intent(MapActivity.this, MainActivity.class));

                }

                if (fragment != null) {
//                    replaceFragment(fragment);
                    return true;
                } else {
                    return false;
                }
            }
        });
        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        // Check if location permissions are granted
        if (checkLocationPermissions()) {
            // Request the current location once
//        new currentlocation().execute();
          static_locations(23.8859,45.0792);
        } else {
            // You may want to request permissions at this point
            requestLocationPermissions();
        }
        // Retrieve the Intent that started this activity
        Intent intent = getIntent();
        // Check if the Intent contains extra data
        if (intent != null && intent.hasExtra("category")) {
            // Retrieve the category data from the Intent
            category = intent.getStringExtra("category");

    }
}


    @Override
    public void onMapReady(GoogleMap map) {
        googleMap = map;
//        googleMap.setOnMarkerClickListener(new GoogleMap.OnMarkerClickListener() {
//            @Override
//            public boolean onMarkerClick(Marker marker) {
//                // Handle marker click event
//                LatLng markerPosition = marker.getPosition();
////                openMapWithDirections(markerPosition.latitude, markerPosition.longitude);
//                return true;
//            }
//        });
    }
    private void openMapWithDirections(double latitude, double longitude) {
        // Create a Uri with the location data
        Uri gmmIntentUri = Uri.parse("google.navigation:q=" + latitude + "," + longitude);

        // Create an Intent to open the map application with directions
        Intent mapIntent = new Intent(Intent.ACTION_VIEW, gmmIntentUri);
        mapIntent.setPackage("com.google.android.apps.maps");

        // Check if the map application is available
        if (mapIntent.resolveActivity(getPackageManager()) != null) {
            // Start the map activity
            startActivity(mapIntent);
        } else {
            // Display a message if the map application is not available
            Toast.makeText(this, "Google Maps app not installed", Toast.LENGTH_SHORT).show();
        }
    }
    private class currentlocation extends AsyncTask<Void, Void, LatLng> {

        @Override
        protected LatLng doInBackground(Void... voids) {
            // Use the last known location for the API call
            if (checkLocationPermissions() && isLocationEnabled()) {
                if (ActivityCompat.checkSelfPermission(MapActivity.this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED &&
                        ActivityCompat.checkSelfPermission(MapActivity.this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                    return null;
                }
                Location lastKnownLocation = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                if (lastKnownLocation != null) {
                    return new LatLng(lastKnownLocation.getLatitude(), lastKnownLocation.getLongitude());
                }
            }
            return null;
        }

        @Override
        protected void onPostExecute(LatLng currentLocation) {
            super.onPostExecute(currentLocation);
            if (currentLocation != null) {
                static_locations(currentLocation.latitude, currentLocation.longitude);
            } else {
                // Handle the case where the current location is not available
                Toast.makeText(MapActivity.this, "Current location not available", Toast.LENGTH_SHORT).show();
            }
        }
    }
    private void static_locations(double latitude, double longitude) {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://maps.googleapis.com/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        DataApi service = retrofit.create(DataApi.class);

        String currentLocation = latitude + "," + longitude;
        Call<DataResponse> call = service.getData(currentLocation, 50000, "dustbin" +
                "", " AIzaSyA6nUwh2fm2UgBLOftKm0n-daVHN7VL20o");

        call.enqueue(new Callback<DataResponse>() {
            @Override
            public void onResponse(Call<DataResponse> call, Response<DataResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<DataModel> dataModels = response.body().getResults();
                    displayHospitalsOnMap(dataModels);
                }
            }

            @Override
            public void onFailure(Call<DataResponse> call, Throwable t) {
                Log.e("TAG", "onFailure called", t);
            }
        });
    }

    private void displayHospitalsOnMap(List<DataModel> dataModels) {
        if (googleMap != null) {
            for (DataModel dataModel : dataModels) {
                LatLng dataLocation = new LatLng(dataModel.getLatitude(), dataModel.getLongitude());
                googleMap.addMarker(new MarkerOptions().position(dataLocation).title(dataModel.getName()));
            }

            // Move the camera to the first hospital
            if (!dataModels.isEmpty()) {
                LatLng firstHospitalLocation = new LatLng(dataModels.get(0).getLatitude(), dataModels.get(0).getLongitude());
                googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(firstHospitalLocation, 15));
            }
        }
    }

    private void displayCurrentLocationOnMap(LatLng currentLocation) {
        if (googleMap != null) {
            googleMap.addMarker(new MarkerOptions().position(currentLocation).title("Current Location"));
            googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(currentLocation, 15));
        }
    }

    private boolean checkLocationPermissions() {
        return ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED &&
                ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED;
    }

    private void requestLocationPermissions() {
        ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION}, 123);
    }

    private boolean isLocationEnabled() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            // Location services are required to be enabled in Android P (API 28) and above
            LocationManager lm = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
            return lm.isLocationEnabled();
        } else {
            // For devices before Android P, check the global location setting
            try {
                int locationMode;
                locationMode = Settings.Secure.getInt(getContentResolver(), Settings.Secure.LOCATION_MODE);
                return locationMode != Settings.Secure.LOCATION_MODE_OFF;
            } catch (Settings.SettingNotFoundException e) {
                e.printStackTrace();
                return false;
            }
        }
    }
}