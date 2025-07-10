// Hong Kong Limited Partnership Fund Structure Diagram Animation Controller

class HKLPFDiagramAnimator {
    constructor() {
        this.hasAnimated = false;
        this.section = document.getElementById('hklpf-structure');
        this.diagram = document.getElementById('hklpf-diagram');
        this.nodes = document.querySelectorAll('.node');
        this.connections = document.getElementById('connections');
        this.connectionLines = document.querySelectorAll('.connection-line');
        this.activeDetailPanel = null;
        this.currentFocusIndex = -1;
        
        // Define tooltip content for each node
        this.tooltipContent = {
            'gp-node': {
                title: 'GP (客户作为普通合伙人)',
                description: '普通合伙人负责基金管理和运营。'
            },
            'im-node': {
                title: 'Hong Kong Type 4/9 IM',
                description: '持牌投资经理提供投资建议和管理服务。'
            },
            'lp-node': {
                title: 'LP (投资人)',
                description: '提供资本的有限合伙人，不参与管理。'
            },
            'hklpf-node': {
                title: 'HKLPF',
                description: '注册在香港的有限合伙基金主体。'
            },
            'target1-node': {
                title: '投资标的',
                description: '基金投资的具体资产或项目。'
            },
            'target2-node': {
                title: '投资标的',
                description: '基金投资的具体资产或项目。'
            }
        };

        // Define detailed information for click panels
        this.detailPanelContent = {
            'gp-node': {
                title: '普通合伙人 (General Partner)',
                content: [
                    '• 负责基金的日常管理和运营决策',
                    '• 承担无限责任，对基金债务负责',
                    '• 制定投资策略和投资决策',
                    '• 管理基金的投资组合和风险控制',
                    '• 向有限合伙人报告基金业绩和运营情况'
                ]
            },
            'im-node': {
                title: '投资经理 (Investment Manager)',
                content: [
                    '• 持有香港证监会4号和/或9号牌照',
                    '• 提供专业的投资建议和资产管理服务',
                    '• 执行投资策略和交易指令',
                    '• 进行投资研究和市场分析',
                    '• 确保符合监管要求和合规标准'
                ]
            },
            'lp-node': {
                title: '有限合伙人 (Limited Partners)',
                content: [
                    '• 提供资本但不参与基金管理',
                    '• 享有有限责任保护',
                    '• 根据投资份额获得收益分配',
                    '• 有权获得基金运营和业绩报告',
                    '• 可参与重大事项的投票决策'
                ]
            },
            'hklpf-node': {
                title: '香港有限合伙基金 (HKLPF)',
                content: [
                    '• 在香港注册的有限合伙基金实体',
                    '• 享受香港优惠的税务环境',
                    '• 受香港法律和监管框架保护',
                    '• 便于进行跨境投资和资金流动',
                    '• 提供专业的基金管理架构'
                ]
            },
            'target1-node': {
                title: '投资标的 (Investment Targets)',
                content: [
                    '• 基金投资的具体资产或项目',
                    '• 可包括股权、债权、房地产等',
                    '• 根据基金策略进行多元化配置',
                    '• 定期评估投资价值和风险',
                    '• 目标实现资本增值和收益分配'
                ]
            },
            'target2-node': {
                title: '投资标的 (Investment Targets)',
                content: [
                    '• 基金投资的具体资产或项目',
                    '• 可包括股权、债权、房地产等',
                    '• 根据基金策略进行多元化配置',
                    '• 定期评估投资价值和风险',
                    '• 目标实现资本增值和收益分配'
                ]
            }
        };
        
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
        
        // Set up interactive features
        this.setupTooltips();
        this.setupClickHandlers();
        this.setupKeyboardNavigation();
        this.setupHoverEffects();
        this.setupAccessibility();
        
        // Set initial state
        this.resetAnimation();
        
        // Create detail panel container
        this.createDetailPanelContainer();
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

    setupTooltips() {
        // Create tooltip element
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'hklpf-tooltip';
        this.tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            pointer-events: none;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            max-width: 250px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        document.body.appendChild(this.tooltip);

        // Add hover listeners to nodes
        this.nodes.forEach(node => {
            const nodeClass = Array.from(node.classList).find(cls => cls.endsWith('-node'));
            if (nodeClass && this.tooltipContent[nodeClass]) {
                node.addEventListener('mouseenter', (e) => this.showTooltip(e, nodeClass));
                node.addEventListener('mouseleave', () => this.hideTooltip());
                node.addEventListener('mousemove', (e) => this.updateTooltipPosition(e));
            }
        });
    }

    showTooltip(event, nodeClass) {
        const content = this.tooltipContent[nodeClass];
        if (!content) return;

        this.tooltip.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 4px;">${content.title}</div>
            <div style="font-size: 12px; opacity: 0.9;">${content.description}</div>
        `;
        
        this.updateTooltipPosition(event);
        this.tooltip.style.opacity = '1';
    }

    hideTooltip() {
        this.tooltip.style.opacity = '0';
    }

    updateTooltipPosition(event) {
        const rect = this.tooltip.getBoundingClientRect();
        let x = event.clientX + 10;
        let y = event.clientY - rect.height - 10;

        // Adjust position to keep tooltip in viewport
        if (x + rect.width > window.innerWidth) {
            x = event.clientX - rect.width - 10;
        }
        if (y < 0) {
            y = event.clientY + 10;
        }

        this.tooltip.style.left = x + 'px';
        this.tooltip.style.top = y + 'px';
    }

    setupClickHandlers() {
        this.nodes.forEach(node => {
            const nodeClass = Array.from(node.classList).find(cls => cls.endsWith('-node'));
            if (nodeClass && this.detailPanelContent[nodeClass]) {
                node.addEventListener('click', () => this.toggleDetailPanel(nodeClass));
                node.style.cursor = 'pointer';
            }
        });

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.node') && !e.target.closest('.detail-panel')) {
                this.closeDetailPanel();
            }
        });
    }

    createDetailPanelContainer() {
        this.detailPanelContainer = document.createElement('div');
        this.detailPanelContainer.className = 'detail-panel-container';
        this.detailPanelContainer.style.cssText = `
            margin-top: 20px;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease-in-out;
        `;
        
        const diagramContainer = this.diagram.closest('.max-w-6xl');
        if (diagramContainer) {
            diagramContainer.appendChild(this.detailPanelContainer);
        }
    }

    toggleDetailPanel(nodeClass) {
        if (this.activeDetailPanel === nodeClass) {
            this.closeDetailPanel();
        } else {
            this.openDetailPanel(nodeClass);
        }
    }

    openDetailPanel(nodeClass) {
        const content = this.detailPanelContent[nodeClass];
        if (!content) return;

        this.activeDetailPanel = nodeClass;
        
        this.detailPanelContainer.innerHTML = `
            <div class="detail-panel bg-base-100 rounded-lg shadow-lg p-6 mt-4">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-bold text-primary">${content.title}</h3>
                    <button class="btn btn-ghost btn-sm close-panel" aria-label="关闭详情面板">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="space-y-2">
                    ${content.content.map(item => `<p class="text-base-content/80">${item}</p>`).join('')}
                </div>
            </div>
        `;

        // Add close button handler
        const closeBtn = this.detailPanelContainer.querySelector('.close-panel');
        closeBtn.addEventListener('click', () => this.closeDetailPanel());

        // Animate panel open
        setTimeout(() => {
            this.detailPanelContainer.style.maxHeight = '500px';
        }, 10);

        // Highlight the selected node
        this.highlightNode(nodeClass);
    }

    closeDetailPanel() {
        this.activeDetailPanel = null;
        this.detailPanelContainer.style.maxHeight = '0';
        
        // Remove highlights
        this.removeAllHighlights();
        
        setTimeout(() => {
            this.detailPanelContainer.innerHTML = '';
        }, 400);
    }

    setupKeyboardNavigation() {
        // Make nodes focusable
        this.nodes.forEach((node, index) => {
            node.setAttribute('tabindex', '0');
            node.setAttribute('role', 'button');
            
            node.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        const nodeClass = Array.from(node.classList).find(cls => cls.endsWith('-node'));
                        if (nodeClass) this.toggleDetailPanel(nodeClass);
                        break;
                    case 'Escape':
                        this.closeDetailPanel();
                        break;
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        this.focusNextNode();
                        break;
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        this.focusPreviousNode();
                        break;
                }
            });

            node.addEventListener('focus', () => {
                this.currentFocusIndex = index;
                const nodeClass = Array.from(node.classList).find(cls => cls.endsWith('-node'));
                if (nodeClass && this.tooltipContent[nodeClass]) {
                    this.showKeyboardTooltip(node, nodeClass);
                }
            });

            node.addEventListener('blur', () => {
                this.hideTooltip();
            });
        });
    }

    focusNextNode() {
        this.currentFocusIndex = (this.currentFocusIndex + 1) % this.nodes.length;
        this.nodes[this.currentFocusIndex].focus();
    }

    focusPreviousNode() {
        this.currentFocusIndex = this.currentFocusIndex <= 0 ? this.nodes.length - 1 : this.currentFocusIndex - 1;
        this.nodes[this.currentFocusIndex].focus();
    }

    showKeyboardTooltip(node, nodeClass) {
        const content = this.tooltipContent[nodeClass];
        if (!content) return;

        this.tooltip.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 4px;">${content.title}</div>
            <div style="font-size: 12px; opacity: 0.9;">${content.description}</div>
        `;
        
        const rect = node.getBoundingClientRect();
        this.tooltip.style.left = (rect.left + rect.width / 2 - 125) + 'px';
        this.tooltip.style.top = (rect.bottom + 10) + 'px';
        this.tooltip.style.opacity = '1';
    }

    setupHoverEffects() {
        this.nodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                const nodeClass = Array.from(node.classList).find(cls => cls.endsWith('-node'));
                this.highlightPathways(nodeClass);
            });

