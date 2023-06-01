---
title: The Archive at a Glance
subtitle: How interactive data visualizations enhance archival research

# Summary for listings and search engines
summary: Dashboard web applications increase situational awareness in the archive, ultimately improving the latter's accessibility and researchers' productivity

# Link this post with a project
projects: [Filippo Cavriana's Secret Correspondence, 1568—1589.]

# Date published
date: "2021-05-24T16:00:00Z"

# Date updated
lastmod: "2021-05-24T16:00:00Z"

# Is this an unpublished draft?
draft: false

# Show this page in the Featured widget?
featured: false

# Featured image
# Place an image named `featured.jpg/png` in this page's folder and customize its options here.
image:
  caption: ''
  focal_point: ""
  placement: 2
  preview_only: false

authors:
- admin

tags:
- Digital Humanities
- Data Visualization
- Archival research
- Current Research

categories:
- Notes
---

# The Problem
Historical archives can be dauntingly messy. The *Mediceo del Principato* at the [State Archives of Florence](https://www.archiviodistato.firenze.it/asfi/home) is a case in point. Indeed, only a small part of it is inventoried, and many of its documents are scattered through more than 6,500 volumes for no apparent reason. To further complicate things, the archives only let you consult a limited number of volumes (or *filze* as they call them). In normal times, the limit is set to 4 *filze* per day. In times of pandemic, however, that number has gone down to 4 every two weeks. In the absence of detailed inventories, the archive's considerable size forces researchers to devise strategies in order to quickly find the documents they are looking for.

# The Solution
Some may privilege chance, others will also try to make educated guesses on the grounds of chronology, recipients, authors, origin of the archival fonds, language, etc. *Looking* at all these variables simultaneously, however, may reveal unexpected patterns about the archive's structure and improve our conjectures. My experience shows that, when graphed, the metadata researchers usually gather in a spreadsheet can significantly increase situational awareness in the archive.

# The Experiment
My current research focuses on the correspondence of a 16th-century spy. His letters are spread out through hundreds of *filze*. They are written under different identities, to different and sometimes unexpected addressees, from different places, etc. To find *filze* that are more likely to contain the expected letters, I have set-up a dashboard, an interactive data visualization web application ([Plotly Dash](https://plotly.com/dash/)) that connects all sorts of data, including geographical and chronological information with a hierarchic diagram ([sunburst](https://datavizproject.com/data-type/sunburst-diagram/)) of the archival fonds. The dashboard tells me at a glance what has already been found, how much this represents, and gives me a rough idea of where I could possibly look for new letters. By clicking on specific variables, moreover, all the diagrams are updated to show specific correlations.

# Next Steps
Perhaps more importantly, this dashboard can be repurposed as a visual index. When the critical edition of these letters will be published on-line, the dashboard will work as an alternative entry point, from where readers will be able to browse the data. For reasons of confidentiality, I can only show a redacted screenshot at the moment, but I will release the complete dashboard next year. In the meantime a prototype will soon be available. Stay tuned!