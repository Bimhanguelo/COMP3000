package live.edunest.rtc.android.java.chats.Models;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface DataApi {

        @GET("maps/api/place/nearbysearch/json")
        Call<DataResponse> getData(
                @Query("location") String location,
                @Query("radius") int radius,
                @Query("type") String type,
                @Query("key") String apiKey
        );

}