            node.addEventListener('mouseleave', () => {
                this.removePathwayHighlights();
            });
        });

        // Add hover effects to connection lines
        this.connectionLines.forEach(line => {
            line.addEventListener('mouseenter', () => {
                line.style.strokeWidth = '3';
                line.style.opacity = '1';
            });

            line.addEventListener('mouseleave', () => {
                line.style.strokeWidth = '2';
                line.style.opacity = '0.8';
            });
        });
    }

    highlightPathways(nodeClass) {
        // Define connections between nodes
        const connections = {
            'gp-node': ['im-node', 'hklpf-node'],
            'im-node': ['gp-node', 'hklpf-node'],
            'lp-node': ['hklpf-node'],
            'hklpf-node': ['gp-node', 'im-node', 'lp-node', 'target1-node', 'target2-node'],
            'target1-node': ['hklpf-node'],
            'target2-node': ['hklpf-node']
        };

        const connectedNodes = connections[nodeClass] || [];
        
        // Dim all nodes and connections first
        this.nodes.forEach(node => {
            node.style.opacity = '0.3';
        });
        this.connectionLines.forEach(line => {
            line.style.opacity = '0.2';
        });

        // Highlight the hovered node
        const hoveredNode = this.diagram.querySelector(`.${nodeClass}`);
        if (hoveredNode) {
            hoveredNode.style.opacity = '1';
        }

        // Highlight connected nodes
        connectedNodes.forEach(connectedClass => {
            const connectedNode = this.diagram.querySelector(`.${connectedClass}`);
            if (connectedNode) {
                connectedNode.style.opacity = '1';
            }
        });

        // Highlight relevant connection lines based on node relationships
        this.highlightRelevantConnections(nodeClass);
    }

    highlightRelevantConnections(nodeClass) {
        // Map node classes to their connection line indices
        const nodeConnections = {
            'gp-node': [0, 2], // GP to IM, GP to HKLPF
            'im-node': [0, 1], // GP to IM, IM to HKLPF
            'lp-node': [3],    // LP to HKLPF
            'hklpf-node': [1, 2, 3, 4, 5], // All connections to/from HKLPF
            'target1-node': [4], // HKLPF to Target 1
            'target2-node': [5]  // HKLPF to Target 2
        };

        const relevantLines = nodeConnections[nodeClass] || [];
        relevantLines.forEach(index => {
            if (this.connectionLines[index]) {
                this.connectionLines[index].style.opacity = '1';
                this.connectionLines[index].style.strokeWidth = '3';
            }
        });
    }

    removePathwayHighlights() {
        this.nodes.forEach(node => {
            node.style.opacity = '';
        });
        this.connectionLines.forEach(line => {
            line.style.opacity = '';
            line.style.strokeWidth = '';
        });
    }

    highlightNode(nodeClass) {
        this.removeAllHighlights();
        const node = this.diagram.querySelector(`.${nodeClass}`);
        if (node) {
            node.style.transform = 'scale(1.05)';
            node.style.filter = 'drop-shadow(0 4px 12px rgba(96, 165, 250, 0.5))';
        }
    }

    removeAllHighlights() {
        this.nodes.forEach(node => {
            node.style.transform = '';
            node.style.filter = '';
        });
    }

    setupAccessibility() {
        // Add ARIA labels to nodes
        const nodeLabels = {
            'gp-node': '普通合伙人，负责基金管理和运营',
            'im-node': '投资经理，提供投资建议和管理服务',
            'lp-node': '有限合伙人，提供资本的投资者',
            'hklpf-node': '香港有限合伙基金主体',
            'target1-node': '投资标的，基金投资的具体资产',
            'target2-node': '投资标的，基金投资的具体资产'
        };

        this.nodes.forEach(node => {
            const nodeClass = Array.from(node.classList).find(cls => cls.endsWith('-node'));
            if (nodeClass && nodeLabels[nodeClass]) {
                node.setAttribute('aria-label', nodeLabels[nodeClass]);
                node.setAttribute('aria-describedby', 'diagram-instructions');
            }
        });

        // Add instructions for screen readers
        const instructions = document.createElement('div');
        instructions.id = 'diagram-instructions';
        instructions.className = 'sr-only';
        instructions.textContent = '使用Tab键导航节点，回车键查看详细信息，Esc键关闭详情面板。';
        this.section.appendChild(instructions);

        // Add aria-live region for dynamic content
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'diagram-live-region';
        this.section.appendChild(liveRegion);

        this.liveRegion = liveRegion;
    }

    announceToScreenReader(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
        }
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