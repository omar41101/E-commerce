import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
// ⚠️⚠️⚠️ don't forget this ⚠️⚠️⚠️⚠️
import AdminMenu from "./AdminMenu";
import withAdminLayout from "./withAdminLayout";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-tech-black py-12">
      <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto gap-8">
        <div className="md:w-1/4 p-0 md:pr-4 flex items-start justify-center">
          <div className="bg-tech-dark/70 border border-tech-blue/10 rounded-2xl p-4 shadow-lg h-full">
            <AdminMenu />
          </div>
        </div>
        <div className="md:w-3/4 flex items-center justify-center">
          <div className="tech-card w-full max-w-3xl p-6 md:p-10 shadow-xl border border-tech-blue/10 backdrop-blur-xl mx-auto">
            <h1 className="text-2xl font-display font-bold mb-6 text-center text-tech-blue">User Management</h1>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">
                {error?.data?.message || error.error}
              </Message>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-tech-white text-sm">
                  <thead>
                    <tr className="border-b border-tech-blue/10">
                      <th className="py-3 px-2 text-left font-semibold">ID</th>
                      <th className="py-3 px-2 text-left font-semibold">NAME</th>
                      <th className="py-3 px-2 text-left font-semibold">EMAIL</th>
                      <th className="py-3 px-2 text-center font-semibold">ADMIN</th>
                      <th className="py-3 px-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border-tech-blue/5 hover:bg-tech-dark/30 transition-colors duration-200"
                      >
                        <td className="px-2 py-4 font-mono text-xs">{user._id}</td>
                        <td className="px-2 py-4">
                          {editableUserId === user._id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={editableUserName}
                                onChange={(e) => setEditableUserName(e.target.value)}
                                className="w-full px-2 py-1 bg-tech-dark/60 border border-tech-blue/20 rounded-lg text-tech-white placeholder-tech-text-secondary focus:outline-none focus:ring-2 focus:ring-tech-blue/20 focus:border-tech-blue transition-all duration-200"
                              />
                              <button
                                onClick={() => updateHandler(user._id)}
                                className="tech-btn bg-tech-blue hover:bg-tech-dark text-white px-3 py-2 rounded-lg"
                              >
                                <FaCheck />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              {user.username}
                              <button
                                onClick={() => toggleEdit(user._id, user.username, user.email)}
                              >
                                <FaEdit className="text-tech-blue hover:text-tech-white" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="px-2 py-4">
                          {editableUserId === user._id ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={editableUserEmail}
                                onChange={(e) => setEditableUserEmail(e.target.value)}
                                className="w-full px-2 py-1 bg-tech-dark/60 border border-tech-blue/20 rounded-lg text-tech-white placeholder-tech-text-secondary focus:outline-none focus:ring-2 focus:ring-tech-blue/20 focus:border-tech-blue transition-all duration-200"
                              />
                              <button
                                onClick={() => updateHandler(user._id)}
                                className="tech-btn bg-tech-blue hover:bg-tech-dark text-white px-3 py-2 rounded-lg"
                              >
                                <FaCheck />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <a
                                href={`mailto:${user.email}`}
                                className="hover:text-tech-blue"
                              >
                                {user.email}
                              </a>
                              <button
                                onClick={() => toggleEdit(user._id, user.username, user.email)}
                              >
                                <FaEdit className="text-tech-blue hover:text-tech-white" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="px-2 py-4 text-center">
                          {user.isAdmin ? (
                            <FaCheck className="text-tech-blue mx-auto" />
                          ) : (
                            ""
                          )}
                        </td>
                        <td className="px-2 py-4">
                          {!user.isAdmin && (
                            <button
                              onClick={() => deleteHandler(user._id)}
                              className="tech-btn bg-tech-blue hover:bg-tech-dark text-white font-bold px-3 py-2 rounded-lg"
                            >
                              <FaTrash />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAdminLayout (UserList);
