import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import API from "../services/api";

function Branch() {
  const navigate = useNavigate();

  const [branches, setBranches] = useState(() => {
    try {
      const saved = localStorage.getItem("branches");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("LocalStorage error:", error);
      return [];
    }
  });

  const [search, setSearch] = useState("");

  // IMPORTANT:
  // First time API data nahi hai to loading true rahega.
  // Agar localStorage me data hai to loading false.
  const [loading, setLoading] = useState(() => {
    return !localStorage.getItem("branches");
  });

  useEffect(() => {
    const cachedBranches = localStorage.getItem("branches");

    // Agar data already localStorage me hai
    // to immediately show hoga.
    if (cachedBranches) {
      setLoading(false);
      return;
    }

    // First visit -> API se data lao
    API.get("/branches")
      .then((response) => {
        const data = response.data || [];

        setBranches(data);

        // Future visits ke liye save
        localStorage.setItem(
          "branches",
          JSON.stringify(data)
        );
      })
      .catch((error) => {
        console.error("Failed to load branches:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredBranches = branches.filter((branch) =>
    branch.branchName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page">

      {/* BACK BUTTON */}
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* TITLE */}
      <h1>🎓 Select Your Branch</h1>

      {/* SEARCH */}
      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search Branch..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="loading-state">

          <div className="loading-spinner"></div>

          <h3>Loading Branches...</h3>

        </div>

      ) : filteredBranches.length === 0 ? (

        /* EMPTY STATE */
        <div className="empty-state">

          <div className="empty-icon">
            📂
          </div>

          <h2>
            No Branch Found
          </h2>

          <p>
            No branches are available right now.
          </p>

        </div>

      ) : (

        /* BRANCH LIST */
        filteredBranches.map((branch) => (

          <div
            key={branch.id}
            className="card branch-card fade"
            onClick={() =>
              navigate(
                `/branches/${branch.id}/semesters`
              )
            }
          >

            <div>

              <h2>
                {branch.branchName}
              </h2>

              <span></span>

              <p>
                View Semester Papers →
              </p>

            </div>

            <span>
              📚
            </span>

          </div>

        ))
      )}

    </div>
  );
}

export default Branch;