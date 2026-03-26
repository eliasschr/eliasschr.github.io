// Project catalog: replace these placeholders with your real portfolio projects.
const projects = [
  {
    title: "Swift Study Planner",
    description:
      "A lightweight iOS app for scheduling study sessions and tracking weekly learning goals.",
    category: "iOS",
    tech: ["Swift", "UIKit", "Core Data"],
    githubUrl: "https://github.com/yourusername/swift-study-planner",
    demoUrl: "",
  },
  {
    title: "Broadcast Lab Dashboard",
    description:
      "A responsive web dashboard for monitoring studio equipment health and status updates.",
    category: "Web",
    tech: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/yourusername/broadcast-lab-dashboard",
    demoUrl: "https://example.com/demo-dashboard",
  },
  {
    title: "Campus Events API",
    description:
      "REST API prototype that provides structured metadata for campus media events and sessions.",
    category: "API",
    tech: ["Node.js", "Express", "OpenAPI"],
    githubUrl: "https://github.com/yourusername/campus-events-api",
    demoUrl: "",
  },
  {
    title: "FFmpeg Batch Helper",
    description:
      "CLI utility to automate media transcoding workflows with reusable profile presets.",
    category: "Tools",
    tech: ["Python", "FFmpeg", "CLI"],
    githubUrl: "https://github.com/yourusername/ffmpeg-batch-helper",
    demoUrl: "",
  },
  {
    title: "Lecture Notes Hub",
    description:
      "A searchable web archive for course notes, references, and downloadable study material.",
    category: "Study",
    tech: ["JavaScript", "Markdown", "GitHub Pages"],
    githubUrl: "https://github.com/yourusername/lecture-notes-hub",
    demoUrl: "https://example.com/notes-hub",
  },
  {
    title: "Portfolio Starter",
    description:
      "A minimal starter template for building portfolio websites with clean components.",
    category: "Web",
    tech: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/yourusername/portfolio-starter",
    demoUrl: "https://example.com/portfolio-starter",
  },
];

const categories = ["All", "iOS", "Web", "API", "Tools", "Study"];
let activeCategory = "All";

const filterBar = document.getElementById("filterBar");
const projectsGrid = document.getElementById("projectsGrid");

function filteredProjects() {
  if (activeCategory === "All") return projects;
  return projects.filter((project) => project.category === activeCategory);
}

function createFilterButtons() {
  filterBar.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-btn ${category === activeCategory ? "active" : ""}`;
    button.textContent = category;

    button.addEventListener("click", () => {
      activeCategory = category;
      createFilterButtons();
      renderProjects();
    });

    filterBar.appendChild(button);
  });
}

function renderProjects() {
  const visibleProjects = filteredProjects();
  projectsGrid.innerHTML = "";

  if (visibleProjects.length === 0) {
    projectsGrid.innerHTML =
      '<div class="empty-state">No projects found in this category yet.</div>';
    return;
  }

  visibleProjects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "card";

    const badges = project.tech
      .map((item) => `<span class="badge">${item}</span>`)
      .join("");

    const demoButton = project.demoUrl
      ? `<a class="btn" href="${project.demoUrl}" target="_blank" rel="noopener noreferrer">Live Demo</a>`
      : "";

    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="badges">${badges}</div>
      <div class="card-actions">
        <a class="btn btn-primary" href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">GitHub</a>
        ${demoButton}
      </div>
    `;

    projectsGrid.appendChild(card);
  });
}

function setCurrentYear() {
  const yearElement = document.getElementById("year");
  yearElement.textContent = new Date().getFullYear();
}

createFilterButtons();
renderProjects();
setCurrentYear();
