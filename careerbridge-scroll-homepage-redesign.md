# CareerBridge AI — Premium Scroll-Driven Homepage Redesign

Repository:

https://github.com/Dhanush-kumar-m/CareerBridge-AI.git

Redesign the public homepage of CareerBridge AI into a premium, modern educational placement-preparation website.

The goal is to borrow the restrained scroll storytelling of Fin.com and a small amount of the bold visual energy of the Starwave Framer website, without making CareerBridge look like a podcast, Web3 startup, entertainment website, or over-designed AI-generated landing page.

Reference websites:

* https://www.fin.com/?ref=land-book.com
* https://starwavepodcast.framer.website/?ref=land-book.com

Do not directly copy either website. Use them only as inspiration for layout rhythm, scroll transitions, sticky storytelling, typography scale, product previews, section pacing, and visual polish.

---

## Core Design Direction

The homepage should feel like:

* A premium educational technology platform
* A trustworthy college placement portal
* A modern student preparation dashboard
* A professional product used for aptitude, coding, resumes, interviews, and company-specific preparation

The design should use approximately:

* 70% clean educational product UI
* 20% Fin-style scroll storytelling
* 10% Starwave-style visual energy

Do not turn the entire homepage into a cinematic or experimental scrolling website.

The homepage must remain:

* Easy to understand
* Easy to navigate
* Fast to load
* Mobile-friendly
* Accessible
* Professional
* Suitable for students and colleges

---

## Important Product Context

CareerBridge AI is a placement-preparation platform.

It provides:

* Aptitude practice
* Coding practice
* Resume preparation
* Mock interview preparation
* Company-specific placement questions
* Student progress tracking
* Placement readiness analytics

It does not provide:

* Job listings
* Job applications
* Apply Now functionality
* Recruitment services
* Guaranteed placements

Do not add job application features.

Do not use phrases that imply companies are hiring directly through CareerBridge.

---

## Visual Style

Use a premium light-first design system.

Recommended colors:

```css
--background: #f6f7fb;
--surface: #ffffff;
--surface-soft: #f0f3f9;
--text-primary: #172033;
--text-secondary: #667085;
--border: #e4e8f0;
--primary: #3157d5;
--primary-dark: #233fa8;
--accent: #14a38b;
--success: #16a36a;
--warning: #e59a22;
```

Use:

* Clean white and light-grey surfaces
* Deep blue as the primary brand color
* Muted teal as the supporting accent
* Soft borders
* Subtle shadows
* Rounded corners between 14px and 20px
* Generous spacing
* Strong typography hierarchy
* Large but readable headings
* Minimal gradients
* Subtle background textures where useful

Do not use:

* Heavy amber branding
* Excessive neon colors
* Glassmorphism everywhere
* Constant glow effects
* Animated particles
* Galaxy backgrounds
* Web3 visuals
* Excessive dark sections
* Random gradients on every card
* Mouse-following spotlights
* Decorative animations without purpose

---

## Typography

Use a modern professional font combination.

Preferred:

* Display and headings: Geist, Manrope, Outfit, or Plus Jakarta Sans
* Body and interface: Inter or Geist Sans
* Code preview: JetBrains Mono or a similar monospace font

Typography requirements:

* Strong contrast between headings and body text
* Large hero headline
* Clear section headings
* Short paragraph widths
* Comfortable line height
* No oversized headings that become unreadable on mobile

---

# Homepage Structure

Reduce the homepage to approximately 7 or 8 meaningful sections.

---

## 1. Navigation

Create a clean sticky navigation bar.

Include:

* CareerBridge logo
* Home
* Practice
* Companies
* Resources
* About
* Sign In
* Start Preparing

Requirements:

* Use only valid existing routes
* Do not create broken links
* Keep navigation clean
* Use a subtle background blur only after scrolling
* Do not animate the navigation heavily
* Ensure mobile navigation works properly
* Add visible keyboard focus states

---

## 2. Hero Section

Create a premium two-column hero layout.

### Left side

Eyebrow:

PLACEMENT PREPARATION PLATFORM

Headline:

Prepare for placements with a clear plan.

Description:

Practice aptitude, coding, resumes and interviews in one structured platform designed to help students become placement-ready.

Primary CTA:

Start Preparing

Secondary CTA:

Explore Practice Modules

Add three compact trust points:

* Structured learning paths
* Company-specific questions
* Progress tracking

### Right side

Create a realistic CareerBridge student dashboard preview.

Do not use a generic glassmorphism dashboard with only random scores.

Show realistic student actions such as:

* Weekly preparation goal
* Continue Java Arrays practice
* Aptitude assessment scheduled today
* TCS preparation progress
* Resume improvement task
* Recent learning activity

The dashboard preview should look like a real application interface.

Animation:

* Small fade-and-rise entrance
* Slight parallax or floating effect
* No heavy scroll pinning in the hero
* No Spline globe
* No full-screen canvas

---

