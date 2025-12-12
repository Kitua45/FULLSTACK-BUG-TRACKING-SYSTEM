import { useGetUsersQuery } from "../../../../features/auth/authAPI";
import type { TProfile } from "../../../../features/auth/authTypes";

export function Users() {
  const { data: users, isLoading, error } = useGetUsersQuery();

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Failed to load users</p>;
  if (!users || users.length === 0) return <p>No users found</p>;

  // Type the filtered users explicitly
  const filteredUsers: Pick<TProfile, "userid" | "first_name" | "last_name" | "email">[] =
    users.map(({ userid, first_name, last_name, email }) => ({
      userid,
      first_name,
      last_name,
      email,
    }));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-green-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-4">All Users</h2>
      <table className="w-full border border-green-300 rounded-lg">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.userid} className="border-b border-green-300 hover:bg-green-50">
              <td className="px-4 py-2 text-green-900">{user.first_name}</td>
              <td className="px-4 py-2 text-green-900">{user.last_name}</td>
              <td className="px-4 py-2 text-green-900">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
