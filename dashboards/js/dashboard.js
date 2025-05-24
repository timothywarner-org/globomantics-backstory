/*
 * Globomantics Fleet Analytics Dashboard JavaScript
 * Created by Tim Warner (TechTrainerTim.com), Principal Author at Pluralsight
 * These materials are part of Pluralsight training content - No warranty provided
 */

// Chart configurations
const chartColors = {
    globoBlue: '#0066CC',
    techBlack: '#1A1A1A',
    innovationOrange: '#FF6B35',
    successGreen: '#28A745',
    electricPurple: '#7B2CBF',
    dataCyan: '#00D4FF',
    neutralGray: '#6C757D',
    lightGray: '#F8F9FA'
};

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeFleetStatusChart();
    initializePerformanceTrendChart();
    initializeRobotTypesChart();
    updateLiveFeed();
    
    // Simulate real-time updates
    setInterval(updateDashboard, 5000);
});

// Fleet Status Donut Chart
function initializeFleetStatusChart() {
    const ctx = document.getElementById('fleetStatusChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Active', 'Idle', 'Maintenance', 'Offline'],
            datasets: [{
                data: [142, 8, 4, 2],
                backgroundColor: [
                    chartColors.successGreen,
                    chartColors.dataCyan,
                    chartColors.innovationOrange,
                    chartColors.neutralGray
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Performance Trend Line Chart
function initializePerformanceTrendChart() {
    const ctx = document.getElementById('performanceTrendChart').getContext('2d');
    
    // Generate data for last 7 days
    const labels = [];
    const efficiencyData = [];
    const uptimeData = [];
    const errorRateData = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
        
        // Simulate data with some variance
        efficiencyData.push(90 + Math.random() * 8);
        uptimeData.push(95 + Math.random() * 4);
        errorRateData.push(0.2 + Math.random() * 0.3);
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Efficiency %',
                    data: efficiencyData,
                    borderColor: chartColors.globoBlue,
                    backgroundColor: 'rgba(0, 102, 204, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Uptime %',
                    data: uptimeData,
                    borderColor: chartColors.successGreen,
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Error Rate %',
                    data: errorRateData,
                    borderColor: chartColors.innovationOrange,
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    min: 80,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    min: 0,
                    max: 1,
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Robot Types Bar Chart
function initializeRobotTypesChart() {
    const ctx = document.getElementById('robotTypesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Industrial', 'Consumer', 'Healthcare', 'Education'],
            datasets: [{
                label: 'Number of Robots',
                data: [89, 45, 15, 7],
                backgroundColor: [
                    chartColors.globoBlue,
                    chartColors.electricPurple,
                    chartColors.successGreen,
                    chartColors.dataCyan
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

// Update dashboard with simulated real-time data
function updateDashboard() {
    // Update KPI values with slight variations
    updateKPIValues();
    
    // Add new item to live feed
    addLiveFeedItem();
}

function updateKPIValues() {
    // Simulate small changes in KPI values
    const kpiCards = document.querySelectorAll('.kpi-card');
    kpiCards.forEach((card, index) => {
        const valueElement = card.querySelector('.kpi-value');
        const changeElement = card.querySelector('.kpi-change');
        
        if (index === 0) { // Active Robots
            const currentValue = parseInt(valueElement.textContent);
            const newValue = currentValue + Math.floor(Math.random() * 3 - 1);
            valueElement.textContent = Math.max(140, newValue);
        } else if (index === 1) { // Efficiency
            const currentValue = parseFloat(valueElement.textContent);
            const newValue = currentValue + (Math.random() * 0.4 - 0.2);
            valueElement.textContent = newValue.toFixed(1) + '%';
        }
    });
}

function updateLiveFeed() {
    const feedContainer = document.querySelector('.feed-container');
    const actions = [
        'Completed assembly task',
        'Started quality inspection',
        'Navigating to workstation',
        'Charging initiated',
        'Picked item from inventory',
        'Delivered package to station',
        'Maintenance check passed',
        'System diagnostics complete'
    ];
    
    const robots = ['GLB-1000', 'GLB-1001', 'GLB-2001', 'GLB-2002', 'GLB-3001', 'GLB-3002'];
    
    // Initial population
    for (let i = 0; i < 5; i++) {
        const feedItem = createFeedItem(robots, actions);
        feedContainer.appendChild(feedItem);
    }
}

function addLiveFeedItem() {
    const feedContainer = document.querySelector('.feed-container');
    const actions = [
        'Completed welding sequence',
        'Quality check passed',
        'Item sorted successfully',
        'Navigation complete',
        'Task #' + Math.floor(Math.random() * 9000 + 1000) + ' finished',
        'Battery level optimal',
        'Speed adjusted to optimal',
        'Obstacle avoided successfully'
    ];
    
    const robots = ['GLB-1000', 'GLB-1001', 'GLB-2001', 'GLB-2002', 'GLB-3001', 'GLB-3002'];
    
    const newItem = createFeedItem(robots, actions);
    feedContainer.insertBefore(newItem, feedContainer.firstChild);
    
    // Remove old items to prevent overflow
    while (feedContainer.children.length > 10) {
        feedContainer.removeChild(feedContainer.lastChild);
    }
    
    // Smooth scroll effect
    feedContainer.scrollTop = 0;
}

function createFeedItem(robots, actions) {
    const feedItem = document.createElement('div');
    feedItem.className = 'feed-item';
    
    const now = new Date();
    const timeString = now.toTimeString().split(' ')[0];
    
    feedItem.innerHTML = `
        <span class="feed-time">${timeString}</span>
        <span class="feed-robot">${robots[Math.floor(Math.random() * robots.length)]}</span>
        <span class="feed-action">${actions[Math.floor(Math.random() * actions.length)]}</span>
    `;
    
    return feedItem;
}

// Export functionality
document.querySelector('.btn-export')?.addEventListener('click', function() {
    alert('Export functionality would generate a PDF report with current dashboard data.\n\nThis is a demonstration placeholder.');
});

// Date filter functionality
document.querySelector('.date-filter select')?.addEventListener('change', function(e) {
    console.log('Date range changed to:', e.target.value);
    // In a real application, this would reload data for the selected time period
});