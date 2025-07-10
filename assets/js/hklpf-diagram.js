// Hong Kong Limited Partnership Fund Structure Diagram Animation Controller

class HKLPFDiagramAnimator {
    constructor() {
        this.hasAnimated = false;
        this.section = document.getElementById('hklpf-structure');
        this.diagram = document.getElementById('hklpf-diagram');
        this.nodes = document.querySelectorAll('.node');
        this.connections = document.getElementById('connections');
        this.connectionLines = document.querySelectorAll('.connection-line');
        
        this.init();
    }
    
    init() {
        if (!this.section || !this.diagram) {
            console.warn('HKLPF diagram elements not found');
            return;
        }
        
        // Set up intersection observer for scroll-triggered animation
        this.setupIntersectionObserver();
        
        // Add resize listener for responsive adjustments
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Set initial state
        this.resetAnimation();
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.3, // Trigger when 30% of the element is visible
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element is fully visible
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateDiagram();
                    this.hasAnimated = true;
                }
            });
        }, options);
        
        this.observer.observe(this.section);
    }
    
    resetAnimation() {
        // Reset nodes
        this.nodes.forEach(node => {
            node.style.opacity = '0';
            node.style.transform = 'scale(0.8)';
            node.classList.remove('animate-in');
        });
        
        // Reset connections
        this.connections.style.opacity = '0';
        this.connectionLines.forEach(line => {
            line.classList.remove('animate-draw');
        });
    }
    
    animateDiagram() {
        // Animate nodes with staggered timing
        this.nodes.forEach((node, index) => {
            setTimeout(() => {
                node.classList.add('animate-in');
            }, index * 100);
        });
        
        // Show and animate connections after nodes start appearing
        setTimeout(() => {
            this.connections.style.opacity = '1';
            this.connectionLines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('animate-draw');
                }, index * 100);
            });
        }, 700);
    }
    
    handleResize() {
        // Adjust diagram responsiveness if needed
        const width = window.innerWidth;
        
        if (width < 480) {
            // Extra small screens - ensure text is readable
            this.nodes.forEach(node => {
                const texts = node.querySelectorAll('text');
                texts.forEach((text, index) => {
                    if (index === 0) text.style.fontSize = '10px';
                    if (index > 0) text.style.fontSize = '8px';
                });
            });
        } else if (width < 768) {
            // Small screens
            this.nodes.forEach(node => {
                const texts = node.querySelectorAll('text');
                texts.forEach((text, index) => {
                    if (index === 0) text.style.fontSize = '12px';
                    if (index > 0) text.style.fontSize = '10px';
                });
            });
        } else {
            // Reset to default sizes for larger screens
            this.nodes.forEach(node => {
                const texts = node.querySelectorAll('text');
                texts.forEach((text, index) => {
                    text.style.fontSize = '';
                });
            });
        }
    }
    
    // Method to replay animation (if needed)
    replayAnimation() {
        this.hasAnimated = false;
        this.resetAnimation();
        setTimeout(() => {
            this.animateDiagram();
            this.hasAnimated = true;
        }, 100);
    }
}

// Initialize the diagram animator when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all elements are rendered
    setTimeout(() => {
        new HKLPFDiagramAnimator();
    }, 100);
});

// Optional: Add to window for debugging purposes
window.HKLPFDiagramAnimator = HKLPFDiagramAnimator;