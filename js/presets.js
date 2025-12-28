// 物理模拟预设示例
const physicsPresets = {
  // 抛体运动示例
  projectile: [
    {
      name: '标准45度抛射',
      description: '初速度20m/s，45度角抛射',
      params: {
        v0: 20,
        angle: 45,
        mass: 1,
        drag: 0.02,
        gravity: 9.8
      }
    },
    {
      name: '高抛运动',
      description: '初速度15m/s，75度高抛',
      params: {
        v0: 15,
        angle: 75,
        mass: 1,
        drag: 0.02,
        gravity: 9.8
      }
    },
    {
      name: '远距离抛射',
      description: '初速度30m/s，30度角抛射',
      params: {
        v0: 30,
        angle: 30,
        mass: 1,
        drag: 0.02,
        gravity: 9.8
      }
    }
  ],
  
  // 自由落体示例
  freefall: [
    {
      name: '标准自由落体',
      description: '从静止开始自由落体',
      params: {
        mass: 1,
        gravity: 9.8
      }
    },
    {
      name: '有初速度的自由落体',
      description: '初速度10m/s向下',
      params: {
        v0: 10,
        mass: 1,
        gravity: 9.8
      }
    }
  ],
  
  // 弹簧振子示例
  spring: [
    {
      name: '标准弹簧振子',
      description: 'k=50N/m, 阻尼0.5',
      params: {
        mass: 1,
        springK: 50,
        dampingB: 0.5,
        initialX: 2
      }
    },
    {
      name: '强阻尼振子',
      description: 'k=50N/m, 阻尼2.0',
      params: {
        mass: 1,
        springK: 50,
        dampingB: 2.0,
        initialX: 2
      }
    }
  ],
  
  // 力的合成与分解示例
  force: [
    {
      name: '正交力的合成',
      description: '两个垂直的力',
      params: {
        f1: 30,
        a1: 0,
        f2: 40,
        a2: 90
      }
    },
    {
      name: '斜向力的合成',
      description: '30度和120度的力',
      params: {
        f1: 50,
        a1: 30,
        f2: 50,
        a2: 120
      }
    }
  ],
  
  // 匀速圆周运动示例
  circular: [
    {
      name: '标准圆周运动',
      description: '半径2m，角速度2rad/s',
      params: {
        radius: 2,
        angularVelocity: 2,
        mass: 1
      }
    },
    {
      name: '快速圆周运动',
      description: '半径1m，角速度5rad/s',
      params: {
        radius: 1,
        angularVelocity: 5,
        mass: 1
      }
    },
    {
      name: '大半径圆周运动',
      description: '半径4m，角速度1rad/s',
      params: {
        radius: 4,
        angularVelocity: 1,
        mass: 2
      }
    }
  ],
  
  // 匀速直线运动示例
  uniform: [
    {
      name: '标准匀速运动',
      description: '速度5m/s',
      params: {
        'uniform-u': 5,
        mass: 1
      }
    },
    {
      name: '快速匀速运动',
      description: '速度15m/s',
      params: {
        'uniform-u': 15,
        mass: 1
      }
    }
  ],
  
  // 匀加速直线运动示例
  'uniform-accel': [
    {
      name: '标准加速运动',
      description: '初速度0，加速度2m/s²',
      params: {
        'ua-u0': 0,
        'ua-ax': 2,
        mass: 1
      }
    },
    {
      name: '减速运动',
      description: '初速度10m/s，加速度-2m/s²',
      params: {
        'ua-u0': 10,
        'ua-ax': -2,
        mass: 1
      }
    }
  ],
  
  // 机械波示例
  wave: [
    {
      name: '标准横波',
      description: '波长2m，频率1Hz，振幅0.5m',
      params: {
        'wave-lambda': 2,
        'wave-freq': 1,
        'wave-amp': 0.5
      }
    },
    {
      name: '高频波',
      description: '波长1m，频率3Hz，振幅0.3m',
      params: {
        'wave-lambda': 1,
        'wave-freq': 3,
        'wave-amp': 0.3
      }
    },
    {
      name: '长波',
      description: '波长4m，频率0.5Hz，振幅0.8m',
      params: {
        'wave-lambda': 4,
        'wave-freq': 0.5,
        'wave-amp': 0.8
      }
    }
  ],
  
  // 斜面运动示例
  inclined: [
    {
      name: '30度斜面',
      description: '无摩擦30度斜面',
      params: {
        angle: 30,
        friction: 0,
        mass: 1,
        gravity: 9.8
      }
    },
    {
      name: '有摩擦斜面',
      description: '30度斜面，摩擦系数0.2',
      params: {
        angle: 30,
        friction: 0.2,
        mass: 1,
        gravity: 9.8
      }
    }
  ],
  
  // 单摆运动示例
  pendulum: [
    {
      name: '小角度单摆',
      description: '摆长2m，小角度摆动',
      params: {
        length: 2,
        initialAngle: 15,
        mass: 1,
        gravity: 9.8
      }
    },
    {
      name: '大角度单摆',
      description: '摆长2m，大角度摆动',
      params: {
        length: 2,
        initialAngle: 60,
        mass: 1,
        gravity: 9.8
      }
    }
  ],
  
  // 一维碰撞示例
  'collision-1d': [
    {
      name: '完全弹性碰撞',
      description: '质量1kg和3kg，速度5m/s和-3m/s',
      params: {
        m1: 1,
        m2: 3,
        v1: 5,
        v2: -3,
        e: 1.0
      }
    },
    {
      name: '非弹性碰撞',
      description: '质量1kg和1kg，速度5m/s和0m/s',
      params: {
        m1: 1,
        m2: 1,
        v1: 5,
        v2: 0,
        e: 0.7
      }
    }
  ],
  
  // 匀强电场中的运动示例
  'electric-field': [
    {
      name: '正电荷向上偏转',
      description: '正电荷在向上电场中偏转（类抛体运动）',
      params: {
        'em-charge': 2,
        'em-mass': 10,
        'em-E': 800,
        'em-E-angle': 90,
        'em-v0': 3,
        'em-v0-angle': 0
      }
    },
    {
      name: '负电荷向下偏转',
      description: '负电荷在向上电场中向下偏转',
      params: {
        'em-charge': -2,
        'em-mass': 10,
        'em-E': 800,
        'em-E-angle': 90,
        'em-v0': 3,
        'em-v0-angle': 0
      }
    },
    {
      name: '斜向入射',
      description: '粒子斜向进入电场',
      params: {
        'em-charge': 1,
        'em-mass': 5,
        'em-E': 600,
        'em-E-angle': 90,
        'em-v0': 2,
        'em-v0-angle': 30
      }
    }
  ],
  
  // 匀强磁场中的运动示例
  'magnetic-field': [
    {
      name: '完整圆周运动',
      description: '粒子在磁场中做完整圆周运动',
      params: {
        'mag-charge': 2,
        'mag-mass': 20,
        'mag-B': 0.5,
        'mag-B-dir': 'in',
        'mag-v0': 3,
        'mag-v0-angle': 0
      }
    },
    {
      name: '半圆轨迹',
      description: '粒子做半圆运动',
      params: {
        'mag-charge': 1,
        'mag-mass': 10,
        'mag-B': 0.3,
        'mag-B-dir': 'in',
        'mag-v0': 2,
        'mag-v0-angle': 90
      }
    },
    {
      name: '大半径圆',
      description: '较大的圆周运动半径',
      params: {
        'mag-charge': 1,
        'mag-mass': 30,
        'mag-B': 0.2,
        'mag-B-dir': 'out',
        'mag-v0': 4,
        'mag-v0-angle': 45
      }
    }
  ],
  
  // 电磁场组合运动示例
  'em-field': [
    {
      name: '速度选择器',
      description: 'E和B平衡，粒子直线通过',
      params: {
        'emf-charge': 2,
        'emf-mass': 15,
        'emf-E': 600,
        'emf-E-angle': 90,
        'emf-B': 0.3,
        'emf-B-dir': 'in',
        'emf-v0': 2,
        'emf-v0-angle': 0
      }
    },
    {
      name: '摆线运动',
      description: '电磁场中的复杂摆线轨迹',
      params: {
        'emf-charge': 2,
        'emf-mass': 20,
        'emf-E': 400,
        'emf-E-angle': 90,
        'emf-B': 0.4,
        'emf-B-dir': 'in',
        'emf-v0': 1,
        'emf-v0-angle': 0
      }
    },
    {
      name: '螺旋偏转',
      description: '电磁场共同作用的螺旋轨迹',
      params: {
        'emf-charge': 1,
        'emf-mass': 10,
        'emf-E': 300,
        'emf-E-angle': 45,
        'emf-B': 0.25,
        'emf-B-dir': 'out',
        'emf-v0': 3,
        'emf-v0-angle': 0
      }
    }
  ],
  
  // 杠杆平衡示例
  lever: [
    {
      name: '平衡杠杆',
      description: '力臂相等，力相等',
      params: {
        f1: 20,
        d1: 1.5,
        f2: 20,
        d2: 1.5
      }
    },
    {
      name: '不平衡杠杆',
      description: '力臂不等，力相等',
      params: {
        f1: 20,
        d1: 2,
        f2: 20,
        d2: 1
      }
    }
  ]
};

// 导出预设
function getPresets(scenarioType) {
  return physicsPresets[scenarioType] || [];
}

// 应用预设
function applyPreset(params) {
  // 更新UI控件
  Object.entries(params).forEach(([key, value]) => {
    const input = document.getElementById(key);
    const numInput = document.getElementById(`${key}-num`);
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event('input'));
    }
    if (numInput) {
      numInput.value = value;
      numInput.dispatchEvent(new Event('input'));
    }
  });
  
  // 重置模拟
  const resetBtn = document.getElementById('btn-reset');
  if (resetBtn) resetBtn.click();
}
