Nova Scotia Community College (NSCC) is a local post-secondary school that provides programs and courses for a wide range of disciplines. Their website [nscc.ca](http://nscc.ca) provides students, prospective and attending alike, tools and resources for everything regarding the school.

As a practice exercise, I built a demo redesign for the homepage of [nscc.ca](http://nscc.ca). The main focuses of this exercise were identifying and improving key issues and shortcomings in an existing design, improving my design process, and adhering to the web content accessibility guidelines (WCAG) as outlined by W3C.

## Research and Analysis

### Current Homepage Analysis

An in depth audit and analysis of the current NSCC homepage was conducted to determine what the current design does well, and what aspects and areas could be improved upon.

<figure>
    <picture>
        <source
            srcSet="/assets/images/projects/nscc_redesign/nscc_current_homepage.webp"
            type="image/webp"
        />
        <source
            srcSet="/assets/images/projects/nscc_redesign/nscc_current_homepage.png"
            type="image/png"
        />
        <img
            srcSet="/assets/images/projects/nscc_redesign/nscc_current_homepage.png"
            alt="Screenshot of the current nscc.ca homepage"
            class="rounded"
        />
    </picture>

<figcaption>
    The current nscc.ca homepage
</figcaption>
</figure>

Some key takeaways from this analysis were as follows:

- Layout is fully responsive across viewport sizes
- Hierarchy of information and visual grouping of elements is good in most areas
- Colours have an adequate contrast ratio
- Colours are used consistently
- Typography styles are used consistently
- Navigation is positioned logically and contains relevant information
- Some navigation drop down menus are excessively long or have unclear link text
- Drop down interaction animations are slow
- Navigation menu options are inconsistent between desktop and mobile layouts
- NSCC’s mission or values is not adequately conveyed through the content or design
- The hero section carousel does not provide information in an accessible or easily discoverable fashion.
- There is no clear call to action for new visitors.
- Some page sections lack descriptive labels and display information in a poor order

### Opportunities for Improvement

Using the findings of the analysis of the current design, opportunities for improvement in navigation, layout, and accessibility were identified as follows:

- Speed up navigation interaction animations
- Make navbar sticky for easy access
- Replace desktop navigation drop downs with mega menus for easier parsing
- Increase size and improve position of mobile navigation menu touch targets
- Improve visual grouping and icons of mobile navigation menu sub menu items
- Include search bar in mobile navigation menu
- Improve carousel keyboard navigation
- Improve carousel slide indicators
- Supplement carousel with static banner including a clear call to action
- Improve description of page sections
- Improve layout and branding of page footer
- Adjust colours to be more bright and appealing
- Conform design to a more consistent grid
- Better descriptions for interactable items
- Replace small navigation links with buttons

## Mockup and Implementation

### High Fidelity Mockups

Mockups were created using Figma. The main goals of the design process was to address the previously outlined areas for improvement while maintaining a similar look and feel to the original design so as to not disrupt existing users.

A basic design system was established outlining the colours, spacing, and typography used throughout the design. This ensures the final design maintains a high level of consistency and balance.

<figure>
    <picture>
        <source
            srcSet="/assets/images/projects/nscc_redesign/nscc_design_system.webp"
            type="image/webp"
        />
        <source
            srcSet="/assets/images/projects/nscc_redesign/nscc_design_system.png"
            type="image/png"
        />
        <img
            srcSet="/assets/images/projects/nscc_redesign/nscc_design_system.png"
            alt="Design system for the NSCC homepage redesign"
            class="rounded"
        />
    </picture>

<figcaption>
    Design system for the NSCC homepage redesign
</figcaption>
</figure>

Mockups were created for desktop, tablet, and mobile layouts to demonstrate the responsive design across different breakpoints. Additionally, mockups were created for the various states of interactive elements in the design including navigation menus, carousels, and tab menus.

<figure>
    <picture>
        <source
            srcSet="/assets/images/projects/nscc_redesign/nscc_mockups.webp"
            type="image/webp"
        />
        <source
            srcSet="/assets/images/projects/nscc_redesign/nscc_mockups.png"
            type="image/png"
        />
        <img
            srcSet="/assets/images/projects/nscc_redesign/nscc_mockups.png"
            alt="Mockups for the redesign of the NSCC homepage"
            class="rounded"
        />
    </picture>

<figcaption>
    Mockups for the redesign of the NSCC homepage
</figcaption>
</figure>

### Live Demo Implementation

The finalized mockups were implemented as a live demo using the following technologies:

- **Bun:** package management
- **Vite:** Build tool
- **Preact:** Static site generator
- **Typescript:** Interactivity
- **SASS:** Layout and styles

Notable aspects of the demo include:

- Accessible and semantic page structure
- Fully keyboard navigable
- WCAG 2 compliant carousel and tab menu components
- Non JS fallback for carousel component
- 100 out of 100 lighthouse accessibility score
- 9.9 out of 10 WAVE accessibility impact score

## Project Takeaways

### Key Learnings

Redesigning the NSCC homepage was an excellent exercise for improving my design workflow, and deepening my knowledge of web accessibility.

Some of my key learnings from this project include:

- Accessibility driven design
- WCAG 2 standards for carousel and tab menu elements
- Designing with a modular scale for spacing and typography
- Building a style framework in SASS

### Future Improvements

I am quite satisfied with the results of this exercise, but there are some aspects of the project I would like to improve upon in the future. These improvements include:

- Creating a more robust and better organized design system
- A full implementation of the navigation menus outlined in the mockups
- Refactoring the SASS style framework to be more robust and better organized
- Refactoring the carousel, tab menu, and mega menu implementations to a more maintainable code structure
- Implementing non JS fallbacks for all components that require javascript for interactions
- General improvements to page speed metrics for mobile

## Demo and Mockups

View the [live demo](https://maxcaplan.github.io/NSCC-Homepage-Redesign-Demo/)

View the [demo source code](https://github.com/maxcaplan/NSCC-Homepage-Redesign-Demo)

View the [design mockups](https://www.figma.com/design/BLsFSUfHofaWv2v4vrh8Ag/NSCC-Homepage-Redesign-Mockups)
