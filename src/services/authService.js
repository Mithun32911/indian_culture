// Authentication service with predefined user credentials
const users = [
  // Admin users
  { email: 'admin@heritage.com', password: 'admin123', role: 'admin', dashboard: '/admin/enthusiast-dashboard' },
  { email: 'super.admin@heritage.com', password: 'superadmin123', role: 'admin', dashboard: '/admin/enthusiast-dashboard' },
  
  // Regular users
  { email: 'user@heritage.com', password: 'user123', role: 'user', dashboard: '/admin/user-dashboard' },
  { email: 'heritage.user@gmail.com', password: 'user456', role: 'user', dashboard: '/admin/user-dashboard' },
  
  // Content creators
  { email: 'creator@heritage.com', password: 'creator123', role: 'content-creator', dashboard: '/admin/content-creator-dashboard' },
  { email: 'content.creator@gmail.com', password: 'creator456', role: 'content-creator', dashboard: '/admin/content-creator-dashboard' },
  
  // Tour guides
  { email: 'guide@heritage.com', password: 'guide123', role: 'tour-guide', dashboard: '/admin/tour-guide-dashboard' },
  { email: 'tour.guide@gmail.com', password: 'guide456', role: 'tour-guide', dashboard: '/admin/tour-guide-dashboard' },
];

export const authenticateUser = (email, password) => {
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  
  if (user) {
    // Store user info in localStorage (in a real app, use more secure methods like JWT)
    localStorage.setItem('currentUser', JSON.stringify({
      email: user.email,
      role: user.role,
      dashboard: user.dashboard
    }));
    
    return {
      success: true,
      user: {
        email: user.email,
        role: user.role,
        dashboard: user.dashboard
      }
    };
  }
  
  return {
    success: false,
    message: 'Invalid email or password'
  };
};

// Register a new user
export const registerUser = (email, password, name, role) => {
  // Check if user already exists
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (existingUser) {
    return {
      success: false,
      message: 'User with this email already exists'
    };
  }

  // Validate inputs
  if (!email || !password || !name || !role) {
    return {
      success: false,
      message: 'All fields are required'
    };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: 'Please enter a valid email address'
    };
  }

  // Password validation
  if (password.length < 6) {
    return {
      success: false,
      message: 'Password must be at least 6 characters long'
    };
  }

  // Get dashboard path based on role
  const getDashboardPath = (userRole) => {
    switch (userRole) {
      case 'admin': return '/admin/enthusiast-dashboard';
      case 'user': return '/admin/user-dashboard';
      case 'content-creator': return '/admin/content-creator-dashboard';
      case 'tour-guide': return '/admin/tour-guide-dashboard';
      default: return '/admin/user-dashboard';
    }
  };

  // Create new user
  const newUser = {
    email: email.toLowerCase(),
    password: password,
    name: name,
    role: role,
    dashboard: getDashboardPath(role),
    createdAt: new Date().toISOString()
  };

  // Add to users array (in a real app, this would be saved to a database)
  users.push(newUser);

  // Store in localStorage for persistence during the session
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  registeredUsers.push(newUser);
  localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

  return {
    success: true,
    message: 'Registration successful! You can now login.',
    user: {
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      dashboard: newUser.dashboard
    }
  };
};

// Load registered users from localStorage on app start
export const loadRegisteredUsers = () => {
  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  registeredUsers.forEach(user => {
    const exists = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (!exists) {
      users.push(user);
    }
  });
};

// Auto-load registered users on module import so in-memory users include persisted registrations
try {
  loadRegisteredUsers();
} catch (e) {
  // ignore load errors in environments without localStorage
}

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

// Get predefined users for reference (for testing purposes)
export const getPredefinedUsers = () => {
  return users.map(user => ({
    email: user.email,
    role: user.role,
    dashboard: user.dashboard
  }));
};

// Remember credentials (use with caution) - stores encrypted/plaintext credentials in localStorage
export const rememberCredentials = (email, password) => {
  try {
    const payload = { email: email.toLowerCase(), password };
    localStorage.setItem('rememberedCredentials', JSON.stringify(payload));
    return { success: true };
  } catch (e) {
    return { success: false, message: 'Failed to remember credentials' };
  }
};

export const getRememberedCredentials = () => {
  try {
    const raw = localStorage.getItem('rememberedCredentials');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const clearRememberedCredentials = () => {
  localStorage.removeItem('rememberedCredentials');
};

// Forgot-password / OTP helpers (frontend-only simulation)
const OTP_KEY = 'passwordOtps';
const OTP_TTL_MS = 1000 * 60 * 10; // 10 minutes

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

function _loadOtps() {
  try {
    return JSON.parse(localStorage.getItem(OTP_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function _saveOtps(arr) {
  localStorage.setItem(OTP_KEY, JSON.stringify(arr));
}

// Initiate forgot-password: generate OTP, save it, and (simulated) send via console or optional integration
export const initiateForgotPassword = (email) => {
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return { success: false, message: 'No account found for that email' };

  const otp = generateOtp();
  const expiresAt = Date.now() + OTP_TTL_MS;
  const otps = _loadOtps().filter(o => o.email.toLowerCase() !== email.toLowerCase());
  otps.push({ email: email.toLowerCase(), otp, expiresAt });
  _saveOtps(otps);

  // Simulate sending email by printing to console. In a real app, call an API/SMTP service here.
  // Developers can replace this with a server call or SMTP integration.
  // eslint-disable-next-line no-console
  console.info(`Forgot-password OTP for ${email}: ${otp} (valid for ${OTP_TTL_MS/60000} mins)`);

  return { success: true, message: 'OTP generated and (simulated) sent to email. Check console for the code in development.' };
};

// Verify OTP and reset password
export const verifyOtpAndReset = (email, otp, newPassword) => {
  const normalized = email.toLowerCase();
  const otps = _loadOtps();
  const recordIdx = otps.findIndex(o => o.email === normalized && o.otp === otp);
  if (recordIdx === -1) return { success: false, message: 'Invalid OTP' };
  const record = otps[recordIdx];
  if (Date.now() > record.expiresAt) {
    // remove expired
    otps.splice(recordIdx, 1);
    _saveOtps(otps);
    return { success: false, message: 'OTP expired' };
  }

  // Update user's password (in-memory and localStorage registeredUsers)
  const user = users.find(u => u.email.toLowerCase() === normalized);
  if (!user) return { success: false, message: 'User record not found' };
  user.password = newPassword;

  // Update registeredUsers persisted list if present
  try {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const idx = registeredUsers.findIndex(u => u.email.toLowerCase() === normalized);
    if (idx !== -1) {
      registeredUsers[idx].password = newPassword;
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }
  } catch (e) {
    // ignore
  }

  // remove used OTP
  otps.splice(recordIdx, 1);
  _saveOtps(otps);

  return { success: true, message: 'Password reset successful' };
};