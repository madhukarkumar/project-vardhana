import { User } from '@supabase/supabase-js';

interface CustomUser extends User {
  user_metadata: {
    avatar_url?: string;
  };
}

interface ProfileMenuProps {
  user: CustomUser | null;
}

export function ProfileMenu({ user }: ProfileMenuProps) {
  return (
    <div>
      {(user?.user_metadata?.avatar_url) ? (
        <img
          className="h-8 w-8 rounded-full"
          src={user.user_metadata.avatar_url}
          alt={user.email}
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
      )}
    </div>
  );
}
