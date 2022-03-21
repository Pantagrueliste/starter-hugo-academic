---
# An instance of the Contact widget.
# Documentation: https://sourcethemes.com/academic/docs/page-builder/
widget: contact

# This file represents a page section.
headless: true

# Order that this section appears on the page.
weight: 130

title: Contact
subtitle:

content:
  # Automatically link email and phone or display as text?
  autolink: true
  
  # Email form provider
  form:
    provider: netlify
    formspree:
      id:
    netlify:
      # Enable CAPTCHA challenge to reduce spam?
      captcha: true
  # Contact details (edit or remove options as required)
  address:
    street: Via de' Benci 10
    city: Firenze
    postcode: '50122'
    country: Italy
    country_code: IT
  coordinates:
    latitude: '43.76824316096065' 
    longitude: '11.259942892581726'
design:
  columns: '2'
---