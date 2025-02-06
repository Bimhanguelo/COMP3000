package live.edunest.rtc.android.java.chats.Activities;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.text.TextUtils;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import live.edunest.rtc.android.java.chats.Models.Subject;
import live.videosdk.rtc.android.java.R;

public class AddSubjectActivity extends AppCompatActivity {

    private EditText subjectName, tutorExperience, subjectDescription, subjectCategory,
            tutorQualifications, hourlyRate, location;
    private ImageView subjectImageView;
    private Button saveButton;
    private FirebaseDatabase database;
    private DatabaseReference subjectsRef;

    private static final int PICK_IMAGE_REQUEST = 1;
    private Uri imageUri;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_subject);

        subjectName = findViewById(R.id.editTextSubjectName);
        tutorExperience = findViewById(R.id.editTextTutorExperience);
        subjectDescription = findViewById(R.id.editTextSubjectDescription);
        subjectCategory = findViewById(R.id.editTextSubjectCategory);
        tutorQualifications = findViewById(R.id.editTextTutorQualifications);
        hourlyRate = findViewById(R.id.editTextHourlyRate);
        location = findViewById(R.id.editTextLocation);
        subjectImageView = findViewById(R.id.imageViewSubjectImage);
        saveButton = findViewById(R.id.buttonSaveSubject);

        database = FirebaseDatabase.getInstance();
        subjectsRef = database.getReference("Subjects");

        subjectImageView.setOnClickListener(v -> openImageChooser());

        saveButton.setOnClickListener(v -> {
            String name = subjectName.getText().toString();
            String experience = tutorExperience.getText().toString();
            String description = subjectDescription.getText().toString();
            String category = subjectCategory.getText().toString();
            String qualifications = tutorQualifications.getText().toString();
            String rate = hourlyRate.getText().toString();
            String loc = location.getText().toString();

            if (!TextUtils.isEmpty(name) && !TextUtils.isEmpty(experience)) {
                String subjectId = subjectsRef.push().getKey();
                Subject subject = new Subject(name, experience, description, category,
                        qualifications, rate, loc, imageUri.toString(), subjectId);

                subjectsRef.child(subjectId).setValue(subject)
                        .addOnCompleteListener(task -> {
                            if (task.isSuccessful()) {
                                Toast.makeText(AddSubjectActivity.this, "Subject added!", Toast.LENGTH_SHORT).show();
                                finish();
                            } else {
//                                Toast.makeText(AddSubjectActivity.this, "Error: " + task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                            }
                        });
            } else {
                Toast.makeText(AddSubjectActivity.this, "Please fill in all fields.", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void openImageChooser() {
        Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        startActivityForResult(intent, PICK_IMAGE_REQUEST);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {
            imageUri = data.getData();
            subjectImageView.setImageURI(imageUri);
        }
    }
}
