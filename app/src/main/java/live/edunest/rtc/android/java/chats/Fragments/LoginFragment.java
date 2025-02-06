package live.edunest.rtc.android.java.chats.Fragments;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import live.edunest.rtc.android.java.chats.Activities.PhoneLoginActivity;
import live.videosdk.rtc.android.java.R;

public class LoginFragment extends Fragment {

    private Button LoginButton, PhoneLoginButton;
    private EditText UserEmail, UserPassword;
    private TextView Signup, ForgotPassword;
    private ProgressDialog progressDialog;
    private FirebaseAuth firebaseAuth;
    private DatabaseReference userRef;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        // Inflate the fragment layout
        View view = inflater.inflate(R.layout.activity_login, container, false);
        Log.d("FirebaseInit", "Firebase initialized successfully");

        // Initialize FirebaseAuth and DatabaseReference
       firebaseAuth = FirebaseAuth.getInstance();
        userRef = FirebaseDatabase.getInstance().getReference().child("Users");

        // Initialize UI elements from the view
        LoginButton = view.findViewById(R.id.login_button);
        PhoneLoginButton = view.findViewById(R.id.phone_login_button);
        UserEmail = view.findViewById(R.id.login_email);
        UserPassword = view.findViewById(R.id.login_password);
        Signup = view.findViewById(R.id.need_new_account_link);
        ForgotPassword = view.findViewById(R.id.forget_password_link);
        progressDialog = new ProgressDialog(requireContext());

        // Set up button click listeners
        Signup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sendUserToRegisterActivity();
            }
        });

        PhoneLoginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent phoneIntent = new Intent(requireContext(), PhoneLoginActivity.class);
                startActivity(phoneIntent);
            }
        });

        LoginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String email = UserEmail.getText().toString();
                String password = UserPassword.getText().toString();

                if (TextUtils.isEmpty(email)) {
                    Toast.makeText(requireContext(), "Please enter email...", Toast.LENGTH_SHORT).show();
                } else if (TextUtils.isEmpty(password)) {
                    Toast.makeText(requireContext(), "Please enter password...", Toast.LENGTH_SHORT).show();
                } else {
                    progressDialog.setTitle("Log In");
                    progressDialog.setMessage("Please wait...");
                    progressDialog.setCanceledOnTouchOutside(true);
                    progressDialog.show();

                    firebaseAuth.signInWithEmailAndPassword(email, password)
                            .addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                                @Override
                                public void onComplete(@NonNull Task<AuthResult> task) {
                                    if (task.isSuccessful()) {
                                        String currentUserId = firebaseAuth.getCurrentUser().getUid();
                                        String deviceToken = "hhhv";
                                                //FirebaseInstanceId.getInstance().getToken();
                                        userRef.child(currentUserId).child("device_token").setValue(deviceToken)
                                                .addOnCompleteListener(new OnCompleteListener<Void>() {
                                                    @Override
                                                    public void onComplete(@NonNull Task<Void> task) {
                                                        if (task.isSuccessful()) {
                                                            sendUserToMainActivity();
                                                            Toast.makeText(requireContext(), "Logged in Successfully...", Toast.LENGTH_SHORT).show();
                                                        }
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

    private void sendUserToMainActivity() {
        Intent mainIntent = new Intent(requireContext(), MenuActivity.class);
        mainIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(mainIntent);
    }

    private void sendUserToRegisterActivity() {
        Intent newUserIntent = new Intent(requireContext(), RegisterFragment.class);
        startActivity(newUserIntent);
    }
}
