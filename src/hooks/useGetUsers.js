import axios from "axios";
import { useState } from "react";
import Url from "../Utils/Urls";

const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async (limit, skip, signal) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(Url.getUser, {
          params: { limit, skip },
          signal,
        });
        setUsers(response?.data?.users || []);
        setTotal(response?.data?.total || 0);
      } catch (err) {
        if (axios.isCancel(err) || err.name === "CanceledError") return;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

  return { users, total, loading, error, fetchUsers };
};

export default useGetUsers;
