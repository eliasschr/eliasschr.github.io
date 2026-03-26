// Project catalog -------------------------------------------------------------
// Add, remove, or edit project objects in this array.
// Keep each object shape consistent so the UI renders correctly.
const projects = [
  {
    title: "Swift Study Planner",
    description:
      "A lightweight iOS app for scheduling study sessions and tracking weekly learning goals.",
    category: "iOS",
    techStack: ["Swift", "UIKit", "Core Data"],
    githubUrl: "https://github.com/yourusername/swift-study-planner",
    // liveUrl is optional. Remove it (or leave undefined) if no live version exists.
    liveUrl: "",
    // featured is optional. Set true to visually mark standout projects.
    featured: true,
  },
  {
    title: "Broadcast Lab Dashboard",
    description:
      "A responsive web dashboard for monitoring studio equipment health and status updates.",
    category: "Web",
    techStack: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/yourusername/broadcast-lab-dashboard",
    liveUrl: "https://example.com/demo-dashboard",
  },
  {
    title: "Campus Events API",
    description:
      "REST API prototype that provides structured metadata for campus media events and sessions.",
    category: "API",
    techStack: ["Node.js", "Express", "OpenAPI"],
    githubUrl: "https://github.com/yourusername/campus-events-api",
  },
  {
    title: "FFmpeg Batch Helper",
    description:
      "CLI utility to automate media transcoding workflows with reusable profile presets.",
    category: "Tools",
    techStack: ["Python", "FFmpeg", "CLI"],
    githubUrl: "https://github.com/yourusername/ffmpeg-batch-helper",
  },
  {
    title: "Lecture Notes Hub",
    description:
      "A searchable web archive for course notes, references, and downloadable study material.",
    category: "Study",
    techStack: ["JavaScript", "Markdown", "GitHub Pages"],
    githubUrl: "https://github.com/yourusername/lecture-notes-hub",
    liveUrl: "https://example.com/notes-hub",
  },
  {
    title: "Portfolio Starter",
    description:
      "A minimal starter template for building portfolio websites with clean components.",
    category: "Web",
    techStack: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/yourusername/portfolio-starter",
    liveUrl: "https://example.com/portfolio-starter",
    featured: true,
  },

  // Insert your own project objects here:
  // {
  //   title: "My Project",
  //   description: "What it does and why it matters.",
  //   category: "Web",
  //   techStack: ["React", "TypeScript", "Node.js"],
  //   githubUrl: "https://github.com/yourusername/my-project",
  //   liveUrl: "https://my-project.example.com", // optional
  //   featured: false, // optional
  // },
];

const ALL_CATEGORY_LABEL = "All";
let activeCategory = ALL_CATEGORY_LABEL;

const filterBar = document.getElementById("filterBar");
const projectsGrid = document.getElementById("projectsGrid");

function getCategories(projectList) {
  const uniqueCategories = [...new Set(projectList.map((project) => project.category))];
  return [ALL_CATEGORY_LABEL, ...uniqueCategories];
}

function getVisibleProjects(projectList, selectedCategory) {
  if (selectedCategory === ALL_CATEGORY_LABEL) return projectList;
  return projectList.filter((project) => project.category === selectedCategory);
}

function createFilterButtons(projectList) {
  const categories = getCategories(projectList);
  filterBar.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-btn ${category === activeCategory ? "active" : ""}`;
    button.textContent = category;

    button.addEventListener("click", () => {
      activeCategory = category;
      createFilterButtons(projectList);
      renderProjects(projectList);
    });

    filterBar.appendChild(button);
  });
}

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "card";

  const badges = project.techStack
    .map((tech) => `<span class="badge">${tech}</span>`)
    .join("");

  // Only render Live Demo when a valid URL exists.
  const liveButton = project.liveUrl
    ? `<a class="btn" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Live Demo</a>`
    : "";

  const featuredTag = project.featured
    ? '<span class="badge" aria-label="Featured project">Featured</span>'
    : "";

  card.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="badges">${featuredTag}${badges}</div>
    <div class="card-actions">
      <a class="btn btn-primary" href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">GitHub</a>
      ${liveButton}
    </div>
  `;

  return card;
}

function renderProjects(projectList) {
  const visibleProjects = getVisibleProjects(projectList, activeCategory);
  projectsGrid.innerHTML = "";

  if (visibleProjects.length === 0) {
    projectsGrid.innerHTML =
      '<div class="empty-state">No projects found in this category yet.</div>';
    return;
  }

  visibleProjects.forEach((project) => {
    projectsGrid.appendChild(createProjectCard(project));
  });
}

function setCurrentYear() {
  const yearElement = document.getElementById("year");
  yearElement.textContent = new Date().getFullYear();
}

createFilterButtons(projects);
renderProjects(projects);
setCurrentYear();
