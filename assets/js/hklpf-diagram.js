// Hong Kong Limited Partnership Fund Structure Diagram Animation Controller

class HKLPFDiagramAnimator {
    constructor() {
        this.hasAnimated = false;
        this.section = document.getElementById('hklpf-structure');
        this.diagram = document.getElementById('hklpf-diagram');
        this.nodes = [];
        this.connectors = [];
        this.activeDetailPanel = null;
        this.currentFocusIndex = -1;
        this.i18n = window.i18n || null;
        this.brandColors = {
            gp: '#2563eb', // Brand primary
            lp: '#f59e42', // Brand secondary
            hklpf: '#0ea5e9', // Emphasized
            target: '#fbbf24', // Highlight
            nodeText: '#fff',
            nodeDesc: '#e0e0e0',
            connector: '#94a3b8',
            bgGradient: 'linear-gradient(135deg, #23243a 0%, #181926 100%)',
        };
        this.layout = this.getLayout();
        this.init();
    }

    getLayout() {
        // Responsive layout: positions for desktop and mobile
        const width = window.innerWidth;
        if (width < 700) {
            // Mobile: stack vertically, allow horizontal scroll if needed
            return {
                width: 700,
                height: 900,
                nodes: {
                    gp: { x: 350, y: 100 },
                    im: { x: 350, y: 240 },
                    lp: { x: 350, y: 380 },
                    hklpf: { x: 350, y: 540 },
                    target1: { x: 200, y: 740 },
                    target2: { x: 500, y: 740 },
                },
                connectors: [
                    ['gp', 'hklpf'],
                    ['im', 'hklpf'],
                    ['lp', 'hklpf'],
                    ['hklpf', 'target1'],
                    ['hklpf', 'target2'],
                ]
            };
        } else {
            // Desktop: balanced, modern layout
            return {
                width: 1100,
                height: 700,
                nodes: {
                    gp: { x: 250, y: 160 },
                    im: { x: 550, y: 60 },
                    lp: { x: 850, y: 160 },
                    hklpf: { x: 550, y: 320 },
                    target1: { x: 350, y: 540 },
                    target2: { x: 750, y: 540 },
                },
                connectors: [
                    ['gp', 'hklpf'],
                    ['im', 'hklpf'],
                    ['lp', 'hklpf'],
                    ['hklpf', 'target1'],
                    ['hklpf', 'target2'],
                ]
            };
        }
    }

