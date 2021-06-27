document.querySelector(".button-container").addEventListener("click", () => {
  let text = document.getElementById("filter-jobs").value;
  getJobs().then((jobs) => {
    let filteredJobs = filterJobs(jobs, text);
    showJobs(filteredJobs);
  });
});

document.getElementById("filter-cross").addEventListener("click", () => {
  getJobs().then((jobs) => {
    document.getElementById("filter-jobs").value = "";
    let unfilteredJobs = filterJobs(jobs, "");
    showJobs(unfilteredJobs);
  });
});

document.getElementById("header-left").addEventListener("click", () => {
  getJobs().then((jobs) => {
    document.getElementById("filter-jobs").value = "";
    let unfilteredJobs = filterJobs(jobs, "");
    showJobs(unfilteredJobs);
  });
});

function getJobs() {
  return fetch("./assets/data/data.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

function filterJobs(jobs, searchText) {
  if (searchText) {
    toggleStyle(document.getElementById("filter-cross"), "display", "flex");
    let filteredJobs = jobs.filter((job) => {
      if (
        job.roleName.toLowerCase().includes(searchText) ||
        job.type.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.requirements.content.toLowerCase().includes(searchText)
      ) {
        return true;
      } else {
        return false;
      }
    });
    return filteredJobs;
  } else {
    toggleStyle(document.getElementById("filter-cross"), "display", "none");
    return jobs;
  }
}

function showJobs(jobs) {
  let jobsContainer = document.querySelector(".jobs-container");
  let jobsHTML = "";

  document.getElementById("result-count").innerHTML = `${jobs.length}`;

  jobs.forEach((job) => {
    jobsHTML += `
    <div class="job-tile">
    <div class="top">
      <img
        src="${job.logo}"
      />
      <span class="material-icons more_horiz">more_horiz</span>
    </div>
    <div class="rolename">
      <span>${job.roleName}</span>
    </div>
    <div class="description">
      <span>${job.requirements.content}</span>
    </div>
    <div class="buttons">
      <div class="button apply-now">Apply Now</div>
      <div class="button">Message</div>
    </div>
  </div>
  `;
  });
  jobsContainer.innerHTML = jobsHTML;
}

function toggleStyle(el, styleName, value) {
  if (el.style[styleName] !== value) {
    el.style[styleName] = value;
  } else {
    el.style[styleName] = "";
  }
}

getJobs().then((data) => {
  showJobs(data);
});
