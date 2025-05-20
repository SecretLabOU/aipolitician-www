// Architecture Animation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes with delay to create a sequential animation
    setTimeout(() => {
        document.querySelector('.section-a').classList.add('slide-in');
    }, 300);
    
    setTimeout(() => {
        document.querySelector('.section-b').classList.add('slide-in');
    }, 600);
    
    setTimeout(() => {
        document.querySelector('.section-c').classList.add('slide-in');
    }, 900);
    
    // Add the components with delay and staggered animation
    const componentsA = document.querySelectorAll('.section-a .component');
    const componentsB = document.querySelectorAll('.section-b .component');
    const componentsC = document.querySelectorAll('.section-c .component');
    
    // Animate components in section A
    componentsA.forEach((component, index) => {
        setTimeout(() => {
            component.classList.add('fade-in');
        }, 1200 + (index * 150));
    });
    
    // Animate components in section B
    componentsB.forEach((component, index) => {
        setTimeout(() => {
            component.classList.add('fade-in');
        }, 1800 + (index * 150));
    });
    
    // Animate components in section C
    componentsC.forEach((component, index) => {
        setTimeout(() => {
            component.classList.add('fade-in');
        }, 2400 + (index * 150));
    });
    
    // Add the flow lines
    setTimeout(() => {
        document.querySelectorAll('.data-flow').forEach(flow => {
            flow.classList.add('fade-in');
        });
    }, 3000);
    
    // Add the data points (animated dots)
    setTimeout(() => {
        const dataPointsAB = createDataPoints('flow-a-to-b', 4);
        const dataPointsBC = createDataPoints('flow-b-to-c', 4);
        
        const container = document.querySelector('.architecture-container');
        dataPointsAB.forEach(point => container.appendChild(point));
        dataPointsBC.forEach(point => container.appendChild(point));
    }, 3200);
    
    // Remove the event listeners for section B since we're using CSS for positioning now
    
    // Add hover effect for sections
    const sections = document.querySelectorAll('.architecture-section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            highlightConnections(this);
            
            // Special handling for section B on hover
            if (this.classList.contains('section-b')) {
                // Prevent the :hover transform from affecting the position
                this.dataset.originalTransform = this.style.transform;
                // Only apply the Y translation for hover effect
                this.style.transform = 'translateY(-10px)';
            }
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
            resetConnections();
            
            // Restore transform for section B
            if (this.classList.contains('section-b')) {
                if (this.dataset.originalTransform) {
                    this.style.transform = this.dataset.originalTransform;
                } else {
                    this.style.transform = '';
                }
            }
        });
    });
    
    // Add pulse effect to components on hover
    const allComponents = document.querySelectorAll('.component');
    allComponents.forEach(component => {
        component.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.08)';
            this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
            pulsateIcon(this.querySelector('i'));
        });
        
        component.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            stopPulsateIcon(this.querySelector('i'));
        });
    });
});

// Create multiple data points with staggered animation start times
function createDataPoints(className, count) {
    const points = [];
    for (let i = 0; i < count; i++) {
        const point = document.createElement('div');
        point.className = `data-point ${className}`;
        point.style.animationDelay = `${i * 0.7}s`;
        points.push(point);
    }
    return points;
}

// Function to highlight connections between sections
function highlightConnections(section) {
    const flows = document.querySelectorAll('.data-flow');
    
    if (section.classList.contains('section-a')) {
        // Highlight flow from A to B
        flows[0].style.opacity = '1';
        flows[0].style.height = '5px';
        flows[0].style.backgroundColor = '#3273dc';
    } else if (section.classList.contains('section-b')) {
        // Highlight both flows
        flows.forEach(flow => {
            flow.style.opacity = '1';
            flow.style.height = '5px';
            flow.style.backgroundColor = '#3273dc';
        });
    } else if (section.classList.contains('section-c')) {
        // Highlight flow from B to C
        flows[1].style.opacity = '1';
        flows[1].style.height = '5px';
        flows[1].style.backgroundColor = '#3273dc';
    }
}

// Function to reset connections
function resetConnections() {
    const flows = document.querySelectorAll('.data-flow');
    flows.forEach(flow => {
        flow.style.opacity = '';
        flow.style.height = '';
        flow.style.backgroundColor = '';
    });
}

// Pulsate icon effect
function pulsateIcon(icon) {
    if (!icon) return;
    icon.style.transition = 'transform 0.3s ease-in-out';
    
    let scale = 1;
    const pulsate = () => {
        scale = scale === 1 ? 1.2 : 1;
        icon.style.transform = `scale(${scale})`;
    };
    
    icon.pulsateInterval = setInterval(pulsate, 500);
}

// Stop pulsate effect
function stopPulsateIcon(icon) {
    if (!icon) return;
    clearInterval(icon.pulsateInterval);
    icon.style.transform = '';
} 