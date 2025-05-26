// 📌 Подключение Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const canvas = document.querySelector(".background-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 📌 Объемная сетка с анимацией
const gridGeometry = new THREE.PlaneGeometry(80, 80, 50, 50);
const gridMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true,
    transparent: true,
    opacity: 0.2
});
const grid = new THREE.Mesh(gridGeometry, gridMaterial);
grid.rotation.x = -Math.PI / 2;
grid.position.y = -5;
scene.add(grid);

// 📌 Частицы – создают эффект глубины
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = window.innerWidth < 1024 ? 200 : 500; // Меньше частиц на мобильных
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 90;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: window.innerWidth < 1024 ? 0.08 : 0.12, // Меньше точек на мобильных
    transparent: true
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// 📌 Камера
camera.position.set(0, 6, 20);

// 📌 Анимация фона
function animate() {
    requestAnimationFrame(animate);
    grid.rotation.z += 0.0005;
    particles.rotation.y += 0.0008;
    renderer.render(scene, camera);
}
animate();

// 📌 Эффект параллакса (мягкий)
document.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    gsap.to(camera.position, { x: x * 0.4, y: -y * 0.4, duration: 0.5 });
});

// 📌 Гамбургер-меню (адаптация)
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-nav");

    if (hamburger) {
        hamburger.addEventListener("click", function () {
            this.classList.toggle("active");
            mobileNav.classList.toggle("active");
        });
    }
});

// 📌 Адаптация при изменении размера окна
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
