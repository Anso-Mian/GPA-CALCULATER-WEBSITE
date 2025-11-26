// ===== GPA Calculator Logic =====

const fixedSubjects = [
    { name: "Programming Fundamentals", credits: 3, hasProjects: true, icon: "code" },
    { name: "PF Lab", credits: 1, hasProjects: true, icon: "terminal" },
    { name: "Calculus", credits: 3, hasProjects: false, icon: "calculator" },
    { name: "ICT", credits: 1, hasProjects: true, icon: "monitor" },
    { name: "Applied Physics", credits: 3, hasProjects: false, icon: "atom" },
    { name: "Pakistan Studies", credits: 2, hasProjects: false, icon: "book" },
    { name: "Functional English", credits: 2, hasProjects: false, icon: "pen" },
    { name: "English Lab", credits: 1, hasProjects: false, icon: "mic" }
];

let subjects = [...fixedSubjects];
let subjectData = {};

// Icon SVGs
const icons = {
    code: '<path d="m7 8-4 4 4 4M17 8l4 4-4 4M14 4l-4 16"/>',
    terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
    calculator: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="8" y1="18" x2="8" y2="18.01"/><line x1="12" y1="18" x2="12" y2="18.01"/><line x1="16" y1="18" x2="16" y2="18.01"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    atom: '<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    pen: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/>',
    mic: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>',
    chevron: '<polyline points="6 9 12 15 18 9"/>'
};

// Initialize
function init() {
    loadFromLocalStorage();
    renderSubjects();
}

// Render all subjects
function renderSubjects() {
    const container = document.getElementById('subjectsSection');
    if (!container) return;
    
    container.innerHTML = '';
    
    subjects.forEach((subject, index) => {
        const card = createSubjectCard(subject, index);
        container.appendChild(card);
    });
}

