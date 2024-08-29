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
    <div className="p-6 -900 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">User Management</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
           <AdminMenu /> 
          <table className="w-full md:w-4/5 mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700 text-left">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">NAME</th>
                <th className="px-6 py-3">EMAIL</th>
                <th className="px-6 py-3">ADMIN</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="px-6 py-4">{user._id}</td>
                  <td className="px-6 py-4">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="w-full p-2 border rounded-lg text-black"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.username}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-2 text-pink-500 hover:text-pink-400" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableUserEmail}
                          onChange={(e) =>
                            setEditableUserEmail(e.target.value)
                          }
                          className="w-full p-2 border rounded-lg text-black"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <a
                          href={`mailto:${user.email}`}
                          className="hover:text-pink-400"
                        >
                          {user.email}
                        </a>{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-2 text-pink-500 hover:text-pink-400" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {user.isAdmin ? (
                      <FaCheck className="text-pink-500" />
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {!user.isAdmin && (
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg"
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
  );
};

export default withAdminLayout (UserList);
