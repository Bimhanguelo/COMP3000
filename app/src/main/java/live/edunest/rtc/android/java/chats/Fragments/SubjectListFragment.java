package live.edunest.rtc.android.java.chats.Fragments;

import android.content.Intent;
import android.os.Bundle;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.database.DataSnapshot;

import java.util.ArrayList;
import java.util.List;

import live.edunest.rtc.android.java.chats.Models.Subject;
import live.edunest.rtc.android.java.chats.Activities.AddSubjectActivity;
import live.videosdk.rtc.android.java.R;

public class SubjectListFragment extends Fragment {

    private RecyclerView recyclerView;
    private SubjectAdapter subjectAdapter;
    private List<Subject> subjectList;
    private FirebaseDatabase database;
    private DatabaseReference subjectsRef;

    public SubjectListFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_addsubject, container, false);

        recyclerView = view.findViewById(R.id.recyclerViewSubjects);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));

        subjectList = new ArrayList<>();
        subjectAdapter = new SubjectAdapter(getContext(), subjectList);
        recyclerView.setAdapter(subjectAdapter);

        database = FirebaseDatabase.getInstance();
        subjectsRef = database.getReference("Subjects");

        // Fetch the subjects data from Firebase
        fetchSubjects();

        // Set up the Floating Action Button
        FloatingActionButton fabAddSubject = view.findViewById(R.id.fabAddSubject);
        fabAddSubject.setOnClickListener(v -> {
            Intent intent = new Intent(getContext(), AddSubjectActivity.class);
            startActivity(intent);
        });

        return view;
    }

    private void fetchSubjects() {
        subjectsRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                subjectList.clear();
                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                    Subject subject = snapshot.getValue(Subject.class);
                    subjectList.add(subject);
                }
                subjectAdapter.notifyDataSetChanged();
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                // Handle errors here
            }
        });
    }
}