## 3. Module Marquee Strip

Add one subtle horizontal scrolling strip below the hero.

Content:

* Aptitude Practice
* Coding Arena
* Resume Preparation
* Mock Interviews
* Company Preparation
* Progress Analytics

Design:

* Slow movement
* Clean text or compact pills
* No flashing
* No large logos
* Pause animation on hover
* Disable animation for reduced-motion users
* On mobile, convert it into a horizontally scrollable row or static wrap

Use this effect only once on the homepage.

---

## 4. Sticky Module Storytelling Section

This is the main premium scroll-driven section.

Use a Fin-inspired sticky storytelling layout.

### Desktop layout

Left side remains sticky and shows:

* Section label
* Current module number such as 01 / 04
* Module title
* Short description
* Small supporting points
* Link to the module

Right side shows a large product preview that updates as the user scrolls.

Modules:

1. Aptitude Practice
2. Coding Arena
3. Resume Preparation
4. Mock Interviews

Each module should have its own realistic interface preview.

Examples:

### Aptitude

* Question card
* Multiple-choice options
* Explanation panel
* Accuracy or progress indicator

### Coding

* Code editor preview
* Problem statement
* Test cases
* Successful run result

### Resume

* ATS score
* Missing keyword suggestions
* Formatting checks
* Resume improvement tips

### Interview

* Interview question
* Recording or response interface
* Communication feedback
* Pace and confidence indicators

Animation behavior:

* Smooth crossfade
* Small slide transitions
* Progress indicator updates
* No extreme rotations
* No 3D card flipping
* No scroll hijacking

Use CSS position sticky where possible.

Use GSAP ScrollTrigger only if necessary for this one section.

Do not use both GSAP and Framer Motion for the same animation.

### Mobile behavior

Disable sticky pinning.

Render the four modules as normal stacked cards.

All content must remain visible without animations.

---

## 5. Company-Specific Preparation Section

Make this section visually important.

Heading:

Prepare for the companies you are targeting

Description:

Study previous assessment patterns, frequently asked coding problems, technical topics and interview questions for specific hiring companies.

Create company preparation cards.

Each card may include:

* Company name
* Preparation category
* Aptitude patterns
* Coding questions
* Technical interview topics
* HR questions
* Preparation completion
* Explore Preparation button

Do not add:

* Apply Now
* Vacancies
* Job descriptions
* Salary listings
* Recruitment forms
* Job application functionality

Add a subtle horizontal card movement or drag interaction only on desktop if it improves usability.

On mobile, use normal horizontal swipe cards or stacked cards.

Do not imply an official partnership with companies.

---

## 6. Preparation Journey Section

Create a Fin-inspired numbered process.

Heading:

A clear path from preparation to readiness

Steps:

01 Assess your current level

Understand your current strengths across aptitude, coding, resumes and interviews.

02 Follow a structured plan

Continue with recommended modules and topic-based learning.

03 Practice company-specific questions

Prepare for commonly tested topics and previous placement patterns.

04 Track readiness and improve

Review performance, identify weak areas and continue improving.

Design options:

* Large step numbers
* Thin connecting line
* Active step changes during scrolling
* Preview image or UI card linked to the active step

Keep the animation simple and understandable.

Do not use overlapping ScrollStack cards.

---

## 7. Student Progress and Analytics Section

Create a clean two-column section.

Left side:

Heading:

Know exactly where you need to improve

Description:

CareerBridge helps students monitor their preparation activity, topic completion, accuracy and company readiness from one dashboard.

Show progress categories:

* Weekly learning activity
* Topic completion
* Coding accuracy
* Aptitude performance
* Company preparation readiness

Right side:

Display a realistic analytics dashboard preview.

Use:

* Simple line chart
* Progress bars
* Completion rings
* Activity calendar
* Recent progress list

Do not use unnecessary radar charts.

Do not use fake platform-wide numbers.

Any numerical values inside preview cards should clearly appear as sample student dashboard data.

---

## 8. Final CTA Section

Use a bold transition inspired slightly by Starwave, but keep it educational and professional.

Use a deep blue or dark navy background.

Heading:

Start building your placement readiness today

Description:

Follow a structured path, practice consistently and understand exactly where you need to improve.

Primary button:

Open Student Portal

Secondary link:

Explore Practice Modules

Add a very subtle background text movement or large typographic element.

Do not use galaxy imagery, podcast styling, excessive marquees or glowing particles.

---

# Scroll and Animation Guidelines

Use scroll effects only when they help explain the product.

Recommended effects:

* Fade-and-rise section entrances
* Sticky product storytelling
* Smooth preview transitions
* Subtle card parallax
* One slow marquee strip
* Numbered process progress
* Small CTA transition

Avoid:

* Scroll hijacking
* Locomotive-style forced scrolling
* Very slow smooth scrolling
* Pinning every section
* Horizontal page scrolling
* Large-scale rotations
* Infinite moving elements everywhere
* Content hidden until JavaScript loads
* Excessive bounce animations
* Multiple marquee sections
* Animations inside forms, tests or important controls

