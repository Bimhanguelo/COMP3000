package live.edunest.rtc.android.java.chats.Activities;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

import live.edunest.rtc.android.java.chats.Fragments.ChatsFragment;
import live.edunest.rtc.android.java.chats.Fragments.ContactsFragment;
import live.edunest.rtc.android.java.chats.Fragments.RequestsFragment;

public class TabsAccessorAdapter extends FragmentPagerAdapter {

    public TabsAccessorAdapter(@NonNull FragmentManager fm) {
        super(fm);
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {

        switch (position)
        {
            case 0:return new ChatsFragment();
            //case 1:return new GroupsFragment();
            case 1:return new ContactsFragment();
            case 2:return new RequestsFragment();
        }
        return null;
    }

    @Override
    public int getCount() {
        return 3;
    }

    @Nullable
    @Override
    public CharSequence getPageTitle(int position) {
        switch (position)
        {
            case 0:return "Chats";
            //case 1:return "Groups";
            case 1:return "Contacts";
            case 2:return "Requests";
        }
        return null;
    }
}
