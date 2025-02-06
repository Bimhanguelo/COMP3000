package live.edunest.rtc.android.java.chats.Fragments;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.Random;

import live.edunest.rtc.android.java.chats.Models.Fav;
import live.videosdk.rtc.android.java.R;

public class NotesAdapter extends RecyclerView.Adapter<NotesAdapter.ViewHolder> {

    private ArrayList<Fav> courseModalArrayList = new ArrayList<>();
    private Context context;
    private int[] imageResources = {R.drawable.pizaa, R.drawable.burger_king, R.drawable.safe_logo,R.drawable.alberson,R.drawable.panda_ex}; // Add your image resources here

    // Static list of discount values in dollars
    private static final String[] DISCOUNT_VALUES = {"$5", "$10", "$15", "$20", "$25"};

    public NotesAdapter(ArrayList<Fav> courseModalArrayList, Context context) {
        this.courseModalArrayList = courseModalArrayList;
        this.context = context;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.save_layout, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, @SuppressLint("RecyclerView") int position) {
        Fav modal = courseModalArrayList.get(position);
        holder.details.setText(modal.getName());

        // Get a random discount value from the list
        String discount = DISCOUNT_VALUES[new Random().nextInt(DISCOUNT_VALUES.length)];
        holder.discount.setText(discount);

        // Set a random image for each item
        int randomImageResource = imageResources[new Random().nextInt(imageResources.length)];
        holder.imageView.setImageResource(randomImageResource);

        holder.delte.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                courseModalArrayList.remove(position);
                notifyItemRemoved(position);

                SharedPreferences preferences = context.getSharedPreferences("shared preferences", Context.MODE_PRIVATE);
                SharedPreferences.Editor mEditor = preferences.edit();
                Gson gson = new Gson();

                String jsonString = gson.toJson(courseModalArrayList);
                mEditor.putString("courses", jsonString);
                mEditor.apply();
            }
        });
    }

    @Override
    public int getItemCount() {
        return courseModalArrayList.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        private TextView details;
        private TextView discount; // TextView to display discount
        private ImageView delte;
        private ImageView imageView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            details = itemView.findViewById(R.id.fav_user_details);
            discount = itemView.findViewById(R.id.discount_text); // Initialize discount TextView
            delte = itemView.findViewById(R.id.fav_user_delete);
            imageView = itemView.findViewById(R.id.image_view); // Initialize ImageView
        }
    }
}
