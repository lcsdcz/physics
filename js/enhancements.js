// 标签页切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 加载预设脚本
    const script = document.createElement('script');
    script.src = './js/presets.js';
    script.onload = function() {
        // 预设加载完成后初始化UI
        initPresetUI();
    };
    document.head.appendChild(script);
    
    // 初始化预设UI
    function initPresetUI() {
        const scenarioSelect = document.getElementById('scenario');
        const presetSelect = document.getElementById('preset-select');
        
        // 场景切换时更新预设列表
        scenarioSelect.addEventListener('change', updatePresetList);
        
        // 预设选择事件
        presetSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            if (selectedOption.dataset.params) {
                const params = JSON.parse(selectedOption.dataset.params);
                applyPreset(params);
                
                // 显示预设描述
                const description = selectedOption.dataset.description || '';
                showPresetDescription(description);
            }
            
            // 重置选择
            this.selectedIndex = 0;
        });
        
        // 保存预设按钮
        document.getElementById('save-preset').addEventListener('click', saveCurrentPreset);
        
        // 初始更新预设列表
        updatePresetList();
    }
    
    // 更新预设列表
    function updatePresetList() {
        const scenarioSelect = document.getElementById('scenario');
        const presetSelect = document.getElementById('preset-select');
        const scenario = scenarioSelect.value;
        
        // 清空现有选项（保留第一个"选择预设..."）
        while (presetSelect.options.length > 1) {
            presetSelect.remove(1);
        }
        
        // 获取当前场景的预设
        const presets = window.getPresets ? window.getPresets(scenario) : [];
        
        // 添加预设选项
        presets.forEach((preset, index) => {
            const option = document.createElement('option');
            option.value = `preset-${index}`;
            option.textContent = preset.name;
            option.dataset.params = JSON.stringify(preset.params);
            option.dataset.description = preset.description;
            presetSelect.add(option);
        });
    }
    
    // 显示预设描述
    function showPresetDescription(description) {
        // 查找或创建描述元素
        let descriptionEl = document.querySelector('.preset-description');
        if (!descriptionEl) {
            descriptionEl = document.createElement('div');
            descriptionEl.className = 'preset-description';
            const panel = document.querySelector('.panel');
            panel.insertBefore(descriptionEl, panel.firstChild.nextSibling);
        }
        
        if (description) {
            descriptionEl.textContent = description;
            descriptionEl.style.display = 'block';
            
            // 3秒后淡出
            setTimeout(() => {
                descriptionEl.style.opacity = '0';
                setTimeout(() => {
                    descriptionEl.style.display = 'none';
                    descriptionEl.style.opacity = '1';
                }, 500);
            }, 3000);
        } else {
            descriptionEl.style.display = 'none';
        }
    }
    
    // 保存当前设置为预设
    function saveCurrentPreset() {
        const scenarioSelect = document.getElementById('scenario');
        const scenario = scenarioSelect.value;
        const presetName = prompt('请输入预设名称:');
        
        if (!presetName) return;
        
        // 收集当前参数
        const params = {};
        const inputs = document.querySelectorAll('input[type="range"], input[type="number"]');
        inputs.forEach(input => {
            // 只收集有ID的输入
            if (input.id) {
                params[input.id] = parseFloat(input.value);
            }
        });
        
        // 添加到预设
        if (!window.physicsPresets) window.physicsPresets = {};
        if (!window.physicsPresets[scenario]) window.physicsPresets[scenario] = [];
        
        window.physicsPresets[scenario].push({
            name: presetName,
            description: `自定义预设 - ${new Date().toLocaleString()}`,
            params: params
        });
        
        // 更新UI
        updatePresetList();
        alert('预设已保存！');
    }
    
    // 应用预设参数
    function applyPreset(params) {
        // 更新UI控件
        Object.entries(params).forEach(([key, value]) => {
            const input = document.getElementById(key);
            const numInput = document.getElementById(`${key}-num`);
            if (input) {
                input.value = value;
                // 触发输入事件以更新模拟
                input.dispatchEvent(new Event('input', { bubbles: true }));
            }
            if (numInput) {
                numInput.value = value;
                numInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });
        
        // 重置模拟
        const resetBtn = document.getElementById('btn-reset');
        if (resetBtn) resetBtn.click();
    }
    // 标签页切换
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // 更新活动按钮
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 显示对应内容
            tabContents.forEach(content => {
                content.style.display = 'none';
            });
            
            const activeTab = document.getElementById(`${tabName}-tab`);
            if (activeTab) {
                activeTab.style.display = 'block';
            }
            
            // 如果是模拟标签，确保画布可见
            if (tabName === 'simulation') {
                document.querySelector('.left').style.display = 'flex';
                document.querySelector('.right').style.display = 'flex';
            } else {
                document.querySelector('.left').style.display = 'none';
                document.querySelector('.right').style.display = 'none';
            }
        });
    });
    
    // 默认显示模拟标签
    document.querySelector('.tab-btn[data-tab="simulation"]').click();
    
    // 深色模式切换
    const darkModeToggle = document.getElementById('dark-mode');
    darkModeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode', this.checked);
        // 保存用户偏好
        localStorage.setItem('darkMode', this.checked);
    });
    
    // 检查本地存储中的深色模式设置
    if (localStorage.getItem('darkMode') === 'true') {
        darkModeToggle.checked = true;
        document.body.classList.add('dark-mode');
    }
    
    // 全屏功能
    const fullscreenBtn = document.getElementById('btn-fullscreen');
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`全屏错误: ${err.message}`);
            });
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
            }
        }
    }
    
    // 帮助按钮
    document.getElementById('btn-help').addEventListener('click', function() {
        alert('欢迎使用高中物理可视化教学助手！\n\n' +
              '使用说明：\n' +
              '1. 从左侧选择不同的物理场景\n' +
              '2. 调整参数观察物理现象的变化\n' +
              '3. 使用控制按钮控制模拟\n' +
              '4. 在"公式速查"中查看相关物理公式\n' +
              '5. 在"练习题"中巩固所学知识');
    });
    
    // 显示当前时间和FPS
    let lastTime = performance.now();
    let frames = 0;
    let lastFpsUpdate = 0;
    
    function updateStats(currentTime) {
        frames++;
        
        // 每秒更新一次FPS
        if (currentTime - lastFpsUpdate >= 1000) {
            const fps = Math.round((frames * 1000) / (currentTime - lastFpsUpdate));
            document.getElementById('simulation-fps').textContent = `FPS: ${fps}`;
            frames = 0;
            lastFpsUpdate = currentTime;
        }
        
        // 更新模拟时间
        const simTime = (currentTime - lastTime) / 1000; // 转换为秒
        document.getElementById('simulation-time').textContent = `时间: ${simTime.toFixed(2)}s`;
        
        requestAnimationFrame(updateStats);
    }
    
    requestAnimationFrame(updateStats);
    
    // 题目导航
    const questionNavBtns = document.querySelectorAll('.nav-btn');
    const questions = document.querySelectorAll('.question');
    
    questionNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const questionNum = this.dataset.question;
            
            // 更新导航按钮状态
            questionNavBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应题目
            questions.forEach(q => {
                q.classList.remove('active');
                if (q.dataset.q === questionNum) {
                    q.classList.add('active');
                }
            });
        });
    });
    
    // 练习题答案检查
    const checkAnswerBtns = document.querySelectorAll('.btn-check-answer');
    checkAnswerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.closest('.question');
            const questionNum = question.dataset.q;
            const correctAnswer = this.dataset.answer;
            const selectedOption = question.querySelector(`input[name="q${questionNum}"]:checked`);
            const answerExplanation = question.querySelector('.answer-explanation');
            
            if (!selectedOption) {
                alert('请选择一个答案！');
                return;
            }
            
            // 显示答案解释
            answerExplanation.style.display = 'block';
            
            // 高亮显示正确/错误
            const options = question.querySelectorAll('.options label');
            options.forEach(opt => {
                const input = opt.querySelector('input');
                if (input.value === correctAnswer) {
                    opt.style.background = 'rgba(69, 212, 131, 0.2)';
                    opt.style.borderRadius = '6px';
                } else if (input.checked) {
                    opt.style.background = 'rgba(255, 107, 107, 0.2)';
                    opt.style.borderRadius = '6px';
                }
            });
            
            // 滚动到解释部分
            answerExplanation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });
    
    // 场景切换时更新公式显示
    const scenarioSelect = document.getElementById('scenario');
    if (scenarioSelect) {
        scenarioSelect.addEventListener('change', updateFormulaDisplay);
        updateFormulaDisplay(); // 初始化显示
    }
    
    function updateFormulaDisplay() {
        const scenario = scenarioSelect.value;
        const formulaDisplay = document.getElementById('current-formula');
        const formulaDesc = document.getElementById('formula-description');
        
        const formulas = {
            'projectile': {
                formula: 'y = x·tanθ - (g·x²)/(2v₀²cos²θ)',
                desc: '抛体运动轨迹方程，描述物体在重力作用下的运动轨迹'
            },
            'freefall': {
                formula: 'h = ½gt²',
                desc: '自由落体运动位移公式，h为下落高度，g为重力加速度，t为时间'
            },
            'spring': {
                formula: 'F = -kx',
                desc: '胡克定律，描述弹簧弹力与形变量的关系，k为劲度系数，x为形变量'
            },
            'force': {
                formula: 'F = √(F₁² + F₂² + 2F₁F₂cosθ)',
                desc: '力的合成公式，计算两个力的合力大小'
            },
            'circular': {
                formula: 'a = v²/r = ω²r',
                desc: '向心加速度公式，a为向心加速度，v为线速度，ω为角速度，r为半径'
            },
            'inclined': {
                formula: 'a = g·sinθ - μg·cosθ',
                desc: '斜面运动加速度公式，θ为斜面倾角，μ为摩擦系数'
            },
            'pendulum': {
                formula: 'T = 2π√(L/g)',
                desc: '单摆周期公式，T为周期，L为摆长，g为重力加速度'
            },
            'wave': {
                formula: 'v = λf',
                desc: '波动公式，v为波速，λ为波长，f为频率'
            },
            'electric-field': {
                formula: 'F = qE, a = qE/m',
                desc: '电场力公式，带电粒子在匀强电场中受力F=qE，产生加速度a=qE/m'
            },
            'magnetic-field': {
                formula: 'F = qvB, r = mv/qB',
                desc: '洛伦兹力公式，带电粒子在磁场中做圆周运动，回旋半径r=mv/qB'
            },
            'em-field': {
                formula: 'F = qE + qv×B',
                desc: '电磁场中的运动，粒子同时受电场力和洛伦兹力作用'
            }
        };
        
        const formula = formulas[scenario] || {
            formula: 'F = m·a',
            desc: '牛顿第二定律：力等于质量乘以加速度'
        };
        
        formulaDisplay.textContent = formula.formula;
        formulaDesc.textContent = formula.desc;
    }
});

// 导出功能
function exportSimulationData() {
    // 获取当前模拟数据
    const simulationData = {
        scenario: document.getElementById('scenario').value,
        time: document.getElementById('simulation-time').textContent,
        // 添加更多模拟数据...
    };
    
    // 创建下载链接
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(simulationData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `physics_simulation_${new Date().toISOString()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    // 空格键 播放/暂停
    if (e.code === 'Space') {
        e.preventDefault();
        const playBtn = document.getElementById('btn-play');
        const pauseBtn = document.getElementById('btn-pause');
        
        if (playBtn.style.display !== 'none') {
            playBtn.click();
        } else {
            pauseBtn.click();
        }
    }
    
    // R键 重置
    if (e.code === 'KeyR') {
        document.getElementById('btn-reset').click();
    }
    
    // F键 全屏
    if (e.code === 'KeyF') {
        toggleFullscreen();
    }
});
