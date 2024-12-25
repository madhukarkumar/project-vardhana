# Changelog

## 2024-01-09 16:45
- Enhanced background animation visibility on home page
- Modified files:
  - src/components/ui/BackgroundPattern.tsx
  - Increased pattern scale from 0.675 to 0.775 for larger coverage
  - Enhanced opacity of horizontal lines (0.1 to 0.15) and vertical lines (0.05 to 0.1)
  - Reduced animation duration from 2s to 1.5s for more dynamic movement

## 2024-01-09 15:30
- Added scale hover animation effect to sidebar navigation links
- Modified files:
  - src/components/layout/Sidebar.tsx
  - Added scale transform (105%) on hover while preserving existing hover effects
  - Updated transition to affect all properties smoothly
  - Enhanced hover visibility in light theme by using a darker background color (gray-200)
