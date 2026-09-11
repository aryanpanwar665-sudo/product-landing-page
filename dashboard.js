// Dashboard JavaScript - Interactive Features

// Mock data for dashboard
const dashboardData = {
    revenue: 24580,
    users: 3420,
    conversionRate: 4.8,
    rating: 4.7,
    activities: [
        { type: 'purchase', title: 'New Purchase', time: '2 minutes ago', value: '+$450' },
        { type: 'signup', title: 'New Signup', time: '15 minutes ago', value: '+1' },
        { type: 'review', title: 'Customer Review', time: '1 hour ago', value: '⭐⭐⭐⭐⭐' },
        { type: 'newsletter', title: 'Newsletter Signup', time: '3 hours ago', value: '+12' }
    ]
};

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard initialized');
    updateLastUpdate();
    attachEventListeners();
});

// Refresh button functionality
function refreshData() {
    const btn = document.querySelector('.btn-refresh');
    btn.style.transform = 'rotate(360deg)';
    
    setTimeout(() => {
        btn.style.transform = 'rotate(0deg)';
        updateLastUpdate();
        showNotification('Dashboard refreshed successfully!');
    }, 1000);
}

// Update last update timestamp
function updateLastUpdate() {
    const lastUpdateElement = document.getElementById('last-update');
    lastUpdateElement.textContent = 'Just now';
}

// Attach event listeners to interactive elements
function attachEventListeners() {
    // Add hover effects to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            showCardDetails(this);
        });
    });

    // Add interactivity to bar chart
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        bar.addEventListener('click', function() {
            showBarDetails(index);
        });
    });

    // Add interactivity to activity items
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        item.addEventListener('click', function() {
            highlightActivityItem(this);
        });
    });
}

// Show details when stat card is clicked
function showCardDetails(card) {
    const title = card.querySelector('h3').textContent;
    const value = card.querySelector('.stat-value').textContent;
    showNotification(`${title}: ${value}`);
}

// Show bar chart details
function showBarDetails(index) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const values = [45, 60, 55, 75, 80, 90, 70];
    showNotification(`${days[index]}: ${values[index]}% performance`);
}

// Highlight activity item
function highlightActivityItem(item) {
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(a => a.style.opacity = '0.5');
    item.style.opacity = '1';
    
    setTimeout(() => {
        activityItems.forEach(a => a.style.opacity = '1');
    }, 2000);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    .stat-card {
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .stat-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.1);
        transition: left 0.3s ease;
    }

    .stat-card:hover::before {
        left: 100%;
    }

    .activity-item {
        cursor: pointer;
    }

    .bar {
        cursor: pointer;
    }
`;
document.head.appendChild(style);

// Real-time data updates simulation
setInterval(() => {
    // Simulate data changes
    const randomChange = Math.floor(Math.random() * 100) - 50;
    // In a real application, this would fetch new data from an API
}, 30000); // Update every 30 seconds

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        refreshData,
        showNotification,
        dashboardData
    };
}
