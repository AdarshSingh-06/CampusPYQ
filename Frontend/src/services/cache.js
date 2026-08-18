import API from "./api";

export async function preloadCampusData() {
  try {
    // ==============================
    // 1. BRANCHES
    // ==============================

    let branches = [];

    const savedBranches =
      localStorage.getItem("branches");

    if (savedBranches) {
      branches = JSON.parse(savedBranches);
    } else {
      const branchResponse =
        await API.get("/branches");

      branches = branchResponse.data;

      localStorage.setItem(
        "branches",
        JSON.stringify(branches)
      );
    }


    // ==============================
    // 2. SEMESTERS
    // ==============================

    for (const branch of branches) {

      const semesterKey =
        `semesters_${branch.id}`;

      if (localStorage.getItem(semesterKey)) {
        continue;
      }

      try {

        const response =
          await API.get(
            `/semesters/branch/${branch.id}`
          );

        localStorage.setItem(
          semesterKey,
          JSON.stringify(response.data)
        );

      } catch (error) {

        console.error(
          `Semester preload failed for branch ${branch.id}`,
          error
        );

      }
    }


    // ==============================
    // 3. SUBJECTS
    // ==============================

    for (const branch of branches) {

      const semesterData =
        JSON.parse(
          localStorage.getItem(
            `semesters_${branch.id}`
          ) || "[]"
        );

      for (const semester of semesterData) {

        const subjectKey =
          `subjects_${semester.id}`;

        if (localStorage.getItem(subjectKey)) {
          continue;
        }

        try {

          const response =
            await API.get(
              `/subjects/semester/${semester.id}`
            );

          localStorage.setItem(
            subjectKey,
            JSON.stringify(response.data)
          );

        } catch (error) {

          console.error(
            `Subject preload failed for semester ${semester.id}`,
            error
          );

        }
      }
    }


    // ==============================
    // 4. PYQs
    // ==============================

    for (const branch of branches) {

      const semesterData =
        JSON.parse(
          localStorage.getItem(
            `semesters_${branch.id}`
          ) || "[]"
        );

      for (const semester of semesterData) {

        const subjectData =
          JSON.parse(
            localStorage.getItem(
              `subjects_${semester.id}`
            ) || "[]"
          );

        for (const subject of subjectData) {

          const pyqKey =
            `pyqs_${subject.id}`;

          if (localStorage.getItem(pyqKey)) {
            continue;
          }

          try {

            const response =
              await API.get(
                `/pyqs/subject/${subject.id}`
              );

            localStorage.setItem(
              pyqKey,
              JSON.stringify(response.data)
            );

          } catch (error) {

            console.error(
              `PYQ preload failed for subject ${subject.id}`,
              error
            );

          }
        }
      }
    }

    console.log(
      "Campus PYQ data preloaded successfully ⚡"
    );

  } catch (error) {

    console.error(
      "Campus PYQ preload failed:",
      error
    );

  }
}