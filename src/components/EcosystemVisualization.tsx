import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Network, Sparkles, Brain, ShieldAlert, Cpu, HeartPulse, Leaf } from 'lucide-react';

interface Node {
  id: number;
  label: string;
  category: string;
  icon: React.ReactNode;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  vx: number; // Velocity X
  vy: number; // Velocity Y
  radius: number;
  color: string;
}

export default function EcosystemVisualization() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: 1,
      label: "AI & Computer Vision",
      category: "Intelligence",
      icon: <Brain className="h-4 w-4" />,
      x: 30,
      y: 25,
      vx: 0.02,
      vy: -0.015,
      radius: 54,
      color: "#1A73E8", // Brand Blue
    },
    {
      id: 2,
      label: "Green Composites",
      category: "Materials",
      icon: <Leaf className="h-4 w-4" />,
      x: 75,
      y: 28,
      vx: -0.012,
      vy: 0.018,
      radius: 50,
      color: "#34A853", // Green
    },
    {
      id: 3,
      label: "Smart Mobility",
      category: "Automotive",
      icon: <Cpu className="h-4 w-4" />,
      x: 22,
      y: 68,
      vx: 0.015,
      vy: 0.012,
      radius: 48,
      color: "#F9AB00", // Amber
    },
    {
      id: 4,
      label: "Assistive Tech",
      category: "Inclusion",
      icon: <HeartPulse className="h-4 w-4" />,
      x: 72,
      y: 72,
      vx: -0.015,
      vy: -0.012,
      radius: 52,
      color: "#EA4335", // Red
    },
    {
      id: 5,
      label: "Heritage digital",
      category: "OCR & Humanities",
      icon: <Network className="h-4 w-4" />,
      x: 48,
      y: 82,
      vx: 0.01,
      vy: -0.01,
      radius: 46,
      color: "#9C27B0", // Purple
    },
    {
      id: 6,
      label: "Clean Energy Grid",
      category: "Battery & Solar",
      icon: <Sparkles className="h-4 w-4" />,
      x: 52,
      y: 18,
      vx: -0.01,
      vy: 0.015,
      radius: 48,
      color: "#00ACC1", // Cyan
    },
  ]);

  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const updatePositions = () => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          // Gently drift
          let nextX = node.x + node.vx;
          let nextY = node.y + node.vy;

          // Bounce off boundary boundaries (with padding)
          let nextVx = node.vx;
          let nextVy = node.vy;

          if (nextX < 15 || nextX > 85) {
            nextVx = -node.vx;
          }
          if (nextY < 15 || nextY > 85) {
            nextVy = -node.vy;
          }

          // Ensure it stays in bounds
          nextX = Math.max(12, Math.min(88, nextX));
          nextY = Math.max(12, Math.min(88, nextY));

          return {
            ...node,
            x: nextX,
            y: nextY,
            vx: nextVx,
            vy: nextVy,
          };
        })
      );
      requestRef.current = requestAnimationFrame(updatePositions);
    };

    requestRef.current = requestAnimationFrame(updatePositions);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const centerNode = { x: 50, y: 50, label: "Ré Hub", radius: 64 };

  return (
    <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[520px] rounded-3xl bg-[#FCFCFA] border border-neutral-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden flex items-center justify-center">
      
      {/* Background grid representation */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      {/* Decorative center ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#1A73E8]/5 rounded-full blur-[80px] pointer-events-none" />

      <svg className="w-full h-full select-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Dynamic connection lines */}
        {nodes.map((node) => {
          const isHighlighted = hoveredNode === node.id || hoveredNode === null;
          return (
            <g key={`line-${node.id}`}>
              {/* Core connection */}
              <line
                x1={`${centerNode.x}%`}
                y1={`${centerNode.y}%`}
                x2={`${node.x}%`}
                y2={`${node.y}%`}
                stroke={hoveredNode === node.id ? node.color : "rgba(120, 130, 140, 0.15)"}
                strokeWidth={hoveredNode === node.id ? 2 : 1}
                className="transition-all duration-300"
              />
              {/* Dashed pulsing highlight */}
              {hoveredNode === node.id && (
                <line
                  x1={`${centerNode.x}%`}
                  y1={`${centerNode.y}%`}
                  x2={`${node.x}%`}
                  y2={`${node.y}%`}
                  stroke={node.color}
                  strokeWidth={2}
                  strokeDasharray="6, 6"
                  className="animate-[dash_15s_linear_infinite]"
                  style={{
                    animationKeyframes: 'dash',
                    strokeDashoffset: 100
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Outer orbital rings */}
        <circle
          cx={`${centerNode.x}%`}
          cy={`${centerNode.y}%`}
          r="35%"
          fill="none"
          stroke="rgba(0, 0, 0, 0.02)"
          strokeWidth="1.5"
          strokeDasharray="5, 8"
        />
        <circle
          cx={`${centerNode.x}%`}
          cy={`${centerNode.y}%`}
          r="20%"
          fill="none"
          stroke="rgba(0, 0, 0, 0.015)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Center Ré Node */}
      <div
        className="absolute transition-all duration-300"
        style={{
          left: `${centerNode.x}%`,
          top: `${centerNode.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="relative group flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#1C2E4A]/10 blur-md scale-125 group-hover:scale-150 transition-transform duration-300" />
          <div className="h-16 w-16 rounded-full bg-[#1C2E4A] text-white flex flex-col items-center justify-center border-4 border-white shadow-xl z-10 transition-transform duration-300 hover:scale-105">
            <span className="text-lg font-black tracking-tighter leading-none">re</span>
            <span className="text-[7px] font-bold tracking-wider uppercase opacity-80 mt-0.5">center</span>
          </div>
        </div>
      </div>

      {/* Floating dynamic nodes */}
      {nodes.map((node) => {
        const isHovered = hoveredNode === node.id;
        const isAnyHovered = hoveredNode !== null;

        return (
          <div
            key={node.id}
            className="absolute transition-all duration-100 ease-out z-20 cursor-pointer"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <motion.div
              layout
              className={`flex items-center space-x-2 bg-white border px-4 py-2.5 rounded-full transition-all duration-300 shadow-sm ${
                isHovered
                  ? 'border-neutral-900 shadow-md ring-4 ring-neutral-900/5 -translate-y-0.5 scale-105'
                  : isAnyHovered
                  ? 'border-neutral-200/50 opacity-40 scale-95'
                  : 'border-neutral-200/80 hover:border-neutral-400'
              }`}
            >
              <div
                className="h-6 w-6 rounded-full flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: node.color }}
              >
                {node.icon}
              </div>
              <div className="text-left select-none">
                <p className="text-[12px] font-bold text-gray-900 leading-none">{node.label}</p>
                <p className="text-[9px] font-mono text-gray-500 mt-0.5 uppercase tracking-wider">{node.category}</p>
              </div>
            </motion.div>
          </div>
        );
      })}

      {/* Ambient particles moving in circles */}
      <div className="absolute bottom-6 left-6 text-[10px] font-mono text-neutral-400/80 uppercase tracking-widest flex items-center space-x-2 select-none pointer-events-none">
        <span className="h-1.5 w-1.5 rounded-full bg-[#1A73E8] animate-ping" />
        <span>Ecosystem Visualiser (Interactive)</span>
      </div>
    </div>
  );
}
