package live.edunest.rtc.android.java.chats.Models;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class DataResponse {

        @SerializedName("status")
        private String status;

        @SerializedName("results")
        private List<DataModel> results;

        public String getStatus() {
            return status;
        }

        public List<DataModel> getResults() {
            return results;
        }


}
