function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password svg');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
        `;
    } else {
        passwordInput.type = 'password';
        toggleIcon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
        `;
    }
}

// Form validation
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let isValid = true;
    
    // Reset error messages
    document.getElementById('username-error').style.display = 'none';
    document.getElementById('password-error').style.display = 'none';
    
    // Validate username
    if (username.trim() === '') {
        document.getElementById('username-error').textContent = 'Username is required';
        document.getElementById('username-error').style.display = 'block';
        isValid = false;
    } else if (username.length < 3) {
        document.getElementById('username-error').textContent = 'Username must be at least 3 characters';
        document.getElementById('username-error').style.display = 'block';
        isValid = false;
    }
    
    // Validate password
    if (password.trim() === '') {
        document.getElementById('password-error').textContent = 'Password is required';
        document.getElementById('password-error').style.display = 'block';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('password-error').textContent = 'Password must be at least 6 characters';
        document.getElementById('password-error').style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        const loginBtn = document.querySelector('.login-btn');
        const originalText = loginBtn.textContent;
        loginBtn.textContent = 'Logging in...';
        loginBtn.disabled = true;
        
        setTimeout(() => {
            loginBtn.textContent = originalText;
            loginBtn.disabled = false;

            showNotification();
        }, 1500);
    }
});

// Show notification function
function showNotification() {
    const notification = document.getElementById('successNotification');
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Add ripple effect to buttons
document.querySelector('.login-btn').addEventListener('click', function(e) {
    const ripples = document.querySelectorAll('.ripple');
    ripples.forEach(ripple => ripple.remove());
    
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

function checkViewport() {
    const container = document.querySelector('.container');
    if (window.innerWidth <= 480) {
        container.style.borderRadius = '15px';
    } else {
        container.style.borderRadius = '20px';
    }
}

window.addEventListener('load', checkViewport);
window.addEventListener('resize', checkViewport);