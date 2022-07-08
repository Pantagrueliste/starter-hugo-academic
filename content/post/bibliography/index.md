---
# Documentation: https://wowchemy.com/docs/managing-content/

title: "Large-scale Bibliographic Parsing with Pre-Trained Language Models"
subtitle: "How to rapidly convert thousands of bibliographic references into a BibTeX database"
summary: ""
authors: [admin]
tags: [Digital Humanities, GPT-3, Bibliography, Automation]
categories: [Efficient Editing]
date: 2022-07-07T19:04:14+02:00
lastmod: 2022-07-07T19:04:14+02:00
featured: false
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: [Efficient Editing]
---

Automation is key to decrease the cost of digital humanities projects. In academic settings, the repetitive and tedious tasks related to editorial work have either been carried out at great expense by overwhelmed scholars, or "outsourced" to students. In this [series of blog posts](https://www.clementgodbarge.com/category/efficient-editing/), I argue that most of these ungrateful tasks not only *can* but also *should* be automated.

In [the previous post](https://www.clementgodbarge.com/post/gpt3/), I have shown for example how pre-trained language models can handle most of the XML labeling work of a digital edition. 

In this post, I expose a second example, this time with bibliography.


## The Problem
Creating a bibliographic database out of the references mentioned in a scholarly article is rather straightforward. One can either do a quick search on a catalogue such as [worldcat](https://www.worldcat.org), download the reference in a particular format, or import it automatically from a local database. This works well with one or two articles.
Beyond a certain number of references, however, the task becomes rebarbative and time consuming. To remedy this issue one can use parsing algorithms such as [anystyle.io](https://anystyle.io) Yet these algos can be difficult to scale up.
When I used anystyle to convert the more than 150 scholarly essays included in our [critical edition of Ms Fr 640](https://edition640.makingandknowing.org/#/), the amount of errors accumulated were simply not manageable. It failed to properly recognize many of our sources, conflating for example the lengthy titles of early modern books for something else, and failed to recognize less typical documents, such as specific webpages, online videos, etc. Parsers work well, provided that the author religiously follows the rules of a well-known convention such as Chicago, Turabian, or MLA. Any departure from the norm results in errors.

## The Solution
This is where {{< hl >}}pre-trained language models{{< /hl >}} can help, as they {{< hl >}}rapidly understand the patterns of any bibliographic style{{< /hl >}}, even one that you invented, requiring only a few examples to properly convert large amounts of formatted bibliography into a [BibTeX database](http://www.bibtex.org/Format/). 

In early 2021, I was lucky enough to have early access to OpenAI's [GPT-3 Codex](https://openai.com/blog/openai-codex/). Codex is a model that enables users to translate natural language into code and vice versa. OpenAI claims it is proficient in more than a dozen programming languages, and though its API is still, as I am writing this blog post, accessible as a beta version, it is already powering popular applications such as GitHub's [Copilot](https://github.com/features/copilot/).

After playing around with this API, I realized that it could work also very well with simpler codes such as `BibTeX`. 

I only had to use four examples in the input prompt to make this work reliably. 

### Input Prompt

References:
Bayle, Ariane. “Patients exemplaires: la correspondance médicale de Fioravanti.” In *Vulgariser la médecine. Du style médical en France et en Italie*, edited by Andrea Carlino and Michel Jeanneret, 181–212. Geneva: Droz, 2009.
Berns, Andrew D. *The Bible and Natural Philosophy in Renaissance Italy: Jewish and Christian Physicians in Search of Truth*. Cambridge: Cambridge University Press, 2015.
Gabler, Hans Walter. “Theorizing the Digital Scholarly Edition.” *Literature Compass* 7, no. 2 (2010): 43–56. https://doi.org/10.1111/j.1741-4113.2009.00675.x.
Findlen, Paula. *Possessing Nature: Museums, Collecting, and Scientific Culture in Early Modern Italy*. Berkeley: University of California Press, 1994.

```BibTeX
BibTex: @incollection{bayle2009,
  author = {Bayle, Ariane},
  booktitle = {Vulgariser la médecine. Du style médical en France et en Italie},
  title = {Patients exemplaires: la correspondance médicale de Fioravanti},
  editor = {Carlino, Andrea and Michel Jeanneret},
  year = {2009},
  address = {Geneva},
  publisher = {Droz},
  langid = {french}
}
@book{berns2015,
  title = {The Bible and Natural Philosophy in Renaissance Italy: Jewish and Christian Physicians in Search of Truth},
  author = {Berns, Andrew D.},
  address = {Cambridge},
  publisher = {Cambridge University Press},
  langid = {english},
  date = {2015}
}
@article{gabler2010,
  author = {Gabler, Hans Walter},
  title = {Theorizing the Digital Scholarly Edition},
  journal = {Literature Compass},
  volume = {7},
  number = {2},
  pages = {43-56},
  doi = {10.1111/j.1741-4113.2009.00675.x},
  langid = {english},
  year = {2010}
}
@book{findlen1994,
  title = {Possessing Nature: Museums, Collecting, and Scientific Culture in Early Modern Italy},
  author = {Findlen, Paula},
  address = {Berkeley},
  publisher = {University of California Press},
  langid = {english},
  date = {1994}
}
```

### Results
The [results](https://github.com/Pantagrueliste/m-k-manuscript-data/blob/master/bibliographies/essays/EssaysBibliography.bib) are strking. More than 2,000 bibliographic references converted in a matter of days. Not only did it accurately reproduce the pattern exposed in my input prompt, but it also correctly added entry  and field types that were not included in the input prompt. `GPT-3`, in other words is perfectly fluent in `BibTeX`. Perhaps more surprisingly for a model essentially trained in English, it recongized all the languages (Russian, French, Italian, Latin, Greek, German, Spanish, etc) adding everytime the correct `langid` field.

Somewhat undexpectedly, GPT-3 also added information that was not in the original references. 
>Baillot, Anne, and Anna Busch. “Editing for Man and Machine.” In _Users of Scholarly Editions: Editorial Anticipations of Reading, Studying and Consulting_, Vol. 13. Variants (Journal of the European Society for Textual Scholarship). Leicester, 2015. 

With this bibliographic reference, for example, GPT-3  added the permanent link to the open-access repository ([HAL](https://hal.archives-ouvertes.fr)) where the paper can be read, including the ad-hoc fields `HAL_ID` and `HAL_VERSION` : 
```BibTeX
@inproceedings{baillot2015, 
  title = {Editing for Man and Machine},
  author = {Baillot, Anne and Busch, Anna},
  year = 2015,
  booktitle = {Users of Scholarly Editions: Editorial Anticipations of Reading, Studying and Consulting},
  address = {Leicester},
  series = {Variants (Journal of the European Society for Textual Scholarship)},
  volume = 13,
  editor = {Bruhn, Siglinde and Schreiber, Manfred},
  langid = {english},
  hal_id = {halshs-01233380},
  hal_version = {v1}
}
```

These additions indicate that {{< hl >}}GPT-3 does not only parse the bibliographic reference, but also completes it on the grounds of what it initially learned.{{< /hl >}} It would be interesting, in that regard, to see if it behaves similarly with references dating after GPT-3's training...

## Limitations
GPT-3 is not perfect, however, and always needs to be supervised. One of its known limitations is [hallucination](https://arxiv.org/abs/2005.00661), as it sometimes invent things. makes improbable assumptions. 

GPT-3's bouts of incoherence were manifest, for example, when it spontaneously changed an author's patronym from "Ruscelli" to "Ruscello." This is technically not a mistake, as early modern Italian patronyms could be used in plural or singular indisctinctively. However, today's convention is that if a patronym is in plural or singular, you should keep it as it is. Today, nobody would call Machiavelli Machiavello, just as we are expected to use Rossello instead of Rosselli. 

It is hard to understand why GPT-3 prefers Ruscello to Ruscelli. Is it because all the other names in this part of the bibliography happen to be inflected in singular (Bariletto, Cesano, Rossello)?

```Bibtex
@book{rossello1565,
  title = {Della summa de’ secreti universali},
  author = {Rossello, Timoteo},
  address = {Venice},
  publisher = {Giovanni Bariletto},
  langid = {italian},
  date = {1565}
}

@book{ruscello1559, 
  title = {La seconda parte de’ secreti del Reverendo Donno Alessio Piemontese},
  author = {Ruscello, Girolamo},
  address = {Pesaro}, 
  publisher = {Bartolomeo Cesano}, 
  langid = {italian}, date = {1559}
}
```

## Conclusion
Written over four years of intense collaborations, the 150+ essays [included in our digital edition](https://edition640.makingandknowing.org/#/essays) not only provide some vital information about the manuscript we edited and translated, but also include valuable bibliographic information.

Aggregating these bibliographic references into a database is important, as it enables editors to change bibliographic formatting in the blink of an eye, giving them more flexibility to display this information as they wish. This database also gives valuable sources of information about the edition and the project that made it possible, opening new analytical perspectives. Such a database can be completed in a time frame that is still regarded by many as unthinkable. 

Some mistakes can creep in, arguably, notably because of GPT-3's tendency to hallucinate. Yet future iterations of pre-trained language models will mitigate this problem. Crucially, this type of automation does not exempt us from re-reading and correcting the contents we create and curate. The human factor remains central. 