// Create subject card
function createSubjectCard(subject, index) {
    const card = document.createElement('div');
    card.className = 'subject-card';
    
    const assessmentTypes = ['Assignments', 'Quizzes', 'Sessional 1', 'Sessional 2', 'Final'];
    if (subject.hasProjects) assessmentTypes.push('Projects');
    
    const isCustom = index >= fixedSubjects.length;
    const iconSvg = icons[subject.icon] || icons.book;
    
    card.innerHTML = `
        <div class="subject-header" onclick="toggleSubject(${index})">
            <div class="subject-info">
                <div class="subject-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        ${iconSvg}
                    </svg>
                </div>
                <div>
                    <div class="subject-name">${subject.name}</div>
                    <div class="subject-credits">${subject.credits} Credit${subject.credits > 1 ? 's' : ''}</div>
                </div>
            </div>
            <div class="subject-actions">
                <span class="credits-badge">${subject.credits} CR</span>
                ${isCustom ? `
                    <button class="remove-subject-btn" onclick="event.stopPropagation(); removeSubject(${index})" aria-label="Remove subject">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                        </svg>
                    </button>
                ` : ''}
                <svg class="toggle-icon" id="toggle-${index}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${icons.chevron}
                </svg>
            </div>
        </div>
        <div class="subject-content" id="content-${index}">
            <div class="subject-inner">
                <div class="assessment-tabs" id="tabs-${index}">
                    ${assessmentTypes.map((type, i) => `
                        <button class="assessment-tab ${i === 0 ? 'active' : ''}" 
                                onclick="showAssessment(${index}, '${type}', this)">
                            ${type}
                        </button>
                    `).join('')}
                </div>
                ${assessmentTypes.map((type, i) => `
                    <div class="assessment-section ${i === 0 ? 'active' : ''}" id="assessment-${index}-${type.replace(/\s+/g, '-')}">
                        <div class="assessment-header">
                            <div class="assessment-title">${type}</div>
                            <button class="btn btn-primary add-entry-btn" onclick="addEntry(${index}, '${type}')">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                                    <line x1="12" y1="5" x2="12" y2="19"/>
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                </svg>
                                Add Entry
                            </button>
                        </div>
                        <div class="entries-list" id="entries-${index}-${type.replace(/\s+/g, '-')}">
                            <div class="empty-entries">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                    <line x1="12" y1="18" x2="12" y2="12"/>
                                    <line x1="9" y1="15" x2="15" y2="15"/>
                                </svg>
                                <p>No entries yet. Click "Add Entry" to start.</p>
                            </div>
                        </div>
                        <div class="stats-display" id="stats-${index}-${type.replace(/\s+/g, '-')}" style="display: none;"></div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Toggle subject visibility
function toggleSubject(index) {
    const content = document.getElementById(`content-${index}`);
    const toggle = document.getElementById(`toggle-${index}`);
    content.classList.toggle('active');
    toggle.classList.toggle('active');
}

// Show assessment type
function showAssessment(subjectIndex, type, button) {
    const parent = button.closest('.subject-inner');
    
    parent.querySelectorAll('.assessment-section').forEach(el => {
        el.classList.remove('active');
    });
    
    parent.querySelectorAll('.assessment-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const assessmentId = `assessment-${subjectIndex}-${type.replace(/\s+/g, '-')}`;
    document.getElementById(assessmentId).classList.add('active');
    button.classList.add('active');
}

// Add entry
function addEntry(subjectIndex, type) {
    const subject = subjects[subjectIndex];
    const subjectKey = `${subjectIndex}-${subject.name}`;
    
    if (!subjectData[subjectKey]) subjectData[subjectKey] = {};
    if (!subjectData[subjectKey][type]) subjectData[subjectKey][type] = [];
    
    subjectData[subjectKey][type].push({
        marksObtained: 0,
        totalMarks: 0,
        classAverageMarks: 0,
        absoluteValue: 0
    });
    
    renderEntries(subjectIndex, type);
    saveToLocalStorage();
}

// Render entries
function renderEntries(subjectIndex, type) {
    const subject = subjects[subjectIndex];
    const subjectKey = `${subjectIndex}-${subject.name}`;
    const container = document.getElementById(`entries-${subjectIndex}-${type.replace(/\s+/g, '-')}`);
    const statsContainer = document.getElementById(`stats-${subjectIndex}-${type.replace(/\s+/g, '-')}`);
    
    if (!subjectData[subjectKey] || !subjectData[subjectKey][type] || subjectData[subjectKey][type].length === 0) {
        container.innerHTML = `
            <div class="empty-entries">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="12" y1="18" x2="12" y2="12"/>
                    <line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
                <p>No entries yet. Click "Add Entry" to start.</p>
            </div>
        `;
        statsContainer.style.display = 'none';
        return;
    }
    
    const entries = subjectData[subjectKey][type];
    container.innerHTML = entries.map((entry, i) => {
        const marksObtained = parseFloat(entry.marksObtained) || 0;
        const totalMarks = parseFloat(entry.totalMarks) || 1;
        const classAverageMarks = parseFloat(entry.classAverageMarks) || 0;
        const absoluteValue = parseFloat(entry.absoluteValue) || 0;
        
        const yourAbsolute = totalMarks > 0 ? (marksObtained / totalMarks) * absoluteValue : 0;
        const classAbsolute = totalMarks > 0 ? (classAverageMarks / totalMarks) * absoluteValue : 0;
        
        return `
            <div class="entry-item">
                <div class="entry-inputs">
                    <div class="form-group">
                        <label class="form-label">Your Marks</label>
                        <input type="number" class="form-input" value="${entry.marksObtained}" 
                               onchange="updateEntry(${subjectIndex}, '${type}', ${i}, 'marksObtained', this.value)"
                               min="0" step="0.01">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Total Marks</label>
                        <input type="number" class="form-input" value="${entry.totalMarks}" 
                               onchange="updateEntry(${subjectIndex}, '${type}', ${i}, 'totalMarks', this.value)"
                               min="0" step="0.01">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Class Average</label>
                        <input type="number" class="form-input" value="${entry.classAverageMarks}" 
                               onchange="updateEntry(${subjectIndex}, '${type}', ${i}, 'classAverageMarks', this.value)"
                               min="0" step="0.01">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Absolute Value</label>
                        <input type="number" class="form-input" value="${entry.absoluteValue}" 
                               onchange="updateEntry(${subjectIndex}, '${type}', ${i}, 'absoluteValue', this.value)"
                               min="0" step="0.01">
                    </div>
                </div>
                <div class="calculated-values">
                    <div class="calc-item">
                        <span class="calc-label">Your Absolute:</span>
                        <span class="calc-value">${yourAbsolute.toFixed(2)}</span>
                    </div>
                    <div class="calc-item">
                        <span class="calc-label">Class Absolute:</span>
                        <span class="calc-value">${classAbsolute.toFixed(2)}</span>
                    </div>
                    <div class="calc-item">
                        <span class="calc-label">Your %:</span>
                        <span class="calc-value">${totalMarks > 0 ? ((marksObtained / totalMarks) * 100).toFixed(1) : 0}%</span>
                    </div>
                    <div class="calc-item">
                        <span class="calc-label">Class %:</span>
                        <span class="calc-value">${totalMarks > 0 ? ((classAverageMarks / totalMarks) * 100).toFixed(1) : 0}%</span>
                    </div>
                </div>
                <button class="remove-entry-btn" onclick="removeEntry(${subjectIndex}, '${type}', ${i})">
                    Remove Entry
                </button>
            </div>
        `;
    }).join('');
    
    updateStats(subjectIndex, type);
}

// Update entry
function updateEntry(subjectIndex, type, entryIndex, field, value) {
    const subject = subjects[subjectIndex];
    const subjectKey = `${subjectIndex}-${subject.name}`;
    
    if (subjectData[subjectKey] && subjectData[subjectKey][type]) {
        subjectData[subjectKey][type][entryIndex][field] = parseFloat(value) || 0;
        renderEntries(subjectIndex, type);
        saveToLocalStorage();
        calculateGPA();
    }
}

// Remove entry
function removeEntry(subjectIndex, type, entryIndex) {
    const subject = subjects[subjectIndex];
    const subjectKey = `${subjectIndex}-${subject.name}`;
    
    if (subjectData[subjectKey] && subjectData[subjectKey][type]) {
        subjectData[subjectKey][type].splice(entryIndex, 1);
        renderEntries(subjectIndex, type);
        saveToLocalStorage();
        calculateGPA();
    }
}

// Update stats
function updateStats(subjectIndex, type) {
    const subject = subjects[subjectIndex];
    const subjectKey = `${subjectIndex}-${subject.name}`;
    const container = document.getElementById(`stats-${subjectIndex}-${type.replace(/\s+/g, '-')}`);
    
    if (!subjectData[subjectKey] || !subjectData[subjectKey][type] || subjectData[subjectKey][type].length === 0) {
        container.style.display = 'none';
        return;
    }
    
    const entries = subjectData[subjectKey][type];
    let totalYourAbsolutes = 0, totalClassAbsolutes = 0, totalYourMarks = 0, totalClassMarks = 0, totalMarks = 0;
    
    entries.forEach(entry => {
        const marksObtained = parseFloat(entry.marksObtained) || 0;
        const totalMarksValue = parseFloat(entry.totalMarks) || 0;
        const classAverageMarks = parseFloat(entry.classAverageMarks) || 0;
        const absoluteValue = parseFloat(entry.absoluteValue) || 0;
        
        totalYourAbsolutes += totalMarksValue > 0 ? (marksObtained / totalMarksValue) * absoluteValue : 0;
        totalClassAbsolutes += totalMarksValue > 0 ? (classAverageMarks / totalMarksValue) * absoluteValue : 0;
        totalYourMarks += marksObtained;
        totalClassMarks += classAverageMarks;
        totalMarks += totalMarksValue;
    });
    
    container.style.display = 'grid';
    container.innerHTML = `
        <div class="stat-item">
            <div class="stat-label">Your Absolute</div>
            <div class="stat-value">${totalYourAbsolutes.toFixed(2)}</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Class Absolute</div>
            <div class="stat-value">${totalClassAbsolutes.toFixed(2)}</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Your Avg %</div>
            <div class="stat-value">${totalMarks > 0 ? ((totalYourMarks / totalMarks) * 100).toFixed(1) : 0}%</div>
        </div>
        <div class="stat-item">
            <div class="stat-label">Class Avg %</div>
            <div class="stat-value">${totalMarks > 0 ? ((totalClassMarks / totalMarks) * 100).toFixed(1) : 0}%</div>
        </div>
    `;
}

// Calculate GPA with rocket animation
function calculateGPA() {
    const btn = document.querySelector('.calculate-btn');
    
    // Trigger rocket animation
    btn.classList.add('animating');
    
    setTimeout(() => {
        btn.classList.remove('animating');
    }, 1500);
    
    let totalYourAbsolutes = 0;
    let totalClassAbsolutes = 0;
    let totalPossibleAbsolutes = 0;
    
    subjects.forEach((subject, index) => {
        const subjectKey = `${index}-${subject.name}`;
        
        if (subjectData[subjectKey]) {
            Object.keys(subjectData[subjectKey]).forEach(type => {
                const entries = subjectData[subjectKey][type];
                
                entries.forEach(entry => {
                    const marksObtained = parseFloat(entry.marksObtained) || 0;
                    const totalMarks = parseFloat(entry.totalMarks) || 0;
                    const classAverageMarks = parseFloat(entry.classAverageMarks) || 0;
                    const absoluteValue = parseFloat(entry.absoluteValue) || 0;
                    
                    if (totalMarks > 0 && absoluteValue > 0) {
                        totalYourAbsolutes += (marksObtained / totalMarks) * absoluteValue;
                        totalClassAbsolutes += (classAverageMarks / totalMarks) * absoluteValue;
                        totalPossibleAbsolutes += absoluteValue;
                    }
                });
            });
        }
    });
    
    // Update display
    document.getElementById('totalAbsolutes').textContent = totalYourAbsolutes.toFixed(2);
    document.getElementById('avgAbsolute').textContent = (totalPossibleAbsolutes > 0 ? (totalClassAbsolutes / totalPossibleAbsolutes * 4).toFixed(2) : '0.00');
    document.getElementById('compareAbsolute').textContent = (totalYourAbsolutes - totalClassAbsolutes).toFixed(2);
    
    const gpaValue = totalPossibleAbsolutes > 0 ? (totalYourAbsolutes / totalPossibleAbsolutes) * 4 : 0;
    
    // Animate GPA value
    animateGPA(gpaValue);
    
    // Update grade badge
    let grade = '-';
    if (gpaValue >= 3.8) grade = 'A+';
    else if (gpaValue >= 3.5) grade = 'A';
    else if (gpaValue >= 3.0) grade = 'B+';
    else if (gpaValue >= 2.5) grade = 'B';
    else if (gpaValue >= 2.0) grade = 'C';
    else if (gpaValue >= 1.5) grade = 'D';
    else if (gpaValue > 0) grade = 'F';
    
    document.getElementById('gpaBadge').textContent = grade;
    
    // Update circle progress
    const progress = document.getElementById('gpaProgress');
    const circumference = 565.48;
    const offset = circumference - (gpaValue / 4) * circumference;
    progress.style.strokeDashoffset = offset;
    
    // Fireworks if GPA >= 3
    if (gpaValue >= 3) {
        setTimeout(() => {
            createFireworks();
        }, 1000);
    }
    
    generateSuggestions(gpaValue);
}

// Animate GPA counter
function animateGPA(target) {
    const element = document.getElementById('gpaValue');
    const duration = 1000;
    const start = parseFloat(element.textContent) || 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * easeOut;
        
        element.textContent = current.toFixed(2);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Create fireworks
function createFireworks() {
    const container = document.getElementById('fireworksContainer');
    const colors = ['#6366f1', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#ec4899'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight / 2);
            
            for (let j = 0; j < 30; j++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                const angle = (j / 30) * Math.PI * 2;
                const velocity = 50 + Math.random() * 100;
                particle.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
                particle.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');
                
                container.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 1500);
            }
        }, i * 300);
    }
}