Use natural browser scrolling.

---

# Performance Requirements

Inspect the current homepage implementation before making changes.

The current homepage dynamically imports many sections with server-side rendering disabled.

Refactor it.

Requirements:

* Remove `use client` from `src/app/page.jsx` unless absolutely necessary
* Server-render static homepage sections
* Keep client components only for interactive tabs, scroll tracking and animation
* Remove the Spline globe
* Remove unnecessary heavy dependencies
* Prevent layout shifting
* Avoid loading all sections through client-side JavaScript
* Lazy-load below-the-fold visuals where appropriate
* Use optimized images
* Avoid unnecessary videos
* Maintain good Lighthouse performance
* Prevent hydration errors

Do not break authentication or existing routes.

---

# Component Architecture

Create reusable homepage components.

Suggested structure:

```text
src/
  components/
    home/
      HomeNavbar.jsx
      HeroSection.jsx
      ModuleMarquee.jsx
      StickyModulesSection.jsx
      ModulePreview.jsx
      CompanyPreparationSection.jsx
      PreparationJourneySection.jsx
      StudentProgressSection.jsx
      FinalCTASection.jsx
```

You may adapt this structure to match the current project.

Do not create unnecessary duplicate components.

Keep content data-driven where appropriate.

Example:

```js
const modules = [
  {
    id: "aptitude",
    title: "Aptitude Practice",
    description: "...",
    href: "...",
  },
];
```

---

# Existing Components to Remove or Replace on Homepage

Remove or stop using these on the homepage:

* Spline globe section
* SpotlightCard mouse effects
* ScrollStack overlapping cards
* Excessive SplitText heading animations
* Separate long sections for every feature
* Repeated statistics sections
* Generic fake dashboard metric cards
* Heavy glassmorphism
* Excessive animated gradients
* Decorative traffic-light controls on every preview

Do not delete reusable components if other pages still use them.

Only remove files when they are confirmed unused throughout the project.

---

# Content Style

Use clear, natural, student-friendly language.

Avoid phrases such as:

* Next-Gen Career Training Infrastructure
* Institutional-grade platform
* Neural interviewers
* AI-powered ecosystem
* Revolutionise your career
* Accelerate candidate preparation
* Target preparedness
* Placement transformation infrastructure

Use straightforward educational copy.

Examples:

* Practice consistently
* Follow a structured preparation plan
* Improve weak topics
* Prepare for company-specific placement rounds
* Track your progress
* Build placement readiness

---

# Accessibility

Implement:

* Semantic HTML
* Proper heading order
* Keyboard-accessible controls
* Visible focus styles
* Accessible tab components
* Sufficient color contrast
* Alt text for meaningful images
* Correct button and link semantics
* Reduced-motion support
* Responsive text scaling

Add:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Do not rely on animation to communicate important information.

---

# Responsive Requirements

Support:

* 320px mobile
* 375px mobile
* 768px tablet
* 1024px laptop
* 1440px desktop
* Large desktop screens

Mobile requirements:

* No sticky storytelling pinning
* No forced horizontal scroll
* No text clipping
* Buttons must remain accessible
* Cards should stack cleanly
* Dashboard previews should remain readable
* Navigation should collapse into a proper menu
* Marquee should become swipeable or static
* Avoid oversized headings

---

# Functional Safety

Do not modify or break:

* Authentication
* Login
* Student dashboard
* Admin dashboard
* Aptitude module
* Coding module
* Resume tools
* Interview module
* Company preparation
* Supabase integration
* Existing database logic
* Protected routes

Do not invent backend functionality.

Do not hardcode companies inside dashboard logic if company data already comes from the database.

Static homepage demonstration content may be local presentation data, but it must not replace real company data elsewhere.

---

# Final Validation

After implementation:

1. Run the development server.
2. Run the production build.
3. Fix all build errors.
4. Fix all import errors.
5. Fix all lint errors caused by the redesign.
6. Test mobile responsiveness.
7. Test keyboard navigation.
8. Test reduced-motion mode.
9. Verify that no horizontal overflow exists.
10. Verify all CTA links.
11. Verify that company cards are preparation content only.
12. Confirm that no Apply Now functionality was added.
13. Confirm that static sections are server-rendered where possible.
14. Confirm that the Spline globe was removed.
15. Confirm that homepage performance improved.

---

# Final Report

After completing the redesign, provide:

* Files created
* Files modified
* Files deleted
* New homepage section order
* Components reused
* Components replaced
* Animations added
* Heavy effects removed
* Responsive changes
* Accessibility changes
* Performance improvements
* Build result
* Any remaining warnings
* Screenshots or a concise visual description of desktop and mobile layouts

Do not stop after only changing colors.

Do not produce a generic template.

The final homepage must feel custom-built for CareerBridge AI and clearly communicate placement preparation for students.
