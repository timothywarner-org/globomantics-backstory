# 🎨 Brand Assets - Globomantics Visual Identity

Official brand assets for the Globomantics Robotics company.

---

## 📁 Available Assets

### 🏷️ Logos
- **Primary logo** - Full "GLOBOMANTICS" with G icon
- **Icon only** - Standalone G mark
- **Variations** - Black, white, blue, grey versions
- **Formats** - SVG (preferred), PNG (1x, 2x), AI source

### 🎨 Colors
- **Primary** - Globo Blue (#0066CC), Tech Black (#1A1A1A)
- **Secondary** - Innovation Orange (#FF6B35), Success Green (#28A745)
- **Extended** - Electric Purple (#7B2CBF), Data Cyan (#00D4FF)
- **Formats** - ASE swatch, CSS variables, JSON

### 🔤 Typography
- **Primary Font** - Open Sans (all weights included)
- **Fallbacks** - System font stack defined
- **Usage** - Headers (Bold/ExtraBold), Body (Regular), Small (Light)

### 🖼️ Imagery
- **Product photos** - Robots in action
- **Office scenes** - Workplace environments  
- **Abstract** - Tech-themed backgrounds
- **Icons** - UI icon set in brand colors

---

## 🚦 Quick Usage

### Logo in HTML
```html
<img src="logos/globomantics-logo-blue.svg" alt="Globomantics">
```

### Brand Colors in CSS
```css
:root {
  --globo-blue: #0066CC;
  --tech-black: #1A1A1A;
  --innovation-orange: #FF6B35;
  --success-green: #28A745;
}
```

### Typography Setup
```css
@import url('fonts/open-sans.css');

body {
  font-family: 'Open Sans', -apple-system, sans-serif;
}
```

---

## 📋 Brand Guidelines

- ✅ Minimum logo clear space = height of "G"
- ✅ Don't alter logo colors or proportions
- ✅ Use blue/black for primary actions
- ✅ Orange for CTAs and alerts
- ✅ Maintain AA accessibility contrast

See full guidelines in [`06-REFERENCE/brand-guidelines.md`](../06-REFERENCE/brand-guidelines.md)

---

## 📝 File Naming

- Logos: `globomantics-logo-[variant].[ext]`
- Icons: `icon-[name]-[size].[ext]`
- Images: `[category]-[description]-[number].[ext]`

---

## 🤝 Contributing

When adding brand assets:
- ✅ Follow existing naming conventions
- ✅ Include multiple formats (SVG + PNG)
- ✅ Optimize file sizes
- ✅ Maintain brand consistency