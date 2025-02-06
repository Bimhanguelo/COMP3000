package live.edunest.rtc.android.java.chats.Fragments;

import android.app.DatePickerDialog;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.auth.FirebaseAuth;

import java.util.Calendar;

import live.edunest.rtc.android.java.chats.Activities.MainActivityFrag;
import live.videosdk.rtc.android.java.R;

public class RegisterFragment extends Fragment {

    private Button SignupButton;
    private EditText UserEmail, UserPassword, DateOfBirth;
    private TextView Login;
    private Spinner UserTypeSpinner;

    private FirebaseAuth firebaseAuth;
    private DatabaseReference RootRef;
    private ProgressDialog progressDialog;

    private String selectedUserType;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        // Inflate the fragment layout
        View view = inflater.inflate(R.layout.activity_register, container, false);

        // Initialize FirebaseAuth and DatabaseReference
        firebaseAuth = FirebaseAuth.getInstance();
        RootRef = FirebaseDatabase.getInstance().getReference();

        // Initialize UI elements from the view
        SignupButton = view.findViewById(R.id.register_button);
        UserEmail = view.findViewById(R.id.register_email);
        UserPassword = view.findViewById(R.id.register_password);
        DateOfBirth = view.findViewById(R.id.register_dob); // Add a date of birth EditText
        Login = view.findViewById(R.id.already_have_account_link);
        UserTypeSpinner = view.findViewById(R.id.user_type_spinner); // Spinner for user type

        progressDialog = new ProgressDialog(requireContext());

        // Set up user type spinner
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(
                requireContext(),
                R.array.user_types, // Define this array in strings.xml
                android.R.layout.simple_spinner_item
        );
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        UserTypeSpinner.setAdapter(adapter);

        UserTypeSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                selectedUserType = parent.getItemAtPosition(position).toString();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
                selectedUserType = null;
            }
        });

        // Date picker dialog for DateOfBirth
        DateOfBirth.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openDatePicker();
            }
        });

        // Login link
        Login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SendUserToLoginActivity();
            }
        });

        // Sign-up button
        SignupButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String email = UserEmail.getText().toString();
                String password = UserPassword.getText().toString();
                String dob = DateOfBirth.getText().toString();

                if (TextUtils.isEmpty(email)) {
                    Toast.makeText(requireContext(), "Please enter email...", Toast.LENGTH_SHORT).show();
                } else if (TextUtils.isEmpty(password)) {
                    Toast.makeText(requireContext(), "Please enter password...", Toast.LENGTH_SHORT).show();
                } else if (TextUtils.isEmpty(dob)) {
                    Toast.makeText(requireContext(), "Please select date of birth...", Toast.LENGTH_SHORT).show();
                } else if (selectedUserType == null || selectedUserType.equals("Select user type")) {
                    Toast.makeText(requireContext(), "Please select a user type...", Toast.LENGTH_SHORT).show();
                } else {
                    progressDialog.setTitle("Creating New Account");
                    progressDialog.setMessage("Please wait, while we are creating a new account for you...");
                    progressDialog.setCanceledOnTouchOutside(false);
                    progressDialog.show();

                    firebaseAuth.createUserWithEmailAndPassword(email, password)
                            .addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                                @Override
                                public void onComplete(@NonNull Task<AuthResult> task) {
                                    if (task.isSuccessful()) {
                                        String currentUserID = firebaseAuth.getCurrentUser().getUid();
                                        RootRef.child("Users").child(currentUserID).child("email").setValue(email);
                                        RootRef.child("Users").child(currentUserID).child("dob").setValue(dob);
                                        RootRef.child("Users").child(currentUserID).child("userType").setValue(selectedUserType)
                                                .addOnCompleteListener(new OnCompleteListener<Void>() {
                                                    @Override
                                                    public void onComplete(@NonNull Task<Void> task) {
                                                        SendUserToMainActivity();
                                                        Toast.makeText(requireContext(), "Account created Successfully...", Toast.LENGTH_SHORT).show();
                                                    }
                                                });

                                    } else {
                                        String errorMessage = task.getException().toString();
                                        Toast.makeText(requireContext(), "Error: " + errorMessage, Toast.LENGTH_SHORT).show();
                                    }
                                    progressDialog.dismiss();
                                }
                            });
                }
            }
        });

        return view;
    }

    private void openDatePicker() {
        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH);
        int day = calendar.get(Calendar.DAY_OF_MONTH);

        DatePickerDialog datePickerDialog = new DatePickerDialog(
                requireContext(),
                new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
                        String selectedDate = dayOfMonth + "/" + (month + 1) + "/" + year;
                        DateOfBirth.setText(selectedDate);
                    }
                },
                year,
                month,
                day
        );
        datePickerDialog.show();
    }

    private void SendUserToMainActivity() {
        Intent mainIntent = new Intent(requireContext(), MenuActivity.class);
        mainIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(mainIntent);
    }

    private void SendUserToLoginActivity() {
        Intent loginIntent = new Intent(requireContext(), MainActivityFrag.class);
        startActivity(loginIntent);
    }
}
