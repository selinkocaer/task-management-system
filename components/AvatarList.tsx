import React from "react";

type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

type AvatarListProps = {
  users: User[];
};

const AvatarList: React.FC<AvatarListProps> = ({ users }) => {
  return (
    <div className="flex space-x-4">
      {users.map((user) => (
        <div key={user.id} className="flex flex-col items-center">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-12 h-12 rounded-full border border-gray-300"
          />
          <span className="text-sm mt-1">{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default AvatarList;
