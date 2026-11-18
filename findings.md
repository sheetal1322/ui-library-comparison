# Comparative Study of React UI Component Libraries

## 1. Objective

The objective of this assignment was to evaluate three popular React UI component libraries: Material UI (MUI), Ant Design and Mantine.

The same dashboard interface was implemented using all three libraries to compare their setup process, code size, customisation capabilities and accessibility.

## 2. Implementation Overview

Each implementation was developed using React, TypeScript and Vite.

The dashboard included:
- Sidebar and navigation layout
- Header section
- Summary cards
- Add Student form
- Student Directory data table
- View Student modal
- Light and dark mode toggle

## 3. Setup Comparison

| Factor | MUI | Ant Design | Mantine |
|---|---|---|---|
| Main package | @mui/material | antd | @mantine/core |
| Styling dependencies | Emotion | Built-in styling system | Built-in styling system |
| Icon package | @mui/icons-material | @ant-design/icons | @tabler/icons-react |
| Setup experience | Standard Vite and dependency setup | Installation and configuration, with network issues during the process | Straightforward setup; packages needed to be reinstalled in the correct project directory |
| Time observation | Not stopwatch-measured; typical setup estimated at 4–9 minutes | 37 minutes total elapsed, including network issues and coding errors; setup time not isolated | Approximately 7 minutes for initial project creation and installation. |

*Installation times depend on network speed and system performance. The recorded elapsed times should not be interpreted as controlled benchmarks.*

## 4. Code Size Comparison

The number of nonblank, non-comment lines in `src/App.tsx` was measured using the same PowerShell command for all three projects.

| Library | Lines of code |
|---|---:|
| MUI | 434 |
| Ant Design | 352 |
| Mantine | 338 |

Mantine required the fewest lines in this implementation, followed by Ant Design and MUI. This is a comparison of the particular implementations and does not establish overall code quality or maintainability.

## 5. Customisation Comparison

| Aspect | MUI | Ant Design | Mantine |
|---|---|---|---|
| Theme configuration | createTheme() and ThemeProvider | ConfigProvider | MantineProvider |
| Primary colour | Theme palette | Theme tokens | primaryColor |
| Dark mode | Switches between light and dark theme palettes | Uses darkAlgorithm | Uses forceColorScheme |
| Component styling | sx prop | Component props, theme tokens and CSS | Style props and component props |
| Customisation approach | Central theme configuration and component-level styling | Global theme configuration and component styling | Provider-based theme configuration and convenient component styling |

### Practical observations

**MUI:** Provides flexible theme configuration and component-level styling through the sx prop. Its theme system allows consistent styling across components.

**Ant Design:** ConfigProvider makes global theme configuration convenient. Its ready-made components are useful for building dashboard interfaces.

**Mantine:** Provides theme configuration through MantineProvider and convenient styling options. The dashboard was implemented with the fewest lines of code among the three.

## 6. Accessibility Testing

Manual accessibility checks were performed on the three implementations.

| Test | MUI | Ant Design | Mantine |
|---|---|---|---|
| Keyboard navigation | Passed | Passed | Passed |
| Tab navigation | Passed | Passed | Passed |
| Modal keyboard interaction | Passed | Passed | Passed |
| Escape key behaviour | Passed | Passed | Passed |
| Focus restoration | Passed | Passed | Passed |
| Dark-mode visual check | Passed | Passed | Passed |

No major issues were encountered during the manual checks.

A formal WCAG colour-contrast audit and comprehensive accessibility audit were not performed.

## 7. Overall Hands-on Findings

**MUI**
- Provides a flexible theming and styling system.
- Component-level customisation is available through the sx prop.
- Required the most lines of code in our implementation.

**Ant Design**
- Provides a comprehensive collection of ready-made components.
- Global theme configuration is convenient through ConfigProvider.
- Required fewer lines than MUI in our implementation.

**Mantine**
- Offers convenient theme configuration and component styling.
- Produced the smallest implementation by line count.
- Provided working dashboard functionality and passed our manual accessibility checks.

## 8. Conclusion

All three libraries successfully supported the development of the same dashboard interface.

MUI offered flexible styling and theme configuration. Ant Design provided a comprehensive set of ready-made components and convenient global configuration. Mantine resulted in the most compact implementation in terms of App.tsx line count.

The experiment demonstrates that each library has different strengths. The appropriate choice depends on the application's requirements, desired design flexibility, component availability and developer preferences.

This comparison is based on one practical dashboard implementation and should not be considered a universal ranking of the libraries.
