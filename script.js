function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section.style.display === 'none' || !section.style.display) {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}

// Ocultar todos los contenidos al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.toggle-content').forEach(content => {
        content.style.display = 'none';
    });
});
