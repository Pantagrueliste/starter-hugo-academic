---
title: A Visual Browser for the Archive
subtitle: A user-friendly approach to digitized archival documents

# Summary for listings and search engines
summary: Interactive visualizations provide readers with an alternative sensorial input to navigate complex archival documents.

# Link this post with a project
projects: [Making & Knowing Project]

# Date published
date: "2021-06-20T16:00:00Z"

# Date updated
lastmod: "2021-06-20T17:00:00Z"

# Is this an unpublished draft?
draft: false

# Show this page in the Featured widget?
featured: false

# Featured image
# Place an image named `featured.jpg/png` in this page's folder and customize its options here.
image:
  caption: ''
  focal_point: ""
  placement: 1
  preview_only: true

authors:
- admin

tags:
- Digital Humanities
- Data Visualization
- Archival Research

categories:
- Notes
---
# The Problem
Digital editions suffer from a paradox: while they make recondite documents available to a wider public, the loss of sensorial input resulting from their dematerialization tends to disorient and even discourage readers from engaging with its contents. They make the navigation of vast document repositories rather cumbersome and intimidating. This is not only true for users inexperienced with archival research, but also among readers affected with cognitive impairments.

# The Solution
This is where archival metadata can help us. Indeed, such data enable us to create interactive visual abstractions which provide readers with an alternative sensorial input, increasing thus both ergonomics and accessibility. To make the archive visually navigable, a treemap, or any diagram that efficiently breaks down hierarchical data can do the trick. 

# The Experiment
My first experiment adapts the [Zoomable Treemap code](https://observablehq.com/@d3/zoomable-treemap) for `D3.js`, adding hyperlinks to it. It represents the manuscript BnF Ms Fr 640, its folios, and the entries inside each folio. The colors represent the dominating category. More data is available by hovering over each entry, including the hyperlink to the manuscript.   
In doing so, the treemap becomes an interactive visual index, showing readers a very quick and responsive overview, not only of the manuscript's contents but also of the dimensions of each folio and each entry.  
~~Over the coming months I will continue experimenting with this idea trying other diagrams and other hierarchies... Stay tuned!~~ For a new version of the treemap, click [here]({{< relref "/post/treemap2" >}}).  
{{% callout note %}}
  For a better viewing experience, make sure the webpage settings are in Light mode (click on the top-right moon icon).
{{% /callout %}}

  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap"
      rel="stylesheet" />
    <link rel="stylesheet" href="css/index.css" />
    <link rel="stylesheet" href="css/vis-treemap.css" />
    <link rel="stylesheet" href="css/vis-tooltip.css" />
  </head>
  <body>
    <p>Click any cell to zoom in, or the top to zoom out.</p>
    <div id="treemap"></div>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="js/vis-treemap.js"></script>
    <script src="js/vis-tooltip.js"></script>
    <script src="js/index.js"></script>
  </body>