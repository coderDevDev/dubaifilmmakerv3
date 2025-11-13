/**
 * Poster.tv CMS - Admin Panel JavaScript
 */

const API_URL = '../api';
let allProjects = [];

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadProjects();
    initializeEventListeners();
});

/**
 * Check if user is authenticated
 */
async function checkAuth() {
    try {
        const response = await fetch(`${API_URL}/auth.php?action=check`);
        const data = await response.json();
        
        if (!data.logged_in) {
            window.location.href = 'login.html';
            return;
        }
        
        // Display user info
        if (data.user) {
            document.getElementById('userInfo').textContent = `Welcome, ${data.user.username}`;
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        window.location.href = 'login.html';
    }
}

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    // Form submission
    document.getElementById('projectForm').addEventListener('submit', saveProject);
    
    // Auto-generate slug from title
    document.getElementById('title').addEventListener('input', (e) => {
        const slug = generateSlug(e.target.value);
        document.getElementById('slug').value = slug;
    });
    
    // Close modal on background click
    document.getElementById('projectModal').addEventListener('click', (e) => {
        if (e.target.id === 'projectModal') {
            closeModal();
        }
    });
    
    // Keyboard shortcut - ESC to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

/**
 * Load all projects from API
 */
async function loadProjects() {
    try {
        const response = await fetch(`${API_URL}/projects.php`);
        allProjects = await response.json();
        
        displayProjects(allProjects);
        updateStats();
    } catch (error) {
        console.error('Failed to load projects:', error);
        showError('Failed to load projects. Please refresh the page.');
    }
}

/**
 * Display projects in table
 */
function displayProjects(projects) {
    const tbody = document.getElementById('projectsBody');
    
    if (projects.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="loading-cell">No projects found</td></tr>';
        return;
    }
    
    tbody.innerHTML = '';
    
    projects.forEach(project => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${project.order_index}</td>
            <td><strong>${escapeHtml(project.title)}</strong></td>
            <td>${escapeHtml(project.director)}</td>
            <td>${formatCategory(project.category)}</td>
            <td>
                ${project.is_featured ? '<span class="featured-badge">⭐ Featured</span>' : ''}
            </td>
            <td>
                <button class="action-btn edit-btn" onclick="editProject(${project.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteProject(${project.id}, '${escapeHtml(project.title)}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Filter projects by category
 */
function filterProjects() {
    const category = document.getElementById('categoryFilter').value;
    
    if (category === '*') {
        displayProjects(allProjects);
    } else {
        const filtered = allProjects.filter(p => p.category === category);
        displayProjects(filtered);
    }
}

/**
 * Update statistics
 */
function updateStats() {
    const total = allProjects.length;
    const featured = allProjects.filter(p => p.is_featured == 1).length;
    
    document.getElementById('totalProjects').textContent = total;
    document.getElementById('featuredProjects').textContent = featured;
}

/**
 * Open modal for adding new project
 */
function openAddModal() {
    document.getElementById('modalTitle').textContent = 'Add New Project';
    document.getElementById('projectForm').reset();
    document.getElementById('projectId').value = '';
    
    // Set default order index
    const maxOrder = Math.max(0, ...allProjects.map(p => parseInt(p.order_index)));
    document.getElementById('orderIndex').value = maxOrder + 1;
    
    document.getElementById('projectModal').classList.add('active');
    document.getElementById('title').focus();
}

/**
 * Edit existing project
 */
async function editProject(id) {
    try {
        const project = allProjects.find(p => p.id == id);
        
        if (!project) {
            showError('Project not found');
            return;
        }
        
        // Populate form
        document.getElementById('modalTitle').textContent = 'Edit Project';
        document.getElementById('projectId').value = project.id;
        document.getElementById('title').value = project.title;
        document.getElementById('slug').value = project.slug;
        document.getElementById('director').value = project.director;
        document.getElementById('category').value = project.category;
        document.getElementById('vimeo720').value = project.vimeo_id_720p;
        document.getElementById('vimeo1080').value = project.vimeo_id_1080p;
        document.getElementById('posterUrl').value = project.poster_image_url || '';
        document.getElementById('orderIndex').value = project.order_index;
        document.getElementById('featured').checked = project.is_featured == 1;
        
        document.getElementById('projectModal').classList.add('active');
        document.getElementById('title').focus();
    } catch (error) {
        console.error('Failed to load project:', error);
        showError('Failed to load project details');
    }
}

/**
 * Save project (create or update)
 */
async function saveProject(e) {
    e.preventDefault();
    
    const id = document.getElementById('projectId').value;
    const data = {
        title: document.getElementById('title').value.trim(),
        slug: document.getElementById('slug').value.trim(),
        director: document.getElementById('director').value.trim(),
        category: document.getElementById('category').value,
        vimeo_id_720p: document.getElementById('vimeo720').value.trim(),
        vimeo_id_1080p: document.getElementById('vimeo1080').value.trim(),
        poster_image_url: document.getElementById('posterUrl').value.trim(),
        order_index: parseInt(document.getElementById('orderIndex').value),
        is_featured: document.getElementById('featured').checked ? 1 : 0
    };
    
    // Add ID for update
    if (id) {
        data.id = parseInt(id);
    }
    
    try {
        const response = await fetch(`${API_URL}/projects.php`, {
            method: id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.error) {
            showError(result.error);
            return;
        }
        
        if (result.success) {
            closeModal();
            loadProjects();
            showSuccess(id ? 'Project updated successfully!' : 'Project created successfully!');
        }
    } catch (error) {
        console.error('Failed to save project:', error);
        showError('Failed to save project. Please try again.');
    }
}

/**
 * Delete project
 */
async function deleteProject(id, title) {
    if (!confirm(`Are you sure you want to delete "${title}"?\n\nThis action cannot be undone.`)) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/projects.php?id=${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.error) {
            showError(result.error);
            return;
        }
        
        if (result.success) {
            loadProjects();
            showSuccess('Project deleted successfully!');
        }
    } catch (error) {
        console.error('Failed to delete project:', error);
        showError('Failed to delete project. Please try again.');
    }
}

/**
 * Close modal
 */
function closeModal() {
    document.getElementById('projectModal').classList.remove('active');
}

/**
 * Logout
 */
async function logout() {
    if (!confirm('Are you sure you want to logout?')) {
        return;
    }
    
    try {
        await fetch(`${API_URL}/auth.php?action=logout`, {
            method: 'POST'
        });
        
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Logout failed:', error);
        window.location.href = 'login.html';
    }
}

/**
 * Show success message
 */
function showSuccess(message) {
    const container = document.querySelector('.container');
    const alert = document.createElement('div');
    alert.className = 'success-message';
    alert.textContent = message;
    
    container.insertBefore(alert, container.firstChild);
    
    setTimeout(() => {
        alert.style.transition = 'opacity 0.3s ease';
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

/**
 * Show error message
 */
function showError(message) {
    const container = document.querySelector('.container');
    const alert = document.createElement('div');
    alert.className = 'error-message';
    alert.textContent = message;
    
    container.insertBefore(alert, container.firstChild);
    
    setTimeout(() => {
        alert.style.transition = 'opacity 0.3s ease';
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

/**
 * Generate slug from string
 */
function generateSlug(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Format category for display
 */
function formatCategory(category) {
    return category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
