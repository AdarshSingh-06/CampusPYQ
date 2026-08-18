import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import API from "../services/api";

function Branch() {
  const navigate = useNavigate();

  const [branches, setBranches] = useState(() => {
    const saved = localStorage.getItem("branches");

    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    // Agar cache me branches already hain
    // to API call ki zarurat nahi hai
    if (localStorage.getItem("branches")) {
      return;
    }

    // Background me branches fetch karo
    API.get("/branches")
      .then((response) => {
        setBranches(response.data);

        localStorage.setItem(
          "branches",
          JSON.stringify(response.data)
        );
      })
      .catch((error) => {
        console.error("Branch loading error:", error);
      });
  }, []);

  const filteredBranches = branches.filter((branch) =>
    branch.branchName
      .toLowerCase()
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
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      {/* BRANCH LIST */}

      {filteredBranches.length === 0 ? (

        <p>No Branch Found</p>

      ) : (

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