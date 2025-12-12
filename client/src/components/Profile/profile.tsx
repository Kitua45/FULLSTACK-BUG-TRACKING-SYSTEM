import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../app/store';
import { useUpdateUserMutation } from '../../features/auth/userAPIs';
import { toast } from 'sonner';

export default function Profile() {
  const reduxUser = useSelector((state: RootState) => state.user.user);

  const [user, setUser] = useState(reduxUser ?? null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    first_name: reduxUser?.first_name ?? '',
    last_name: reduxUser?.last_name ?? '',
    email: reduxUser?.email ?? '',
    avatar: reduxUser?.avatar ?? reduxUser?.first_name?.charAt(0).toUpperCase() ?? 'U',
  });

  const [, { isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (!reduxUser) return;

    const id = requestAnimationFrame(() => {
      setUser((prev) => (prev?.userid !== reduxUser.userid ? reduxUser : prev));
      setEditData((prev) => {
        if (
          !prev ||
          prev.first_name !== reduxUser.first_name ||
          prev.last_name !== reduxUser.last_name ||
          prev.email !== reduxUser.email ||
          prev.avatar !== (reduxUser.avatar || reduxUser.first_name?.charAt(0).toUpperCase())
        ) {
          return {
            first_name: reduxUser.first_name,
            last_name: reduxUser.last_name,
            email: reduxUser.email,
            avatar: reduxUser.avatar || reduxUser.first_name?.charAt(0).toUpperCase() || 'U',
          };
        }
        return prev;
      });
    });

    return () => cancelAnimationFrame(id);
  }, [reduxUser]);

  if (!user) {
    return (
      <div className="relative min-h-screen bg-white">
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="alert alert-error max-w-md">
            <span>Please login to view your profile</span>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString?: string) =>
    dateString
      ? new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : 'Unknown';

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    if (!user) return;
    const updatedUser = { ...user, first_name: editData.first_name, last_name: editData.last_name, email: editData.email, avatar: editData.avatar };
    setUser(updatedUser);
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => setIsEditing(false);

  return (
    <div className="relative min-h-screen bg-white p-6 md:p-10">
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-black">My Profile</h1>

          {/* Profile Card */}
          <div className="card bg-[#054003]/60 text-white shadow-xl mb-8 rounded-md">
            <div className="card-body p-6 flex flex-col items-center space-y-4">
              <div className="avatar">
                <div className="w-24 h-24 rounded-full bg-[#148C0F] flex items-center justify-center">
                  <span className="text-2xl font-bold text-white text-center">
                    {isEditing ? editData.avatar : user?.avatar ?? user?.first_name?.charAt(0).toUpperCase() ?? 'U'}
                  </span>
                </div>
              </div>

              {isEditing ? (
                <div className="w-full space-y-4 text-black">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">First Name</span>
                    </label>
                    <input
                      type="text"
                      value={editData.first_name}
                      onChange={(e) => setEditData({ ...editData, first_name: e.target.value })}
                      className="input input-bordered bg-white text-black w-full"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Last Name</span>
                    </label>
                    <input
                      type="text"
                      value={editData.last_name}
                      onChange={(e) => setEditData({ ...editData, last_name: e.target.value })}
                      className="input input-bordered bg-white text-black w-full"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="input input-bordered bg-white text-black w-full"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Avatar Initial</span>
                    </label>
                    <input
                      type="text"
                      maxLength={1}
                      value={editData.avatar}
                      onChange={(e) => setEditData({ ...editData, avatar: e.target.value })}
                      className="input input-bordered bg-white text-black w-full"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={handleSave} className="btn btn-primary bg-[#148C0F] text-white" disabled={isUpdating}>
                      {isUpdating ? 'Saving...' : 'Save'}
                    </button>
                    <button onClick={handleCancel} className="btn btn-secondary border-[#148C0F] text-[#148C0F]">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-2 text-black">
                  <h2 className="card-title text-2xl">{user.first_name} {user.last_name}</h2>
                  <div className="badge bg-[#148C0F] text-white">{user.role}</div>
                  <p className="text-lg opacity-90">{user.email}</p>
                  <p className="text-sm opacity-75">Member since {formatDate(user.createdat)}</p>
                  <button onClick={handleEdit} className="btn border-[#148C0F] text-[#148C0F] mt-4">
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="card bg-[#054003]/60 text-white shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">Account Information</h3>
                <div className="space-y-3 text-white">
                  <div className="flex justify-between">
                    <span className="opacity-75">User ID:</span>
                    <span className="font-mono">#{user.userid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Name:</span>
                    <span>{user.first_name} {user.last_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Role:</span>
                    <span className="badge bg-[#148C0F] text-white badge-sm">{user.role}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-[#054003]/60 text-white shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">Activity Summary</h3>
                <div className="space-y-3 text-white">
                  <div className="flex justify-between">
                    <span className="opacity-75">Joined:</span>
                    <span>{formatDate(user.created_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Last Login:</span>
                    <span>Today</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Status:</span>
                    <span className="badge bg-[#2ABF24] text-white badge-sm">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