// Generate suggestions
function generateSuggestions(gpaValue) {
    const container = document.getElementById('suggestionsContainer');
    const suggestions = [];
    
    if (gpaValue >= 3.5) {
        suggestions.push({ text: `Outstanding! Your GPA of ${gpaValue.toFixed(2)} is exceptional. Keep up the excellent work!`, good: true });
    } else if (gpaValue >= 3.0) {
        suggestions.push({ text: `Great job! Your GPA of ${gpaValue.toFixed(2)} shows strong performance. Aim for even higher!`, good: true });
    } else if (gpaValue >= 2.5) {
        suggestions.push({ text: `Your GPA is ${gpaValue.toFixed(2)}. Focus on weak subjects to improve your overall score.`, good: false });
    } else if (gpaValue > 0) {
        suggestions.push({ text: `Your GPA of ${gpaValue.toFixed(2)} needs attention. Consider study groups and extra practice.`, good: false });
    }
    
    if (suggestions.length === 0) {
        container.innerHTML = '<p class="no-suggestions">Add grades to see personalized tips!</p>';
    } else {
        container.innerHTML = suggestions.map(s => 
            `<div class="suggestion-item ${s.good ? 'good' : ''}">${s.text}</div>`
        ).join('');
    }
}

// Add custom subject
function addCustomSubject() {
    const name = document.getElementById('newSubjectName').value.trim();
    const credits = parseInt(document.getElementById('newSubjectCredits').value) || 3;
    
    if (!name) {
        alert('Please enter a subject name');
        return;
    }
    
    subjects.push({
        name: name,
        credits: credits,
        hasProjects: true,
        icon: 'book'
    });
    
    document.getElementById('newSubjectName').value = '';
    document.getElementById('newSubjectCredits').value = '';
    
    renderSubjects();
    saveToLocalStorage();
}

// Remove subject
function removeSubject(index) {
    if (index < fixedSubjects.length) {
        alert('Cannot remove default subjects!');
        return;
    }
    
    if (confirm(`Remove "${subjects[index].name}"? All data will be lost.`)) {
        const subjectKey = `${index}-${subjects[index].name}`;
        delete subjectData[subjectKey];
        subjects.splice(index, 1);
        renderSubjects();
        saveToLocalStorage();
        calculateGPA();
    }
}

// Local storage
function saveToLocalStorage() {
    localStorage.setItem('gpaCalculatorData', JSON.stringify({
        subjects: subjects,
        subjectData: subjectData
    }));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('gpaCalculatorData');
    if (data) {
        const parsed = JSON.parse(data);
        subjects = parsed.subjects || [...fixedSubjects];
        subjectData = parsed.subjectData || {};
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
