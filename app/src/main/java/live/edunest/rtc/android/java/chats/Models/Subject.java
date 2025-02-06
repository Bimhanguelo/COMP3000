package live.edunest.rtc.android.java.chats.Models;

public class Subject {
    private String subjectName;
    private String tutorExperience;
    private String subjectDescription;  // New field
    private String subjectCategory;     // New field
    private String tutorQualifications; // New field
    private String hourlyRate;          // New field (optional)
    private String location;            // New field (optional)
    private String subjectImageUrl;     // New field (optional)
    private String subjectId;

    public Subject() {
        // Default constructor for Firebase
    }

    public Subject(String subjectName, String tutorExperience, String subjectDescription,
                   String subjectCategory, String tutorQualifications, String hourlyRate,
                   String location, String subjectImageUrl, String subjectId) {
        this.subjectName = subjectName;
        this.tutorExperience = tutorExperience;
        this.subjectDescription = subjectDescription;
        this.subjectCategory = subjectCategory;
        this.tutorQualifications = tutorQualifications;
        this.hourlyRate = hourlyRate;
        this.location = location;
        this.subjectImageUrl = subjectImageUrl;
        this.subjectId = subjectId;
    }

    // Getters and setters for each field
    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }

    public String getTutorExperience() { return tutorExperience; }
    public void setTutorExperience(String tutorExperience) { this.tutorExperience = tutorExperience; }

    public String getSubjectDescription() { return subjectDescription; }
    public void setSubjectDescription(String subjectDescription) { this.subjectDescription = subjectDescription; }

    public String getSubjectCategory() { return subjectCategory; }
    public void setSubjectCategory(String subjectCategory) { this.subjectCategory = subjectCategory; }

    public String getTutorQualifications() { return tutorQualifications; }
    public void setTutorQualifications(String tutorQualifications) { this.tutorQualifications = tutorQualifications; }

    public String getHourlyRate() { return hourlyRate; }
    public void setHourlyRate(String hourlyRate) { this.hourlyRate = hourlyRate; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getSubjectImageUrl() { return subjectImageUrl; }
    public void setSubjectImageUrl(String subjectImageUrl) { this.subjectImageUrl = subjectImageUrl; }

    public String getSubjectId() { return subjectId; }
    public void setSubjectId(String subjectId) { this.subjectId = subjectId; }
}
