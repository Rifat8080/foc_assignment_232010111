document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            loadSkills(data.skills);
            loadProjects(data.projects);
        })
        .catch(error => console.error('Error loading JSON:', error));
});

function loadSkills(skills) {
    const skillsList = document.getElementById("skills-list");
    skills.forEach(skill => {
        const skillBadge = document.createElement("span");
        skillBadge.classList.add("bg-yellow-500", "text-black", "px-3", "py-2", "rounded-lg", "m-2", "font-semibold");
        skillBadge.textContent = skill;
        skillsList.appendChild(skillBadge);
    });
}

function loadProjects(projects) {
    const projectsContainer = document.getElementById("projects-container");
    projects.forEach(project => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("bg-gray-800", "p-6", "rounded-lg", "shadow-lg", "text-center");

        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="w-full h-40 object-cover rounded-lg">
            <h3 class="text-xl font-bold mt-4">${project.title}</h3>
            <p class="text-gray-400 mt-2">${project.description}</p>
            <a href="${project.link}" target="_blank" class="block mt-4 text-yellow-500 font-semibold">View Project</a>
        `;

        projectsContainer.appendChild(projectCard);
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("hero-3d").appendChild(renderer.domElement);

    // Create a Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0xffcc00, metalness: 0.7, roughness: 0.4 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(2, 3, 5);
    scene.add(light);

    camera.position.z = 3;

    // Animate the Cube
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    // Responsive Resize
    window.addEventListener("resize", function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
}
