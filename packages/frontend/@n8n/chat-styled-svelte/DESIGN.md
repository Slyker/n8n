# Visual Showcase - @n8n/chat-styled-svelte

## Professional AI Chat Interface

A beautifully designed, production-ready AI chat component built on top of the headless library.

---

## 🎨 Design Features

### Modern Gradient Header
- Beautiful gradient background (purple to pink)
- AI assistant avatar with icon
- Clear title and subtitle
- Professional and inviting

### Clean Message Layout
- User messages aligned right with gradient background
- Bot messages aligned left with clean white background
- Avatar icons for both user and bot
- Smooth slide-in animations

### Professional Typography
- System font stack for native feel
- Optimal line heights for readability
- Proper text hierarchy
- Clean, modern appearance

### Smooth Interactions
- Animated typing indicator
- Hover effects on buttons
- Focus states for accessibility
- Smooth scrolling

---

## 🎯 Key Components

### Header
```
┌─────────────────────────────────────┐
│ [AI] AI Assistant                   │
│     Powered by n8n                  │
└─────────────────────────────────────┘
```
- Gradient background
- AI icon avatar
- Customizable title and subtitle

### Messages
```
┌─────────────────────────────────────┐
│  [🤖] Hello! How can I help?        │
│                                     │
│           [👤] I need assistance    │
└─────────────────────────────────────┘
```
- Bot messages: left-aligned, white background
- User messages: right-aligned, gradient background
- Avatars with icons
- Smooth animations

### Input Area
```
┌─────────────────────────────────────┐
│ [Type your message...]        [📤] │
└─────────────────────────────────────┘
```
- Auto-expanding textarea
- Send button with icon
- Focus states
- Disabled states

---

## 🌈 Theme Support

### Light Theme (Default)
- White backgrounds
- Dark text
- Purple/pink gradient accents
- Subtle shadows

### Dark Theme
- Dark gray backgrounds
- Light text
- Same gradient accents
- Deeper shadows

### Custom Themes
Easy to override via CSS variables:
```css
--ai-primary: #10b981;      /* Custom green */
--ai-secondary: #3b82f6;    /* Custom blue */
```

---

## 📊 Visual Hierarchy

```
Header (Gradient)
  ├─ Avatar (Icon)
  ├─ Title (Bold)
  └─ Subtitle (Light)

Messages (Scrollable)
  ├─ Bot Message
  │   ├─ Avatar (Gradient)
  │   └─ Bubble (White)
  └─ User Message
      ├─ Bubble (Gradient)
      └─ Avatar (Gray)

Input (Fixed Bottom)
  ├─ Textarea (Expandable)
  └─ Send Button (Gradient)
```

---

## 🎭 States & Animations

### Message States
1. **Empty** - Welcoming empty state with icon
2. **Messages** - Slide-in animation for new messages
3. **Typing** - Animated dots indicator
4. **Error** - Error message display

### Button States
1. **Default** - Gradient background
2. **Hover** - Lift effect + glow
3. **Active** - Press down effect
4. **Disabled** - Reduced opacity

### Input States
1. **Default** - Border + background
2. **Focus** - Blue border + shadow + white background
3. **Disabled** - Reduced opacity
4. **Error** - Red border (if needed)

---

## 🎨 Color Palette

### Light Theme
```
Primary:     #667eea (Purple)
Secondary:   #764ba2 (Pink)
Background:  #ffffff (White)
Surface:     #f8f9fa (Light Gray)
Text:        #1f2937 (Dark Gray)
Border:      #e5e7eb (Light Border)
```

### Dark Theme
```
Primary:     #667eea (Purple)
Secondary:   #764ba2 (Pink)
Background:  #1f2937 (Dark Gray)
Surface:     #111827 (Darker Gray)
Text:        #f9fafb (Almost White)
Border:      #374151 (Dark Border)
```

---

## 📐 Spacing & Sizing

### Spacing Scale
```
xs:  4px   (gaps, small padding)
sm:  8px   (icon spacing)
md:  12px  (component spacing)
lg:  16px  (section padding)
xl:  24px  (container padding)
```

### Component Sizes
```
Avatar:       32x32px
Send Button:  44x44px
Input:        Auto-expand, max 120px
Header:       Auto height, ~80px typical
```

---

## ♿ Accessibility Features

- ARIA labels on buttons
- Keyboard navigation
- Focus indicators
- Semantic HTML
- Color contrast compliance
- Screen reader friendly

---

## 🚀 Performance

- Smooth 60fps animations
- Efficient re-renders
- Optimized CSS
- Minimal bundle size (~60KB)
- CSS-in-JS for scoping

---

## 🎯 Use Cases

Perfect for:
- Customer support chatbots
- AI assistants
- Interactive tutorials
- Product recommendations
- Document Q&A systems
- Virtual assistants

---

## 📱 Responsive Design

### Desktop (>768px)
- Optimal width: 400-600px
- Fixed height or flex container
- All features visible

### Mobile (<768px)
- Full width
- Stacked controls
- Touch-optimized buttons
- Adjusted spacing

---

## 🎬 Animation Details

### Message Entry
```
Duration: 300ms
Easing: ease-out
Effect: Slide up + fade in
```

### Typing Indicator
```
Duration: 1400ms
Easing: ease-in-out
Effect: Bounce animation
Stagger: 160ms per dot
```

### Button Hover
```
Duration: 200ms
Easing: ease
Effect: Lift + glow shadow
```

---

This design provides a professional, modern, and accessible AI chat interface that works out of the box while remaining customizable for brand-specific needs.
