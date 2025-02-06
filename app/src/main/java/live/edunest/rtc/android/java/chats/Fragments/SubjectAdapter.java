package live.edunest.rtc.android.java.chats.Fragments;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;

import java.util.List;

import live.edunest.rtc.android.java.chats.Models.Subject;
import live.videosdk.rtc.android.java.R;

public class SubjectAdapter extends RecyclerView.Adapter<SubjectAdapter.SubjectViewHolder> {

    private Context context;
    private List<Subject> subjectList;

    public SubjectAdapter(Context context, List<Subject> subjectList) {
        this.context = context;
        this.subjectList = subjectList;
    }

    @Override
    public SubjectViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_subject, parent, false);
        return new SubjectViewHolder(view);
    }

    @Override
    public void onBindViewHolder(SubjectViewHolder holder, int position) {
        Subject subject = subjectList.get(position);

        holder.subjectNameTextView.setText(subject.getSubjectName());
        holder.tutorExperienceTextView.setText(subject.getTutorExperience() + " years");
        holder.subjectDescriptionTextView.setText(subject.getSubjectDescription());
        holder.subjectCategoryTextView.setText(subject.getSubjectCategory());
        holder.tutorQualificationsTextView.setText(subject.getTutorQualifications());
        holder.hourlyRateTextView.setText("Hourly Rate: " + subject.getHourlyRate());
        holder.locationTextView.setText(subject.getLocation());

        // Load the subject image using Glide
        Glide.with(context)
                .load(subject.getSubjectImageUrl())
                .into(holder.subjectImageView);
    }

    @Override
    public int getItemCount() {
        return subjectList.size();
    }

    public static class SubjectViewHolder extends RecyclerView.ViewHolder {

        TextView subjectNameTextView, tutorExperienceTextView, subjectDescriptionTextView, subjectCategoryTextView,
                tutorQualificationsTextView, hourlyRateTextView, locationTextView;
        ImageView subjectImageView;

        public SubjectViewHolder(View itemView) {
            super(itemView);

            subjectNameTextView = itemView.findViewById(R.id.textViewSubjectName);
            tutorExperienceTextView = itemView.findViewById(R.id.textViewTutorExperience);
            subjectDescriptionTextView = itemView.findViewById(R.id.textViewSubjectDescription);
            subjectCategoryTextView = itemView.findViewById(R.id.textViewSubjectCategory);
            tutorQualificationsTextView = itemView.findViewById(R.id.textViewTutorQualifications);
            hourlyRateTextView = itemView.findViewById(R.id.textViewHourlyRate);
            locationTextView = itemView.findViewById(R.id.textViewLocation);
            subjectImageView = itemView.findViewById(R.id.imageViewSubjectImage);
        }
    }
}
