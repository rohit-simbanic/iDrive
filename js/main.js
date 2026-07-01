document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // Sidebar Navigation Dropdown Toggles
  // ==========================================
  const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
  
  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      
      const parentNavItem = trigger.closest('.nav-item');
      if (!parentNavItem) return;
      
      const isOpen = parentNavItem.classList.contains('open');
      
      // Toggle open class on the parent nav-item
      parentNavItem.classList.toggle('open');
      
      // Update aria-expanded attribute for screen readers
      trigger.setAttribute('aria-expanded', !isOpen);
      
      // Swap chevron icon in the SVG definition
      const chevron = trigger.querySelector('.chevron-icon');
      if (chevron) {
        if (!isOpen) {
          chevron.querySelector('use').setAttribute('href', '#Path_312');
          chevron.setAttribute('viewBox', '7.99 226.95 7.93 3.99');
        } else {
          chevron.querySelector('use').setAttribute('href', '#Path_3121');
          chevron.setAttribute('viewBox', '7.99 158.14 7.93 3.99');
        }
      }
    });
  });

  // ==========================================
  // Sidebar Collapse & Mobile Drawer Toggles
  // ==========================================
  const sidebar = document.getElementById('sidebar');
  const desktopToggleBtn = document.getElementById('sidebar-toggle');
  const mobileToggleBtn = document.getElementById('mobile-sidebar-toggle');
  const overlay = document.getElementById('sidebar-overlay');

  // Desktop sidebar collapse toggle
  if (desktopToggleBtn) {
    desktopToggleBtn.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        // On mobile view, collapse acts as closing the drawer
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        document.body.classList.remove('scroll-lock');
      } else {
        // On desktop view, toggle mini icon sidebar mode
        sidebar.classList.toggle('collapsed');
      }
    });
  }

  // Mobile off-canvas drawer open toggle
  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
      sidebar.classList.remove('collapsed');
      overlay.classList.add('open');
      document.body.classList.add('scroll-lock');
    });
  }

  // Mobile dark overlay close toggle
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      document.body.classList.remove('scroll-lock');
    });
  }

  // Auto-collapse on tablet initialization
  if (sidebar && window.innerWidth <= 992 && window.innerWidth > 768) {
    sidebar.classList.add('collapsed');
  }

  // Debounce helper to limit function execution rate during window resizing
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Auto-close mobile drawer and handle tablet collapse state on window resize (debounced for performance)
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768) {
      sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.body.classList.remove('scroll-lock');
    }
    
    // Auto-collapse on tablet resize, expand on desktop resize
    if (window.innerWidth <= 992 && window.innerWidth > 768) {
      sidebar.classList.add('collapsed');
    } else if (window.innerWidth > 992) {
      sidebar.classList.remove('collapsed');
    }
  }, 150));

  // ==========================================
  // Sub-Navigation Active State Toggle
  // ==========================================
  const subNavLinks = document.querySelectorAll('.sub-nav-link');
  
  subNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all sublinks
      subNavLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      link.classList.add('active');
      
      // Remove active class from all main nav items
      const navItems = document.querySelectorAll('.nav-list > .nav-item');
      navItems.forEach(item => item.classList.remove('active'));
      
      // Add active class to the parent nav item of the clicked sub-link
      const parentNavItem = link.closest('.nav-item');
      if (parentNavItem) {
        parentNavItem.classList.add('active');
      }
    });
  });

  // ==========================================
  // Form Validation & Handling
  // ==========================================
  const form = document.getElementById('add-user-form');
  const successNotification = document.getElementById('success-notification');
  
  // Form Fields
  const fields = {
    firstName: {
      input: document.getElementById('first-name'),
      group: document.getElementById('group-first-name'),
      error: document.getElementById('error-first-name'),
      label: 'First Name'
    },
    lastName: {
      input: document.getElementById('last-name'),
      group: document.getElementById('group-last-name'),
      error: document.getElementById('error-last-name'),
      label: 'Last Name'
    },
    email: {
      input: document.getElementById('email'),
      group: document.getElementById('group-email'),
      error: document.getElementById('error-email'),
      label: 'Email Address'
    },
    password: {
      input: document.getElementById('password'),
      group: document.getElementById('group-password'),
      error: document.getElementById('error-password'),
      label: 'Password'
    },
    confirmPassword: {
      input: document.getElementById('confirm-password'),
      group: document.getElementById('group-confirm-password'),
      error: document.getElementById('error-confirm-password'),
      label: 'Confirm Password'
    }
  };

  // Helper to show error
  const showError = (fieldKey, message) => {
    const field = fields[fieldKey];
    field.group.classList.add('invalid');
    field.error.textContent = message;
  };

  // Helper to clear error
  const clearError = (fieldKey) => {
    const field = fields[fieldKey];
    field.group.classList.remove('invalid');
    field.error.textContent = '';
  };

  // Email format regex pattern (Stricter validation)
  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  // Name format regex pattern (letters, spaces, hyphens, apostrophes, 2+ chars)
  const isValidName = (name) => {
    const re = /^[a-zA-Z\s'-]{2,50}$/;
    return re.test(name);
  };

  // Password strength regex pattern (8+ chars, uppercase, lowercase, number, symbol)
  const isStrongPassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  // Single field validation logic
  const validateField = (key) => {
    const field = fields[key];
    const val = field.input.value.trim();
    
    // 1. Required check
    if (!val) {
      showError(key, `${field.label} is required.`);
      return false;
    }

    // 2. Name validation (First Name & Last Name)
    if ((key === 'firstName' || key === 'lastName') && !isValidName(val)) {
      showError(key, `${field.label} must be at least 2 characters and only contain letters.`);
      return false;
    }
    
    // 3. Email format check
    if (key === 'email' && !isValidEmail(val)) {
      showError(key, 'Please enter a valid email address.');
      return false;
    }

    // 4. Password complexity check
    if (key === 'password' && !isStrongPassword(val)) {
      showError(key, 'Password must be at least 8 characters and contain uppercase, lowercase, numbers, and symbols.');
      return false;
    }
    
    // 5. Confirm Password match check
    if (key === 'confirmPassword') {
      const passwordVal = fields.password.input.value.trim();
      if (val !== passwordVal) {
        showError(key, 'Passwords do not match.');
        return false;
      }
    }

    clearError(key);

    // Re-validate confirmPassword if main password value changes
    if (key === 'password' && fields.confirmPassword.input.value.trim()) {
      validateField('confirmPassword');
    }

    return true;
  };

  // Add real-time input/blur validation for excellent user experience
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    
    // Validate on blur (when user finishes interacting with input)
    field.input.addEventListener('blur', () => {
      validateField(key);
    });
    
    // Clear error on input (while user is typing) if valid
    field.input.addEventListener('input', () => {
      // If currently showing an error, check if user has corrected it
      if (field.group.classList.contains('invalid')) {
        validateField(key);
      }
    });
  });

  // Submit handler
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isFormValid = true;
      let firstInvalidInput = null;
      
      // Validate all fields in order
      const keys = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
      keys.forEach(key => {
        const isValid = validateField(key);
        if (!isValid) {
          isFormValid = false;
          if (!firstInvalidInput) {
            firstInvalidInput = fields[key].input;
          }
        }
      });
      
      // Handle outcome
      if (isFormValid) {
        // Show success toast
        if (successNotification) {
          successNotification.classList.add('show');
          
          // Auto-hide success toast after 3 seconds
          setTimeout(() => {
            successNotification.classList.remove('show');
          }, 3500);
        }
        
        // Reset form inputs & clear classes
        form.reset();
        Object.keys(fields).forEach(key => {
          clearError(key);
        });
        
        console.log('Form successfully validated and submitted!');
      } else {
        // Focus the first invalid input field for accessibility
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
      }
    });
  }

  // Password visibility toggler
  const toggleBtns = document.querySelectorAll('.password-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      const eyeOpen = btn.querySelector('.eye-open');
      const eyeClosed = btn.querySelector('.eye-closed');
      
      if (input.type === 'password') {
        input.type = 'text';
        if (eyeOpen) eyeOpen.style.display = 'none';
        if (eyeClosed) eyeClosed.style.display = 'block';
      } else {
        input.type = 'password';
        if (eyeOpen) eyeOpen.style.display = 'block';
        if (eyeClosed) eyeClosed.style.display = 'none';
      }
    });
  });

});