    init() {
        if (!this.section || !this.diagram) {
            console.warn('HKLPF diagram elements not found');
            return;
        }
        // Set up background
        this.section.style.background = this.brandColors.bgGradient;
        this.section.style.padding = '32px 0';
        this.section.style.borderRadius = '18px';
        // Clear SVG
        while (this.diagram.firstChild) this.diagram.removeChild(this.diagram.firstChild);
        // Set SVG size
        this.diagram.setAttribute('viewBox', `0 0 ${this.layout.width} ${this.layout.height}`);
        this.diagram.setAttribute('width', '100%');
        this.diagram.setAttribute('height', 'auto');
        // Draw connectors first
        this.connectors = [];
        for (const [from, to] of this.layout.connectors) {
            const path = this.drawConnector(from, to);
            this.diagram.appendChild(path);
            this.connectors.push(path);
        }
        // Draw nodes
        this.nodes = [];
        for (const key of Object.keys(this.layout.nodes)) {
            const node = this.drawNode(key);
            this.diagram.appendChild(node);
            this.nodes.push(node);
        }
        // Animate on load
        this.animateDiagram();
        // Hover/interaction
        this.nodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                node.setAttribute('filter', 'url(#nodeShadowHover)');
                node.setAttribute('transform', `scale(1.03) translate(${node._hoverDx||0},${node._hoverDy||0})`);
                node.style.cursor = 'pointer';
            });
            node.addEventListener('mouseleave', () => {
                node.setAttribute('filter', 'url(#nodeShadow)');
                node.setAttribute('transform', '');
                node.style.cursor = 'default';
            });
        });
        // Listen for language change
        window.addEventListener('fusiox-language-changed', () => {
            this.updateNodeLabels();
        });
        // Responsive redraw
        window.addEventListener('resize', () => {
            this.layout = this.getLayout();
            this.init();
        });
        // Add SVG defs for shadow and arrows
        this.addSVGDefs();
        // Set initial node labels
        this.updateNodeLabels();
        // Add interactive detail panels
        this.nodes.forEach(node => {
            node.addEventListener('click', (e) => {
                e.stopPropagation();
                const nodeClass = Array.from(node.classList).find(cls => cls.endsWith('-node'));
                this.openDetailPanel(nodeClass);
            });
            node.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const nodeClass = Array.from(node.classList).find(cls => cls.endsWith('-node'));
                    this.openDetailPanel(nodeClass);
                }
            });
        });
        document.addEventListener('click', (e) => {
            if (this.activeDetailPanel) this.closeDetailPanel();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeDetailPanel) this.closeDetailPanel();
        });
    }

    addSVGDefs() {
        let defs = this.diagram.querySelector('defs');
        if (!defs) {
            defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            this.diagram.insertBefore(defs, this.diagram.firstChild);
        }
        defs.innerHTML = `
            <linearGradient id="gpGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#2563eb" stop-opacity="0.95"/>
                <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.95"/>
            </linearGradient>
            <linearGradient id="lpGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#f59e42" stop-opacity="0.95"/>
                <stop offset="100%" stop-color="#fbbf24" stop-opacity="0.95"/>
            </linearGradient>
            <linearGradient id="hklpfGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.98"/>
                <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.98"/>
            </linearGradient>
            <linearGradient id="targetGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.95"/>
                <stop offset="100%" stop-color="#fde68a" stop-opacity="0.95"/>
            </linearGradient>
            <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#000" flood-opacity="0.13"/>
            </filter>
            <filter id="nodeShadowHover" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#2563eb" flood-opacity="0.18"/>
            </filter>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="strokeWidth">
                <polygon points="0 0, 10 3.5, 0 7" fill="#b6c2d6" />
            </marker>
        `;
    }

    drawConnector(fromKey, toKey) {
        const from = this.layout.nodes[fromKey];
        const to = this.layout.nodes[toKey];
        // Calculate start/end points (center bottom to center top)
        let startX = from.x, startY = from.y;
        let endX = to.x, endY = to.y;
        // Offset for node height
        const nodeHeight = 60;
        const nodeWidth = 160;
        if (fromKey === 'hklpf') startY += 60; // bottom of HKLPF
        else startY += 30; // bottom of other nodes
        endY -= 30; // top of target node
        // Curved path (cubic Bezier)
        const c1x = startX, c1y = startY + 40;
        const c2x = endX, c2y = endY - 40;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M${startX},${startY} C${c1x},${c1y} ${c2x},${c2y} ${endX},${endY}`);
        path.setAttribute('stroke', '#b6c2d6'); // Changed to a lighter color
        path.setAttribute('stroke-width', 2); // Changed to a smaller width
        path.setAttribute('fill', 'none');
        path.setAttribute('marker-end', 'url(#arrowhead)');
        path.setAttribute('opacity', '0');
        return path;
    }

    drawNode(key) {
        const { x, y } = this.layout.nodes[key];
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', `node ${key}-node`);
        group.setAttribute('filter', 'url(#nodeShadow)');
        group.setAttribute('tabindex', '0');
        group.setAttribute('aria-label', this.getAriaLabel(key));
        // Node color
        let fill = 'white';
        let stroke = '#b6c2d6';
        let gradient = '';
        if (key === 'gp') gradient = 'url(#gpGradient)';
        else if (key === 'lp') gradient = 'url(#lpGradient)';
        else if (key === 'hklpf') gradient = 'url(#hklpfGradient)';
        else if (key.startsWith('target')) gradient = 'url(#targetGradient)';
        // Node box
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x - 100);
        rect.setAttribute('y', y - 44);
        rect.setAttribute('width', 200);
        rect.setAttribute('height', 88);
        rect.setAttribute('rx', 14);
        rect.setAttribute('fill', gradient || fill);
        rect.setAttribute('stroke', stroke);
        rect.setAttribute('stroke-width', 2.5);
        group.appendChild(rect);
        // Main label
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', x);
        label.setAttribute('y', y - 10);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('font-size', '20');
        label.setAttribute('font-weight', 'bold');
        label.setAttribute('fill', '#fff');
        label.setAttribute('class', 'node-label');
        label.style.fontFamily = 'Inter, Roboto, Arial, sans-serif';
        group.appendChild(label);
        // Description
        const desc = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        desc.setAttribute('x', x);
        desc.setAttribute('y', y + 18);
        desc.setAttribute('text-anchor', 'middle');
        desc.setAttribute('font-size', '13');
        desc.setAttribute('font-weight', 'normal');
        desc.setAttribute('fill', '#e0e0e0');
        desc.setAttribute('class', 'node-desc');
        desc.style.fontFamily = 'Inter, Roboto, Arial, sans-serif';
        group.appendChild(desc);
        return group;
    }

    getAriaLabel(key) {
        if (!this.i18n) return '';
        switch (key) {
            case 'gp': return this.i18n.translate('diagram.gp.title');
            case 'im': return this.i18n.translate('diagram.im.title');
            case 'lp': return this.i18n.translate('diagram.lp.title');
            case 'hklpf': return this.i18n.translate('diagram.hklpf.title');
            case 'target1': return this.i18n.translate('diagram.target1.title');
            case 'target2': return this.i18n.translate('diagram.target2.title');
            default: return '';
        }
    }

    animateDiagram() {
        // Animate connectors
        this.connectors.forEach((conn, i) => {
            setTimeout(() => {
                conn.setAttribute('opacity', '1');
            }, 200 + i * 180);
        });
        // Animate nodes
        this.nodes.forEach((node, i) => {
            node.setAttribute('opacity', '0');
            setTimeout(() => {
                node.setAttribute('opacity', '1');
                node.setAttribute('transform', 'scale(1.0)');
            }, 900 + i * 180);
        });
    }

    updateNodeLabels() {
        if (!this.i18n) return;
        // Helper for text wrapping
        const wrapSvgText = (textElem, text, maxWidth, fontSize = 14, fontWeight = 'normal') => {
            while (textElem.firstChild) textElem.removeChild(textElem.firstChild);
            if (!text) return;
            const words = text.split(' ');
            let line = '';
            let lines = [];
            const testElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            testElem.setAttribute('font-size', fontSize);
            testElem.setAttribute('font-weight', fontWeight);
            testElem.style.visibility = 'hidden';
            textElem.parentNode.appendChild(testElem);
            for (let i = 0; i < words.length; i++) {
                const testLine = line + (line ? ' ' : '') + words[i];
                testElem.textContent = testLine;
                if (testElem.getComputedTextLength() > maxWidth && line) {
                    lines.push(line);
                    line = words[i];
                } else {
                    line = testLine;
                }
            }
            if (line) lines.push(line);
            textElem.parentNode.removeChild(testElem);
            lines.forEach((l, idx) => {
                const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                tspan.setAttribute('x', textElem.getAttribute('x'));
                tspan.setAttribute('dy', idx === 0 ? '0' : fontSize + 2);
                tspan.setAttribute('text-anchor', 'middle');
                tspan.setAttribute('font-size', fontSize);
                tspan.setAttribute('font-weight', fontWeight);
                tspan.setAttribute('fill', textElem.getAttribute('fill'));
                tspan.textContent = l;
                textElem.appendChild(tspan);
            });
        };
        // Update all node labels/descriptions
        for (const node of this.nodes) {
            const nodeClass = Array.from(node.classList).find(cls => cls.endsWith('-node'));
            const label = node.querySelector('.node-label');
            const desc = node.querySelector('.node-desc');
            if (!label || !desc) continue;
            switch (nodeClass) {
                case 'gp-node':
                    wrapSvgText(label, this.i18n.translate('diagram.gp.title'), 140, 16, 'bold');
                    wrapSvgText(desc, this.i18n.translate('diagram.gp.desc'), 140, 12, 'normal');
                    break;
                case 'im-node':
                    wrapSvgText(label, this.i18n.translate('diagram.im.title'), 140, 16, 'bold');
                    wrapSvgText(desc, this.i18n.translate('diagram.im.desc'), 140, 12, 'normal');
                    break;
                case 'lp-node':
                    wrapSvgText(label, this.i18n.translate('diagram.lp.title'), 140, 16, 'bold');
                    wrapSvgText(desc, this.i18n.translate('diagram.lp.desc'), 140, 12, 'normal');
                    break;
                case 'hklpf-node':
                    wrapSvgText(label, this.i18n.translate('diagram.hklpf.title'), 180, 16, 'bold');
                    wrapSvgText(desc, this.i18n.translate('diagram.hklpf.desc'), 180, 12, 'normal');
                    break;
                case 'target1-node':
                    wrapSvgText(label, this.i18n.translate('diagram.target1.title'), 120, 16, 'bold');
                    wrapSvgText(desc, this.i18n.translate('diagram.target1.desc'), 120, 12, 'normal');
                    break;
                case 'target2-node':
                    wrapSvgText(label, this.i18n.translate('diagram.target2.title'), 120, 16, 'bold');
                    wrapSvgText(desc, this.i18n.translate('diagram.target2.desc'), 120, 12, 'normal');
                    break;
            }
        }
    }

    openDetailPanel(nodeClass) {
        this.closeDetailPanel();
        const content = this.getDetailPanelContent(nodeClass);
        if (!content) return;
        const panel = document.createElement('div');
        panel.className = 'diagram-detail-panel';
        panel.setAttribute('tabindex', '0');
        panel.style.position = 'fixed';
        panel.style.left = '50%';
        panel.style.top = '50%';
        panel.style.transform = 'translate(-50%, -50%) scale(0.97)';
        panel.style.background = 'rgba(255,255,255,0.85)';
        panel.style.backdropFilter = 'blur(12px)';
        panel.style.borderRadius = '24px';
        panel.style.boxShadow = '0 12px 48px 0 rgba(37,99,235,0.18), 0 2px 8px rgba(0,0,0,0.10)';
        panel.style.padding = '40px 44px 32px 44px';
        panel.style.minWidth = '340px';
        panel.style.maxWidth = '92vw';
        panel.style.zIndex = '9999';
        panel.style.transition = 'opacity 0.32s cubic-bezier(.4,1.4,.6,1), transform 0.32s cubic-bezier(.4,1.4,.6,1)';
        panel.style.opacity = '0';
        panel.style.display = 'flex';
        panel.style.flexDirection = 'column';
        panel.style.alignItems = 'flex-start';
        panel.style.border = '1.5px solid transparent';
        panel.style.overflow = 'hidden';
        // Gradient accent bar
        const accent = document.createElement('div');
        accent.style.width = '100%';
        accent.style.height = '6px';
        accent.style.background = 'linear-gradient(90deg, #2563eb 0%, #0ea5e9 100%)';
        accent.style.position = 'absolute';
        accent.style.top = '0';
        accent.style.left = '0';
        accent.style.borderTopLeftRadius = '24px';
        accent.style.borderTopRightRadius = '24px';
        panel.appendChild(accent);
        // Title
        const title = document.createElement('div');
        title.textContent = content.title;
        title.style.fontSize = '1.5rem';
        title.style.fontWeight = 'bold';
        title.style.color = '#2563eb';
        title.style.margin = '24px 0 18px 0';
        title.style.letterSpacing = '-0.5px';
        panel.appendChild(title);
        // Bullet points
        const ul = document.createElement('ul');
        ul.style.margin = '0 0 0 0';
        ul.style.padding = '0 0 0 18px';
        ul.style.color = '#1a2233';
        ul.style.fontSize = '1.08rem';
        ul.style.lineHeight = '1.8';
        ul.style.fontWeight = '400';
        ul.style.letterSpacing = '-0.1px';
        ul.style.fontFamily = 'Inter, Roboto, Arial, sans-serif';
        content.bullets.forEach(b => {
            const li = document.createElement('li');
            li.textContent = b;
            ul.appendChild(li);
        });
        panel.appendChild(ul);
        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.setAttribute('aria-label', 'Close');
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '14px';
        closeBtn.style.right = '24px';
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.fontSize = '2rem';
        closeBtn.style.color = '#2563eb';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.lineHeight = '1';
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeDetailPanel();
        });
        panel.appendChild(closeBtn);
        document.body.appendChild(panel);
        setTimeout(() => {
            panel.style.opacity = '1';
            panel.style.transform = 'translate(-50%, -50%) scale(1.03)';
        }, 10);
        panel.focus();
        this.activeDetailPanel = panel;
        // Highlight node
        this.nodes.forEach(node => {
            node.classList.remove('node-active');
        });
        const nodeIdx = {
            'gp-node': 0,
            'im-node': 1,
            'lp-node': 2,
            'hklpf-node': 3,
            'target1-node': 4,
            'target2-node': 5
        }[nodeClass];
        if (typeof nodeIdx === 'number' && this.nodes[nodeIdx]) {
            this.nodes[nodeIdx].setAttribute('filter', 'url(#nodeShadowHover)');
            this.nodes[nodeIdx].style.transform = 'scale(1.06)';
        }
    }

    closeDetailPanel() {
        if (this.activeDetailPanel) {
            this.activeDetailPanel.style.opacity = '0';
            this.activeDetailPanel.style.transform = 'translate(-50%, -50%) scale(0.97)';
            setTimeout(() => {
                if (this.activeDetailPanel && this.activeDetailPanel.parentNode) {
                    this.activeDetailPanel.parentNode.removeChild(this.activeDetailPanel);
                }
                this.activeDetailPanel = null;
                // Remove highlight from all nodes
                this.nodes.forEach(node => {
                    node.setAttribute('filter', 'url(#nodeShadow)');
                    node.style.transform = '';
                });
            }, 220);
        }
    }

    getDetailPanelContent(nodeClass) {
        if (!this.i18n) return null;
        switch (nodeClass) {
            case 'gp-node':
                return {
                    title: this.i18n.translate('diagram.gp.title'),
                    bullets: [
                        this.i18n.translate('diagram.gp.detail.1'),
                        this.i18n.translate('diagram.gp.detail.2'),
                        this.i18n.translate('diagram.gp.detail.3'),
                        this.i18n.translate('diagram.gp.detail.4'),
                        this.i18n.translate('diagram.gp.detail.5'),
                    ]
                };
            case 'im-node':
                return {
                    title: this.i18n.translate('diagram.im.title'),
                    bullets: [
                        this.i18n.translate('diagram.im.detail.1'),
                        this.i18n.translate('diagram.im.detail.2'),
                        this.i18n.translate('diagram.im.detail.3'),
                        this.i18n.translate('diagram.im.detail.4'),
                        this.i18n.translate('diagram.im.detail.5'),
                    ]
                };
            case 'lp-node':
                return {
                    title: this.i18n.translate('diagram.lp.title'),
                    bullets: [
                        this.i18n.translate('diagram.lp.detail.1'),
                        this.i18n.translate('diagram.lp.detail.2'),
                        this.i18n.translate('diagram.lp.detail.3'),
                        this.i18n.translate('diagram.lp.detail.4'),
                        this.i18n.translate('diagram.lp.detail.5'),
                    ]
                };
            case 'hklpf-node':
                return {
                    title: this.i18n.translate('diagram.hklpf.title'),
                    bullets: [
                        this.i18n.translate('diagram.hklpf.detail.1'),
                        this.i18n.translate('diagram.hklpf.detail.2'),
                        this.i18n.translate('diagram.hklpf.detail.3'),
                        this.i18n.translate('diagram.hklpf.detail.4'),
                        this.i18n.translate('diagram.hklpf.detail.5'),
                    ]
                };
            case 'target1-node':
            case 'target2-node':
                return {
                    title: this.i18n.translate('diagram.target1.title'),
                    bullets: [
                        this.i18n.translate('diagram.target1.detail.1'),
                        this.i18n.translate('diagram.target1.detail.2'),
                        this.i18n.translate('diagram.target1.detail.3'),
                        this.i18n.translate('diagram.target1.detail.4'),
                        this.i18n.translate('diagram.target1.detail.5'),
                    ]
                };
            default:
                return null;
        }
    }
}

// Initialize the diagram animator when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new HKLPFDiagramAnimator();
    }, 100);
});

window.HKLPFDiagramAnimator = HKLPFDiagramAnimator;