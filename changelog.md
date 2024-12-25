# Changelog

## [2024-01-09] - Knowledge Graph Node Position Fix
- Added node position fixing after drag operations
- Implemented node dragging with position persistence
- Added ability to release fixed positions by clicking nodes
- Adjusted simulation parameters (d3VelocityDecay: 0.3, d3AlphaDecay: 0.02) for smoother transitions
- Fixed duplicate attribute issue in ForceGraph2D component

## [2024-01-09] - Knowledge Graph Node Overlap Fix
- Modified force simulation parameters in Knowledge.tsx to prevent node overlapping
- Added collision detection with d3.forceCollide(30)
- Adjusted link distance to 100 units for better node distribution
- Increased charge strength to -1000 for stronger node repulsion
- Added d3 force simulation on engine stop for better graph stabilization
- Installed d3 and @types/d3 packages for improved graph visualization
