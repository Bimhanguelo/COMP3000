package live.edunest.rtc.android.java.chats.Activities;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.squareup.picasso.Picasso;

import java.util.HashMap;

import live.videosdk.rtc.android.java.R;

public class SettingsActivity extends AppCompatActivity {

    private Button UpdateAccountSettings;
    private EditText username,userstatus;
    private ImageView userprofileimage;

    private FirebaseAuth firebaseAuth;
    private DatabaseReference Refdatabase;
    private String currentUserrID;
    private String photoUri;
    private Toolbar toolbar;

    private StorageReference userprofilestoragereference;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);
        firebaseAuth=FirebaseAuth.getInstance();
        currentUserrID=firebaseAuth.getCurrentUser().getUid();
        Refdatabase=FirebaseDatabase.getInstance().getReference();

        userprofilestoragereference= FirebaseStorage.getInstance().getReference().child("Profile Image");

        UpdateAccountSettings=findViewById(R.id.update_settings_button);
        username=findViewById(R.id.set_user_name);
        userstatus=findViewById(R.id.set_profile_status);
        userprofileimage =findViewById(R.id.set_profile_image);
        toolbar=findViewById(R.id.settings_toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowCustomEnabled(true);
        getSupportActionBar().setTitle("Account Settings");

        UpdateAccountSettings.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                UpdateSettings();
            }
        });

        RetrieveUserInfo();

        userprofileimage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent galleryIntent=new Intent();
                galleryIntent.setAction(Intent.ACTION_GET_CONTENT);
                galleryIntent.setType("image/*");
                startActivityForResult(galleryIntent,1);
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 1 && resultCode == RESULT_OK && data != null) {
            Uri imageUri = data.getData(); // Get the selected image URI
            if (imageUri != null) {
                // Define the storage path for the image
                StorageReference filepath = userprofilestoragereference.child(currentUserrID + ".jpg");

                // Upload the image to Firebase Storage
                filepath.putFile(imageUri).addOnSuccessListener(taskSnapshot -> {
                    // Get the download URL of the uploaded image
                    filepath.getDownloadUrl().addOnSuccessListener(uri -> {
                        String downloadUrl = uri.toString();

                        // Save the download URL in the Firebase Database
                        Refdatabase.child("Users").child(currentUserrID).child("image").setValue(downloadUrl)
                                .addOnCompleteListener(task -> {
                                    if (task.isSuccessful()) {
                                        Toast.makeText(SettingsActivity.this, "Image uploaded successfully", Toast.LENGTH_SHORT).show();
                                        photoUri = downloadUrl;
                                        // Load the uploaded image into the ImageView using Picasso
                                        Picasso.get().load(downloadUrl).into(userprofileimage);
                                    } else {
                                        Toast.makeText(SettingsActivity.this, "Failed to save image URL", Toast.LENGTH_SHORT).show();
                                    }
                                });
                    }).addOnFailureListener(e -> {
                        Toast.makeText(SettingsActivity.this, "Failed to get image URL: " + e.getMessage(), Toast.LENGTH_SHORT).show();
                    });
                }).addOnFailureListener(e -> {
                    Toast.makeText(SettingsActivity.this, "Failed to upload image: " + e.getMessage(), Toast.LENGTH_SHORT).show();
                });
            }
        }
    }

    private void UpdateSettings() {

        String setusername=username.getText().toString();
        String setuserstatus=userstatus.getText().toString();

        if(TextUtils.isEmpty(setusername))
        {
            Toast.makeText(SettingsActivity.this,"Please write your user name first...",Toast.LENGTH_SHORT).show();
        }
        else if(TextUtils.isEmpty(setuserstatus))
        {
            Toast.makeText(SettingsActivity.this,"Please write your status first...",Toast.LENGTH_SHORT).show();
        }
        else
        {
            HashMap<String,Object> profileMap= new HashMap<>();
            profileMap.put("uid",currentUserrID);
            profileMap.put("name",setusername);
            profileMap.put("status",setuserstatus);
            profileMap.put("image",photoUri);
            Refdatabase.child("Users").child(currentUserrID).updateChildren(profileMap).addOnCompleteListener(new OnCompleteListener<Void>() {
                @Override
                public void onComplete(@NonNull Task<Void> task) {
                    if(task.isSuccessful())
                    {
                        Toast.makeText(SettingsActivity.this,"Your profile has been updated...",Toast.LENGTH_SHORT).show();
                        sendUserToMainActivity();
                    }
                    else
                    {
                        String errormessage=task.getException().toString();
                        Toast.makeText(SettingsActivity.this,"Error :"+errormessage,Toast.LENGTH_SHORT).show();
                    }
                }
            });

        }
    }
    private void sendUserToMainActivity() {
        Intent mainIntent=new Intent(SettingsActivity.this,MainActivity.class);
        mainIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(mainIntent);
        finish();
    }

    private void RetrieveUserInfo() {

        Refdatabase.child("Users").child(currentUserrID).addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                if(dataSnapshot.exists() && dataSnapshot.hasChild("name") && dataSnapshot.hasChild("image"))
                {
                    String retrieveusername=dataSnapshot.child("name").getValue().toString();
                    String retrieveuserstatus=dataSnapshot.child("status").getValue().toString();
                    String retrieveuserimage=dataSnapshot.child("image").getValue().toString();

                    photoUri=retrieveuserimage;
                    username.setText(retrieveusername);
                    userstatus.setText(retrieveuserstatus);
                    Log.d("1",retrieveuserimage);
                    Picasso.get().load(retrieveuserimage).into(userprofileimage);
                    Log.d("2",String.valueOf(userprofileimage));
                }
                else if(dataSnapshot.exists() && dataSnapshot.hasChild("name"))
                {
                    String retrieveusername=dataSnapshot.child("name").getValue().toString();
                    String retrieveuserstatus=dataSnapshot.child("status").getValue().toString();

                    username.setText(retrieveusername);
                    userstatus.setText(retrieveuserstatus);
                }
                else
                {
                    Toast.makeText(SettingsActivity.this,"Please set and update your profile information...",Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }
}
