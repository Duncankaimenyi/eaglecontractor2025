
        // ===== CONFIGURATION =====
        const CONFIG = {
            // EmailJS Configuration (Configured)
            EMAILJS: {
                SERVICE_ID: 'service_1yzm6q8',                               // Your EmailJS Service ID
                CONTACT_TEMPLATE_ID: 'template_mwjxp7w',                    // Your Contact Template ID
                NEWSLETTER_TEMPLATE_ID: 'template_2mx0wx8',                  // Newsletter Template ID (configured)
                USER_ID: 'YOUR_USER_ID',                                     // (Optional) Legacy EmailJS User ID
                PUBLIC_KEY: 'f0YR8qOLA-6FpUt2X'                              // Your EmailJS Public Key
            },
            
            // Website Configuration
            SITE: {
                NAME: 'Eagle Contractors',
                EMAIL: 'info@eaglecontractors.com',
                PHONE: '+254713723639',
                ADDRESS: 'Westlands, Nairobi, Kenya',
                YEAR_STARTED: 2012
            },

            // Firebase configuration (paste your Firebase config below)
            FIREBASE: {
                ENABLED: true,
                API_KEY: "AIzaSyBfPR69J4AMslmlwI9qv4GeugHAn65BcRQ",
                AUTH_DOMAIN: "eagle-contractors-be1f0.firebaseapp.com",
                PROJECT_ID: "eagle-contractors-be1f0",
                STORAGE_BUCKET: "eagle-contractors-be1f0.firebasestorage.app",
                MESSAGING_SENDER_ID: "102090031448",
                APP_ID: "1:102090031448:web:36aa9efae1b9c4b7f8a52d",
                MEASUREMENT_ID: "G-83ZNZ0EL6Y"
            },
            
            // Demo Mode (Set to false in production)
            DEMO_MODE: false
        };  

        // ===== APPLICATION STATE =====
        const APP = {
            // User state
            currentUser: JSON.parse(localStorage.getItem('eagle_user')) || null,
            isLoggedIn: !!localStorage.getItem('eagle_user'),
            
            // UI state
            currentProjectFilter: 'all',
            loadedProjectsCount: 6,
            testimonialsCurrentSlide: 0,
            testimonialsAutoSlideInterval: null,
            
            // Data
            projects: [],
            testimonials: [],
            services: {},
            galleries: {},
            legalPages: {}
        };

        // ===== INITIALIZATION =====
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🚀 Eagle Contractors Website Initializing...');
            
            // Initialize EmailJS
            initializeEmailJS();
            
            // Initialize Firebase (if configured)
            initializeFirebase();

            // Load all data
            loadData();
            
            // Setup event listeners
            setupEventListeners();
            
            // Initialize UI components
            initializeUI();
            
            // Start animations
            startAnimations();
            
            console.log('✅ Website Initialized Successfully');
        });

        // ===== DATA LOADING =====
        function loadData() {
            // Load projects
            APP.projects = [
                {
                    id: 1,
                    title: 'Nairobi Corporate Tower',
                    category: 'commercial',
                    image: 'eaglecontractorsimages/modern.jpeg',
                    description: '20-story commercial building with modern offices and retail spaces in Westlands.',
                    year: '2024',
                    status: 'completed',
                    area: '15,000 sq ft',
                    client: 'TechSolutions Ltd'
                },
                {
                    id: 2,
                    title: 'Karen Luxury Villas',
                    category: 'residential',
                    image: 'eaglecontractorsimages/villa.jpeg',
                    description: 'Exclusive gated community with 15 luxury villas featuring private pools.',
                    year: '2023',
                    status: 'completed',
                    area: '5 acres',
                    client: 'Prime Properties'
                },
                {
                    id: 3,
                    title: 'Meru Southern Bypass',
                    category: 'infrastructure',
                    image: 'eaglecontractorsimages/road6.jpeg',
                    description: '10km dual carriageway road project improving traffic flow in Nairobi.',
                    year: '2024',
                    status: 'completed',
                    area: '10 km',
                    client: 'Government of Kenya'
                },
                {
                    id: 4,
                    title: 'Nissi Residence',
                    category: 'residential',
                    image: 'eaglecontractorsimages/nissi.jpg',
                    description: ' A contemporary single-family home with premium finishes, spacious living areas, and landscaped gardens.',
                    year: '2022',
                    status: 'completed',
                    area: '25,000 sq ft',
                    client: 'Urban Developers Ltd'
                },
                {
                    id: 5,
                    title: 'Kilimani Apartments',
                    category: 'residential',
                    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    description: 'Modern apartment complex with 120 units and premium amenities.',
                    year: '2023',
                    status: 'completed',
                    area: '25,000 sq ft',
                    client: 'Urban Developers Ltd'
                },
                {
                    id: 6,
                    title: 'Kikuyu Gateway link',
                    category: 'infrastructure',
                    image: 'eaglecontractorsimages/road5.jpeg',
                    description: 'Modern overpass construction to ease traffic congestion.',
                    year: '2024',
                    status: 'ongoing',
                    area: '500m',
                    client: 'Nairobi City Council'
                },
                {
                    id: 7,
                    title: 'Mombasa Beach Resort',
                    category: 'commercial',
                    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    description: 'Luxury beach resort with 200 rooms and conference facilities.',
                    year: '2025',
                    status: 'planned',
                    area: '10 acres',
                    client: 'Coastal Hotels Group'
                },
                {
                    id: 8,
                    title: 'Greenfield Eco Estate',
                    category: 'residential',
                    image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    description: 'Eco-friendly housing estate with 100 energy-efficient homes.',
                    year: '2024',
                    status: 'ongoing',
                    area: '8 acres',
                    client: 'Green Living Developers'
                }
            ];

            // Load testimonials
            APP.testimonials = [
                {
                    id: 1,
                    name: 'David Kariuki',
                    company: 'CEO, TechSolutions Ltd',
                    image: 'eaglecontractorsimages/testimonal2.jpeg',
                    rating: 5,
                    text: 'Eagle Contractors delivered our corporate headquarters ahead of schedule and within budget. Their professionalism and attention to detail were exceptional.',
                    date: '2024-01-15'
                },
                {
                    id: 2,
                    name: 'Sarah Mwangi',
                    company: 'Homeowner, Nakuru',
                    image: 'eaglecontractorsimages/testimonal.jpg',
                    rating: 5,
                    text: 'Our home renovation was handled with utmost care. The team was respectful, clean, and delivered beyond our expectations. Highly recommended!',
                    date: '2024-02-20'
                },
                {
                    id: 3,
                    name: 'James Omondi',
                    company: 'Director, Prime Properties',
                    image: 'eaglecontractorsimages/testimonals.jpeg',
                    rating: 4.5,
                    text: 'As a property developer, I\'ve worked with many contractors. Eagle stands out for their reliability, quality work, and excellent project management.',
                    date: '2024-03-10'
                },
                {
                    id: 4,
                    name: 'Grace Wanjiku',
                    company: 'Manager, Retail Chain',
                    image: 'eaglecontractorsimages/testimonal5.jpeg',
                    rating: 5,
                    text: 'They completed our store renovations during off-hours to minimize business disruption. Highly professional and efficient team.',
                    date: '2024-04-05'
                }
            ];

            // Load galleries
            APP.galleries = {
                about: [
                    'eaglecontractorsimages/estate.jpeg',
                    'eaglecontractorsimages/estate3.jpeg',
                    'eaglecontractorsimages/home.jpeg',
                    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    'eaglecontractorsimages/modern.jpeg',
                    'eaglecontractorsimages/road5.jpeg',
                    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    'eaglecontractorsimages/qulityassuranc.jpeg',
                    'eaglecontractorsimages/home6.jpeg'
                ],
                residential: [
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    'eaglecontractorsimages/villa2.jpeg',
                    'eaglecontractorsimages/estate.jpeg'
                ],
                commercial: [
                    'eaglecontractorsimages/modern2.jpeg',
                    'eaglecontractorsimages/estate1.jpeg',
                    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    'eaglecontractorsimages/commercial.jpg'
                ],
                infrastructure: [
                    'eaglecontractorsimages/road.jpeg',
                    'eaglecontractorsimages/road4.jpeg',
                    'eaglecontractorsimages/design2.jpeg',
                    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                ]
            };

            // Load legal pages
            APP.legalPages = {
                privacy: getPrivacyPolicy(),
                terms: getTermsAndConditions(),
                cookies: getCookiePolicy()
            };

            // Render initial data
            renderProjects();
            renderTestimonials();
            updateAuthUI();
        }

        // ===== EMAILJS INITIALIZATION =====
        function initializeEmailJS() {
            try {
                // Initialize EmailJS with your public key (use PUBLIC_KEY if available, fallback to USER_ID)
                emailjs.init(CONFIG.EMAILJS.PUBLIC_KEY || CONFIG.EMAILJS.USER_ID);
                console.log('✅ EmailJS Initialized');
            } catch (error) {
                console.warn('⚠️ EmailJS not configured. Please add your credentials.');
            }
        }

        // ===== FIREBASE INITIALIZATION =====
        function initializeFirebase() {
            if (!CONFIG.FIREBASE || !CONFIG.FIREBASE.ENABLED) return;

            try {
                const fbConfig = {
                    apiKey: CONFIG.FIREBASE.API_KEY,
                    authDomain: CONFIG.FIREBASE.AUTH_DOMAIN,
                    projectId: CONFIG.FIREBASE.PROJECT_ID,
                    appId: CONFIG.FIREBASE.APP_ID,
                    measurementId: CONFIG.FIREBASE.MEASUREMENT_ID
                };

                // Initialize Firebase
                firebase.initializeApp(fbConfig);
                window.FB_AUTH = firebase.auth();

                // Listen to auth state changes
                FB_AUTH.onAuthStateChanged(user => {
                    if (user) {
                        APP.currentUser = {
                            id: user.uid,
                            name: user.displayName || user.email.split('@')[0],
                            email: user.email
                        };
                        APP.isLoggedIn = true;
                        localStorage.setItem('eagle_user', JSON.stringify(APP.currentUser));
                    } else {
                        APP.currentUser = null;
                        APP.isLoggedIn = false;
                        localStorage.removeItem('eagle_user');
                    }
                    updateAuthUI();
                });

                console.log('✅ Firebase Initialized');
            } catch (err) {
                console.warn('⚠️ Firebase not configured or failed to initialize:', err);
            }
        }

        // ===== EVENT LISTENERS SETUP =====
        function setupEventListeners() {
            // Mobile menu toggle
            document.getElementById('hamburger').addEventListener('click', toggleMobileMenu);
            
            // Navigation links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    if (this.getAttribute('href').startsWith('#')) {
                        e.preventDefault();
                        const targetId = this.getAttribute('href').substring(1);
                        scrollToSection(targetId);
                        closeMobileMenu();
                    }
                });
            });

            // Project filter buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    filterProjects(filter);
                    
                    // Update active button
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // Testimonial slider controls
            document.getElementById('prevBtn').addEventListener('click', prevTestimonial);
            document.getElementById('nextBtn').addEventListener('click', nextTestimonial);

            // Budget range input
            const budgetInput = document.getElementById('budget');
            const budgetValue = document.getElementById('budgetValue');
            if (budgetInput) {
                budgetInput.addEventListener('input', function() {
                    const value = parseInt(this.value).toLocaleString();
                    budgetValue.textContent = value;
                });
            }

            // Form submissions
            document.getElementById('contactForm')?.addEventListener('submit', handleContactSubmit);
            document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
            document.getElementById('registerForm')?.addEventListener('submit', handleRegister);
            document.getElementById('newsletterForm')?.addEventListener('submit', handleNewsletterSubmit);
            document.getElementById('forgotPasswordForm')?.addEventListener('submit', handleForgotPassword);

            // Auth tab switching
            document.querySelectorAll('.auth-tab').forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabName = this.getAttribute('data-tab');
                    switchAuthTab(tabName);
                });
            });

            // Modal close buttons
            document.querySelectorAll('.modal-close').forEach(btn => {
                btn.addEventListener('click', function() {
                    const modal = this.closest('.modal-overlay');
                    closeModal(modal.id);
                });
            });

            // Close modal when clicking outside
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeModal(this.id);
                    }
                });
            });

            // Window events
            window.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleResize);

            // Keyboard shortcuts
            document.addEventListener('keydown', function(e) {
                // Escape to close modals
                if (e.key === 'Escape') {
                    const openModal = document.querySelector('.modal-overlay[style*="display: flex"]');
                    if (openModal) closeModal(openModal.id);
                }
                
                // Left/Right for testimonial navigation
                if (e.key === 'ArrowLeft') prevTestimonial();
                if (e.key === 'ArrowRight') nextTestimonial();
            });
        }

        // ===== UI INITIALIZATION =====
        function initializeUI() {
            // Animate statistics
            animateStatistics();
            
            // Start testimonial auto-slide
            startTestimonialAutoSlide();
            
            // Update copyright year
            updateCopyrightYear();
            
            // Check for user session
            checkUserSession();
        }

        // ===== RENDER FUNCTIONS =====
        function renderProjects() {
            const container = document.getElementById('projectsContainer');
            if (!container) return;

            const filteredProjects = APP.currentProjectFilter === 'all' 
                ? APP.projects.slice(0, APP.loadedProjectsCount)
                : APP.projects.filter(p => p.category === APP.currentProjectFilter).slice(0, APP.loadedProjectsCount);

            container.innerHTML = filteredProjects.map(project => `
                <div class="project-card" data-category="${project.category}">
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}">
                        <div style="position: absolute; top: 15px; right: 15px; background: rgba(0,0,0,0.7); color: white; padding: 5px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
                            ${project.status}
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${project.title}</h3>
                        <p style="color: var(--gray); margin-bottom: 15px;">${project.description}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
                            <span class="project-category">${project.category}</span>
                            <span style="font-size: 0.9rem; color: var(--gray);">${project.year}</span>
                        </div>
                        <div style="margin-top: 15px; display: flex; gap: 10px;">
                            <button class="btn" style="flex: 1;" onclick="showProjectDetails(${project.id})">
                                <i class="fas fa-info-circle"></i> Details
                            </button>
                            <button class="btn" style="flex: 1;" onclick="showGalleryModal('${project.category}')">
                                <i class="fas fa-images"></i> Gallery
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function renderTestimonials() {
            const track = document.getElementById('testimonialsTrack');
            const dots = document.getElementById('sliderDots');
            if (!track || !dots) return;

            track.innerHTML = APP.testimonials.map((testimonial, index) => `
                <div class="testimonial-slide" data-index="${index}">
                    <div class="testimonial-card">
                        <div class="client-avatar">
                            <img src="${testimonial.image}" alt="${testimonial.name}">
                        </div>
                        <div class="testimonial-rating">
                            ${'★'.repeat(Math.floor(testimonial.rating))}${testimonial.rating % 1 !== 0 ? '½' : ''}${'☆'.repeat(5 - Math.ceil(testimonial.rating))}
                        </div>
                        <p class="testimonial-text">"${testimonial.text}"</p>
                        <p class="client-name">${testimonial.name}</p>
                        <p class="client-company">${testimonial.company}</p>
                        <p style="font-size: 0.9rem; color: var(--gray); margin-top: 10px;">
                            <i class="far fa-calendar"></i> ${new Date(testimonial.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            `).join('');

            dots.innerHTML = APP.testimonials.map((_, index) => `
                <div class="slider-dot ${index === 0 ? 'active' : ''}" data-index="${index}" onclick="goToTestimonial(${index})"></div>
            `).join('');

            updateTestimonialPosition();
        }

        // ===== PROJECT FUNCTIONS =====
        function filterProjects(filter) {
            APP.currentProjectFilter = filter;
            APP.loadedProjectsCount = 6;
            renderProjects();
        }

        function loadMoreProjects() {
            APP.loadedProjectsCount += 3;
            renderProjects();
        }

        function showProjectDetails(projectId) {
            const project = APP.projects.find(p => p.id === projectId);
            if (!project) return;

            const modalContent = `
                <div class="details-grid">
                    <div class="details-image">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="details-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>

                        <div class="details-box">
                            <h4>Project Details</h4>
                            <div class="details-attrs">
                                <div>
                                    <strong>Category:</strong><br>
                                    <span style="color: var(--gray);">${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</span>
                                </div>
                                <div>
                                    <strong>Year:</strong><br>
                                    <span style="color: var(--gray);">${project.year}</span>
                                </div>
                                <div>
                                    <strong>Status:</strong><br>
                                    <span style="color: ${project.status === 'completed' ? 'var(--success)' : project.status === 'ongoing' ? 'var(--warning)' : 'var(--gray)'}; font-weight: 600;">${project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
                                </div>
                                <div>
                                    <strong>Area:</strong><br>
                                    <span style="color: var(--gray);">${project.area}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4>Client</h4>
                            <p style="color: var(--gray);">${project.client}</p>
                        </div>

                        <div class="details-actions">
                            <button class="btn btn-primary" onclick="showGalleryModal('${project.category}')">
                                <i class="fas fa-images"></i> View Gallery
                            </button>
                            <button class="btn" onclick="closeModal('serviceModal'); scrollToSection('contact')">
                                <i class="fas fa-envelope"></i> Get Quote
                            </button>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('serviceModalTitle').textContent = project.title;
            document.getElementById('serviceModalContent').innerHTML = modalContent;
            showModal('serviceModal');
        }

        // ===== TESTIMONIAL FUNCTIONS =====
        function nextTestimonial() {
            APP.testimonialsCurrentSlide = (APP.testimonialsCurrentSlide + 1) % APP.testimonials.length;
            updateTestimonialPosition();
        }

        function prevTestimonial() {
            APP.testimonialsCurrentSlide = (APP.testimonialsCurrentSlide - 1 + APP.testimonials.length) % APP.testimonials.length;
            updateTestimonialPosition();
        }

        function goToTestimonial(index) {
            APP.testimonialsCurrentSlide = index;
            updateTestimonialPosition();
        }

        function updateTestimonialPosition() {
            const track = document.getElementById('testimonialsTrack');
            const dots = document.querySelectorAll('.slider-dot');
            
            if (track) {
                track.style.transform = `translateX(-${APP.testimonialsCurrentSlide * 100}%)`;
            }
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === APP.testimonialsCurrentSlide);
            });
        }

        function startTestimonialAutoSlide() {
            if (APP.testimonialsAutoSlideInterval) {
                clearInterval(APP.testimonialsAutoSlideInterval);
            }
            
            APP.testimonialsAutoSlideInterval = setInterval(() => {
                nextTestimonial();
            }, 5000);
        }

        // ===== AUTH FUNCTIONS =====
        function showAuthModal(tab = 'login') {
            switchAuthTab(tab);
            showModal('authModal');
        }

        function switchAuthTab(tabName) {
            // Update tabs
            document.querySelectorAll('.auth-tab').forEach(tab => {
                tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
            });
            
            // Update content
            document.querySelectorAll('.auth-content').forEach(content => {
                content.classList.toggle('active', content.id === `${tabName}Content`);
            });
            
            // Update modal title
            document.getElementById('authModalTitle').textContent = 
                tabName === 'login' ? 'Login' : 'Create Account';
        }

        async function handleLogin(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (!email || !password) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            // In demo mode, simulate login
            if (CONFIG.DEMO_MODE) {
                // Simulate API call delay
                showToast('Logging in...', 'info');
                
                setTimeout(() => {
                    APP.currentUser = {
                        id: 1,
                        name: email.split('@')[0],
                        email: email,
                        phone: '+254713723639',
                        joined: new Date().toISOString()
                    };
                    
                    APP.isLoggedIn = true;
                    localStorage.setItem('eagle_user', JSON.stringify(APP.currentUser));
                    
                    showToast('Login successful!', 'success');
                    closeModal('authModal');
                    updateAuthUI();
                    e.target.reset();
                }, 1500);
            } else if (CONFIG.FIREBASE && CONFIG.FIREBASE.ENABLED) {
                // Use Firebase Auth for login
                try {
                    showToast('Signing in...', 'info');
                    const userCred = await FB_AUTH.signInWithEmailAndPassword(email, password);

                    APP.currentUser = {
                        id: userCred.user.uid,
                        name: userCred.user.displayName || userCred.user.email.split('@')[0],
                        email: userCred.user.email
                    };
                    APP.isLoggedIn = true;
                    localStorage.setItem('eagle_user', JSON.stringify(APP.currentUser));

                    showToast('Login successful!', 'success');
                    closeModal('authModal');
                    updateAuthUI();
                    e.target.reset();
                } catch (err) {
                    console.error('Firebase login failed:', err);
                    showToast(getFriendlyAuthError(err) || 'Login failed', 'error');
                }
            } else {
                // In production, implement actual API call
                showToast('Login functionality requires backend integration', 'warning');
            }
        }

        async function handleRegister(e) {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const phone = document.getElementById('registerPhone').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            
            // Validation
            if (!name || !email || !phone || !password || !confirmPassword) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showToast('Passwords do not match', 'error');
                return;
            }
            
            if (password.length < 8) {
                showToast('Password must be at least 8 characters', 'error');
                return;
            }
            
            if (!document.getElementById('acceptTerms').checked) {
                showToast('Please accept the terms and conditions', 'error');
                return;
            }
            
            // In demo mode, simulate registration
            if (CONFIG.DEMO_MODE) {
                showToast('Creating account...', 'info');
                
                setTimeout(() => {
                    APP.currentUser = {
                        id: Date.now(),
                        name: name,
                        email: email,
                        phone: phone,
                        joined: new Date().toISOString()
                    };
                    
                    APP.isLoggedIn = true;
                    localStorage.setItem('eagle_user', JSON.stringify(APP.currentUser));
                    
                    showToast('Account created successfully!', 'success');
                    closeModal('authModal');
                    updateAuthUI();
                    e.target.reset();
                    
                    // Show welcome message
                    setTimeout(() => {
                        showToast(`Welcome to Eagle Contractors, ${name}!`, 'success');
                    }, 500);
                }, 2000);
            } else if (CONFIG.FIREBASE && CONFIG.FIREBASE.ENABLED) {
                // Use Firebase Auth for registration
                try {
                    showToast('Creating account...', 'info');
                    const userCred = await FB_AUTH.createUserWithEmailAndPassword(email, password);

                    // Update profile with name & phone
                    await userCred.user.updateProfile({ displayName: name });

                    // Save session info
                    APP.currentUser = {
                        id: userCred.user.uid,
                        name: name,
                        email: userCred.user.email,
                        phone: phone,
                        joined: new Date().toISOString()
                    };

                    APP.isLoggedIn = true;
                    localStorage.setItem('eagle_user', JSON.stringify(APP.currentUser));

                    // Send verification email
                    try { await userCred.user.sendEmailVerification(); } catch (vErr) { console.warn('Verification email failed:', vErr); }

                    showToast('Account created successfully! Please check your email for verification.', 'success');
                    closeModal('authModal');
                    updateAuthUI();
                    e.target.reset();
                } catch (err) {
                    console.error('Firebase registration failed:', err);
                    showToast(getFriendlyAuthError(err) || 'Registration failed', 'error');
                }
            } else {
                // Default production message
                showToast('Registration functionality requires backend integration', 'warning');
            }
        }

        async function handleForgotPassword(e) {
            e.preventDefault();
            
            const email = document.getElementById('resetEmail').value;
            
            if (!email) {
                showToast('Please enter your email address', 'error');
                return;
            }
            
            if (CONFIG.DEMO_MODE) {
                showToast(`Password reset link sent to ${email}`, 'success');
                closeModal('forgotPasswordModal');
                e.target.reset();
            } else if (CONFIG.FIREBASE && CONFIG.FIREBASE.ENABLED) {
                try {
                    await FB_AUTH.sendPasswordResetEmail(email);
                    showToast(`Password reset link sent to ${email}`, 'success');
                    closeModal('forgotPasswordModal');
                    e.target.reset();
                } catch (err) {
                    console.error('Password reset failed:', err);
                    showToast(getFriendlyAuthError(err) || 'Password reset failed', 'error');
                }
            } else {
                showToast('Password reset requires backend integration', 'warning');
            }
        }

        function logout() {
            APP.currentUser = null;
            APP.isLoggedIn = false;
            localStorage.removeItem('eagle_user');
            updateAuthUI();
            showToast('Logged out successfully', 'info');
        }

        function updateAuthUI() {
            const authButtons = document.querySelector('.auth-buttons');
            if (!authButtons) return;
            
            if (APP.isLoggedIn && APP.currentUser) {
                authButtons.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div style="width: 35px; height: 35px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600;">
                                ${APP.currentUser.name.charAt(0).toUpperCase()}
                            </div>
                            <span style="font-weight: 600; color: var(--primary);">Hi, ${APP.currentUser.name.split(' ')[0]}</span>
                        </div>
                        <button class="auth-btn login-btn" onclick="logout()">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                `;
            }
        }

        // ===== FORM HANDLING =====
        async function handleContactSubmit(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value || 'Not provided';
            const service = document.getElementById('service').value || 'Not specified';
            const message = document.getElementById('message').value;
            const budget = document.getElementById('budget').value;
            
            if (!name || !email || !message) {
                showToast('Please fill in all required fields', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Send email using EmailJS
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    phone: phone,
                    service: service,
                    message: message,
                    budget: parseInt(budget).toLocaleString(),
                    date: new Date().toLocaleString(),
                    to_email: CONFIG.SITE.EMAIL
                };
                
                // Check if EmailJS is configured
                if (!CONFIG.EMAILJS.SERVICE_ID || CONFIG.EMAILJS.SERVICE_ID === 'YOUR_SERVICE_ID') {
                    // Demo mode - simulate email sending
                    setTimeout(() => {
                        showToast('Message sent successfully! (Demo Mode)', 'success');
                        e.target.reset();
                        document.getElementById('budgetValue').textContent = '5,000,000';
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 1500);
                } else {
                    // Production - send actual email
                    const response = await emailjs.send(
                        CONFIG.EMAILJS.SERVICE_ID,
                        CONFIG.EMAILJS.CONTACT_TEMPLATE_ID,
                        templateParams
                    );
                    
                    showToast('Message sent successfully! We\'ll contact you soon.', 'success');
                    e.target.reset();
                    document.getElementById('budgetValue').textContent = '5,000,000';
                }
                
            } catch (error) {
                console.error('Email sending failed:', error);
                showToast('Failed to send message. Please try again or call us directly.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }

        async function handleNewsletterSubmit(e) {
            e.preventDefault();
            
            const email = e.target.querySelector('input[type="email"]').value;
            const honeypot = e.target.querySelector('input[name="newsletter_honeypot"]')?.value;
            
            if (honeypot) return; // Bot detected, silently ignore
            if (!email) {
                showToast('Please enter your email address', 'error');
                return;
            }

            // Show a loading state if there's a button
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            }

            try {
                // If EmailJS is configured, send using the newsletter template
                if (CONFIG.EMAILJS.SERVICE_ID && CONFIG.EMAILJS.NEWSLETTER_TEMPLATE_ID && CONFIG.EMAILJS.SERVICE_ID !== 'YOUR_SERVICE_ID') {
                    const params = {
                        user_email: email,
                        date: new Date().toLocaleString()
                    };

                    await emailjs.send(
                        CONFIG.EMAILJS.SERVICE_ID,
                        CONFIG.EMAILJS.NEWSLETTER_TEMPLATE_ID,
                        params
                    );

                    showToast('Thank you for subscribing to our newsletter!', 'success');
                    e.target.reset();
                } else {
                    // Demo fallback
                    showToast('Thank you for subscribing to our newsletter! (Demo Mode)', 'success');
                    e.target.reset();
                }
            } catch (err) {
                console.error('Newsletter subscription failed:', err);
                showToast('Subscription failed. Please try again later.', 'error');
            } finally {
                if (submitBtn) {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }
        }

        // ===== MODAL FUNCTIONS =====
        function showModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }

        function showGalleryModal(category) {
            // If a details/service modal is open, close it so the gallery appears in front
            closeModal('serviceModal');

            const gallery = APP.galleries[category] || APP.galleries.about;
            const title = category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Gallery` : 'Gallery';
            
            document.getElementById('galleryModalTitle').textContent = title;
            
            const grid = document.getElementById('galleryGrid');
            grid.innerHTML = gallery.map((img, index) => `
                <div class="gallery-item" onclick="viewImage('${img}', '${title} - Image ${index + 1}')">
                    <img src="${img}" alt="Gallery Image ${index + 1}">
                </div>
            `).join('');

            // Ensure gallery modal is above other modals
            const galleryModal = document.getElementById('galleryModal');
            if (galleryModal) galleryModal.style.zIndex = 3001;
            showModal('galleryModal');
        }

        function viewImage(src, alt) {
            // Close details modal to ensure the image viewer is frontmost
            closeModal('serviceModal');

            document.getElementById('fullSizeImage').src = src;
            document.getElementById('fullSizeImage').alt = alt;

            // Ensure image viewer modal is above other modals
            const imageViewer = document.getElementById('imageViewerModal');
            if (imageViewer) imageViewer.style.zIndex = 3002;

            showModal('imageViewerModal');
        }

        function showServiceModal(serviceType) {
            const services = {
                construction: {
                    title: 'Construction Services',
                    content: `
                        <div class="service-modal-grid">
                            <div>
                                <h3 style="color: var(--primary); margin-bottom: 20px;">Complete Construction Solutions</h3>
                                <p>We provide end-to-end construction services for residential, commercial, and industrial projects.</p>
                                
                                <h4 style="margin-top: 25px; margin-bottom: 15px;">Our Construction Process:</h4>
                                <ol style="margin-bottom: 25px;">
                                    <li>Site assessment and planning</li>
                                    <li>Foundation and structural work</li>
                                    <li>Building construction</li>
                                    <li>Electrical and plumbing installation</li>
                                    <li>Finishing and interior work</li>
                                    <li>Quality inspection and handover</li>
                                </ol>
                                
                                <div style="background: var(--light); padding: 20px; border-radius: var(--border-radius);">
                                    <h4 style="margin-bottom: 15px;">Typical Timeline:</h4>
                                    <ul>
                                        <li>Small projects: 3-6 months</li>
                                        <li>Medium projects: 6-12 months</li>
                                        <li>Large projects: 12-24 months</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div>
                                <div style="background: var(--light); padding: 25px; border-radius: var(--border-radius); margin-bottom: 20px;">
                                    <h4 style="margin-bottom: 15px;">What's Included:</h4>
                                    <ul>
                                        <li>Project management</li>
                                        <li>Material procurement</li>
                                        <li>Quality assurance</li>
                                        <li>Safety compliance</li>
                                        <li>Warranty coverage</li>
                                    </ul>
                                </div>
                                
                                <div style="background: var(--light); padding: 25px; border-radius: var(--border-radius);">
                                    <h4 style="margin-bottom: 15px;">Starting Prices:</h4>
                                    <ul>
                                        <li>Residential: From KSH 2,500,000</li>
                                        <li>Commercial: From KSH 5,000,000</li>
                                        <li>Industrial: Custom quotation</li>
                                    </ul>
                                </div>
                                
                                <div style="margin-top: 30px;">
                                    <button class="btn btn-primary" onclick="closeModal('serviceModal'); scrollToSection('contact')" style="width: 100%;">
                                        <i class="fas fa-envelope"></i> Get a Free Quote
                                    </button>
                                </div>
                            </div>
                        </div>
                    `
                },
                renovation: {
                    title: 'Renovation Services',
                    content: `
                        <div class="service-modal-grid">
                            <div>
                                <h3 style="color: var(--primary); margin-bottom: 20px;">Professional Renovation Services</h3>
                                <p>Transform your existing spaces with our expert renovation and remodeling services.</p>
                                
                                <h4 style="margin-top: 25px; margin-bottom: 15px;">Renovation Services:</h4>
                                <ul style="margin-bottom: 25px;">
                                    <li>Home renovation and remodeling</li>
                                    <li>Office space renovation</li>
                                    <li>Kitchen and bathroom upgrades</li>
                                    <li>Structural modifications</li>
                                    <li>Interior redesign</li>
                                    <li>Exterior renovation</li>
                                </ul>
                                
                                <div style="background: var(--light); padding: 20px; border-radius: var(--border-radius);">
                                    <h4 style="margin-bottom: 15px;">Our Approach:</h4>
                                    <ol>
                                        <li>Consultation and design</li>
                                        <li>Minimal disruption planning</li>
                                        <li>Efficient execution</li>
                                        <li>Quality finishing</li>
                                        <li>Cleanup and handover</li>
                                    </ol>
                                </div>
                            </div>
                            
                            <div>
                                <div style="background: var(--light); padding: 25px; border-radius: var(--border-radius); margin-bottom: 20px;">
                                    <h4 style="margin-bottom: 15px;">Benefits:</h4>
                                    <ul>
                                        <li>Modernize outdated spaces</li>
                                        <li>Increase property value</li>
                                        <li>Improve functionality</li>
                                        <li>Enhance aesthetics</li>
                                        <li>Energy efficiency upgrades</li>
                                    </ul>
                                </div>
                                
                                <div style="background: var(--light); padding: 25px; border-radius: var(--border-radius);">
                                    <h4 style="margin-bottom: 15px;">Typical Costs:</h4>
                                    <ul>
                                        <li>Kitchen renovation: KSH 500,000 - 2,000,000</li>
                                        <li>Bathroom renovation: KSH 300,000 - 1,500,000</li>
                                        <li>Complete home renovation: Custom quotation</li>
                                        <li>Office renovation: From KSH 1,000,000</li>
                                    </ul>
                                </div>
                                
                                <div style="margin-top: 30px;">
                                    <button class="btn btn-primary" onclick="closeModal('serviceModal'); scrollToSection('contact')" style="width: 100%;">
                                        <i class="fas fa-envelope"></i> Get a Free Consultation
                                    </button>
                                </div>
                            </div>
                        </div>
                    `
                }
            };
            
            const service = services[serviceType] || services.construction;
            document.getElementById('serviceModalTitle').textContent = service.title;
            document.getElementById('serviceModalContent').innerHTML = service.content;
            showModal('serviceModal');
        }

        function showLegalPage(page) {
            const content = APP.legalPages[page];
            if (!content) return;
            
            document.getElementById('legalModalTitle').textContent = content.title;
            document.getElementById('legalModalContent').innerHTML = content.html;
            showModal('legalModal');
        }

        function showForgotPassword() {
            closeModal('authModal');
            showModal('forgotPasswordModal');
        }

        function showSitemap() {
            showModal('sitemapModal');
        }

        function switchToLogin() {
            closeModal('forgotPasswordModal');
            showAuthModal('login');
        }

        // ===== UI UTILITIES =====
        function toggleMobileMenu() {
            const menu = document.getElementById('navMenu');
            const hamburger = document.getElementById('hamburger');
            
            menu.classList.toggle('active');
            
            if (menu.classList.contains('active')) {
                hamburger.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }

        function closeMobileMenu() {
            const menu = document.getElementById('navMenu');
            const hamburger = document.getElementById('hamburger');
            
            menu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }

        function scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                const headerHeight = document.getElementById('mainHeader').offsetHeight;
                const offset = element.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        }

        function animateStatistics() {
            const yearsElement = document.getElementById('yearsExp');
            const projectsElement = document.getElementById('projectsDone');
            const clientsElement = document.getElementById('clientsServed');
            
            animateCounter(yearsElement, 10);
            animateCounter(projectsElement, 250);
            animateCounter(clientsElement, 150);
        }

        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                element.textContent = Math.floor(current) + '+';
                
                if (current >= target) {
                    element.textContent = target + '+';
                    clearInterval(timer);
                }
            }, 20);
        }

        function showToast(message, type = 'info') {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.className = `toast ${type}`;
            
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 5000);
        }

        /**
         * Map Firebase Auth errors to user-friendly messages for display to end users.
         * Returns a short, safe message suitable for UI display.
         */
        function getFriendlyAuthError(err) {
            if (!err) return 'An unexpected error occurred. Please try again.';
            const code = (err.code || '').toString();

            switch (code) {
                case 'auth/user-not-found':
                    return 'No account was found with that email address.';
                case 'auth/wrong-password':
                    return 'Incorrect password. Please try again.';
                case 'auth/invalid-email':
                    return 'That email address appears to be invalid.';
                case 'auth/email-already-in-use':
                    return 'That email is already registered. Try logging in.';
                case 'auth/weak-password':
                    return 'Password is too weak. Please use at least 8 characters.';
                case 'auth/too-many-requests':
                    return 'Too many attempts. Please wait a while and try again.';
                case 'auth/network-request-failed':
                    return 'Network error. Check your connection and try again.';
                default:
                    // Prefer short, non-technical err.message when reasonable
                    if (err.message && typeof err.message === 'string' && err.message.length < 120) {
                        return err.message;
                    }
                    return 'An error occurred. Please try again.';
            }
        }

        function handleScroll() {
            // Header scroll effect
            const header = document.getElementById('mainHeader');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Back to top button
            const backToTop = document.getElementById('backToTop');
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
            
            // Update active nav link based on scroll position
            updateActiveNavLink();
        }

        function handleResize() {
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        }

        function updateActiveNavLink() {
            const sections = ['home', 'about', 'services', 'projects', 'testimonials', 'contact'];
            const headerHeight = document.getElementById('mainHeader').offsetHeight;
            
            let currentSection = '';
            
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= headerHeight + 100 && rect.bottom >= headerHeight + 100) {
                        currentSection = section;
                    }
                }
            });
            
            if (currentSection) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });
            }
        }

        function updateCopyrightYear() {
            const yearElements = document.querySelectorAll('.copyright-year');
            const currentYear = new Date().getFullYear();
            
            yearElements.forEach(element => {
                if (element.textContent.includes('2025')) {
                    element.textContent = element.textContent.replace('2025', currentYear);
                }
            });
        }

        function checkUserSession() {
            if (APP.isLoggedIn && APP.currentUser) {
                // Check if session is expired (demo: 24 hours)
                const user = JSON.parse(localStorage.getItem('eagle_user'));
                if (user && user.joined) {
                    const joinedDate = new Date(user.joined);
                    const now = new Date();
                    const hoursDiff = (now - joinedDate) / (1000 * 60 * 60);
                    
                    if (hoursDiff > 24) {
                        // Session expired
                        logout();
                    }
                }
            }
        }

        function startAnimations() {
            // Add animation classes to elements on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            }, observerOptions);
            
            // Observe elements that should animate
            document.querySelectorAll('.service-card, .project-card, .stat-item').forEach(el => {
                observer.observe(el);
            });
        }

        // ===== HELPER FUNCTIONS =====
        function downloadBrochure() {
            showToast('Downloading brochure...', 'info');
            
            // In a real implementation, this would link to an actual PDF
            setTimeout(() => {
                showToast('Brochure downloaded successfully!', 'success');
            }, 1500);
        }

        function openGoogleMaps() {
            const address = encodeURIComponent(CONFIG.SITE.ADDRESS);
            window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
        }

        // ===== LEGAL CONTENT GENERATORS =====
        function getPrivacyPolicy() {
            return {
                title: 'Privacy Policy',
                html: `
                    <div class="legal-section">
                        <h2>Privacy Policy</h2>
                        <p><strong>Last Updated: January 15, 2025</strong></p>
                        
                        <p>Eagle Contractors ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
                        
                        <div class="info-box">
                            <p><strong>Important:</strong> By using our website or services, you consent to the data practices described in this policy. If you do not agree with our policies, please do not use our services.</p>
                        </div>
                        
                        <h3>1. Information We Collect</h3>
                        <p>We collect information that you provide directly to us, including:</p>
                        <ul>
                            <li>Personal identification information (name, email address, phone number)</li>
                            <li>Project details and requirements</li>
                            <li>Communication preferences</li>
                            <li>Payment information (processed securely through third-party providers)</li>
                        </ul>
                        
                        <h3>2. How We Use Your Information</h3>
                        <p>We use the collected information for:</p>
                        <ul>
                            <li>Providing and improving our services</li>
                            <li>Communicating with you about your projects</li>
                            <li>Processing transactions</li>
                            <li>Sending promotional materials (with your consent)</li>
                            <li>Complying with legal obligations</li>
                        </ul>
                        
                        <h3>3. Data Security</h3>
                        <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                        
                        <h3>4. Your Rights</h3>
                        <p>Depending on your location, you may have the right to:</p>
                        <ul>
                            <li>Access your personal data</li>
                            <li>Correct inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to processing of your data</li>
                            <li>Data portability</li>
                            <li>Withdraw consent</li>
                        </ul>
                        
                        <h3>5. Contact Us</h3>
                        <p>For privacy-related questions or to exercise your rights, contact our Data Protection Officer at:</p>
                        <p>Email: privacy@eaglecontractors.com<br>
                        Phone: +254 713 723 639</p>
                    </div>
                `
            };
        }

        function getTermsAndConditions() {
            return {
                title: 'Terms & Conditions',
                html: `
                    <div class="legal-section">
                        <h2>Terms & Conditions</h2>
                        <p><strong>Last Updated: January 15, 2025</strong></p>
                        
                        <p>Welcome to Eagle Contractors. These Terms & Conditions govern your use of our website and services.</p>
                        
                        <h3>1. Acceptance of Terms</h3>
                        <p>By accessing and using our website, you accept and agree to be bound by these Terms. If you disagree, you may not use our services.</p>
                        
                        <h3>2. Services</h3>
                        <p>We provide construction, renovation, and project management services. All services are subject to separate written agreements that specify scope, timeline, and pricing.</p>
                        
                        <h3>3. User Responsibilities</h3>
                        <p>You agree to:</p>
                        <ul>
                            <li>Provide accurate information</li>
                            <li>Maintain account security</li>
                            <li>Use services legally and ethically</li>
                            <li>Not interfere with website operation</li>
                        </ul>
                        
                        <h3>4. Payments</h3>
                        <p>Payment terms are specified in service agreements. We accept various payment methods and issue detailed invoices.</p>
                        
                        <h3>5. Intellectual Property</h3>
                        <p>All website content, including logos, designs, and text, are our property or licensed to us. You may not reproduce or distribute content without permission.</p>
                        
                        <h3>6. Limitation of Liability</h3>
                        <p>To the maximum extent permitted by law, we shall not be liable for indirect, incidental, or consequential damages arising from your use of our services.</p>
                        
                        <h3>7. Governing Law</h3>
                        <p>These Terms are governed by the laws of Kenya. Disputes shall be resolved in courts of competent jurisdiction in Nairobi.</p>
                        
                        <h3>8. Changes to Terms</h3>
                        <p>We may modify these Terms at any time. Continued use after changes constitutes acceptance.</p>
                        
                        <h3>9. Contact Information</h3>
                        <p>For questions about these Terms, contact us at:</p>
                        <p>Email: legal@eaglecontractors.com<br>
                        Phone: +254 713 723 639</p>
                    </div>
                `
            };
        }

        function getCookiePolicy() {
            return {
                title: 'Cookie Policy',
                html: `
                    <div class="legal-section">
                        <h2>Cookie Policy</h2>
                        <p><strong>Last Updated: January 15, 2025</strong></p>
                        
                        <p>This Cookie Policy explains how Eagle Contractors uses cookies and similar technologies on our website.</p>
                        
                        <h3>1. What Are Cookies?</h3>
                        <p>Cookies are small text files stored on your device when you visit websites. They help websites remember information about your visit.</p>
                        
                        <h3>2. How We Use Cookies</h3>
                        <p>We use cookies for:</p>
                        <ul>
                            <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                            <li><strong>Marketing Cookies:</strong> Used to show relevant advertisements</li>
                        </ul>
                        
                        <h3>3. Third-Party Cookies</h3>
                        <p>We may use third-party services that set their own cookies, including:</p>
                        <ul>
                            <li>Google Analytics for website analytics</li>
                            <li>Social media platforms for sharing features</li>
                            <li>Advertising networks for relevant ads</li>
                        </ul>
                        
                        <h3>4. Managing Cookies</h3>
                        <p>You can control cookies through:</p>
                        <ul>
                            <li>Browser settings (most browsers allow you to refuse cookies)</li>
                            <li>Our cookie consent banner when you first visit</li>
                            <li>Third-party opt-out tools for advertising cookies</li>
                        </ul>
                        
                        <p><strong>Note:</strong> Disabling certain cookies may affect website functionality.</p>
                        
                        <h3>5. Updates to This Policy</h3>
                        <p>We may update this Cookie Policy periodically. We will notify you of significant changes by updating the date at the top.</p>
                        
                        <h3>6. Contact Us</h3>
                        <p>For questions about our use of cookies, contact us at:</p>
                        <p>Email: privacy@eaglecontractors.com<br>
                        Phone: +254 713 723 639</p>
                    </div>
                `
            };
        }

        // ===== GLOBAL FUNCTIONS =====
        // Make functions available globally for onclick handlers
        window.showAuthModal = showAuthModal;
        window.switchAuthTab = switchAuthTab;
        window.showForgotPassword = showForgotPassword;
        window.switchToLogin = switchToLogin;
        window.showGalleryModal = showGalleryModal;
        window.viewImage = viewImage;
        window.showServiceModal = showServiceModal;
        window.showLegalPage = showLegalPage;
        window.showSitemap = showSitemap;
        window.closeModal = closeModal;
        window.scrollToSection = scrollToSection;
        window.filterProjects = filterProjects;
        window.loadMoreProjects = loadMoreProjects;
        window.showProjectDetails = showProjectDetails;
        window.prevTestimonial = prevTestimonial;
        window.nextTestimonial = nextTestimonial;
        window.goToTestimonial = goToTestimonial;
        window.logout = logout;
        window.downloadBrochure = downloadBrochure;
        window.openGoogleMaps = openGoogleMaps;

        // Back to top functionality
        document.getElementById('backToTop').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Initialize on load
        console.log('🏗️ Eagle Contractors Website Loaded Successfully!');
