---
title: Automating Markup in Digital Scholarly Editions
subtitle: Can pre-trained language models significantly increase editorial productivity?

# Summary for listings and search engines
summary: Pre-trained language models can help scholars automate some of the most tedious and labor-intensive tasks of edition. Based on the curated annotations of *Secrets of Craft and Nature in Renaissance France*, I evaluate the extent to which a model such as GPT-3 can be rapidly trained to annotate 16th-century technical manuscripts.

# Link this post with a project
projects: [Efficient Editing]

# Date published
date: "2021-11-22T18:15:00Z"

# Date updated
lastmod: "2021-11-22T20:34:00Z"

# Is this an unpublished draft?
draft: false

# Show this page in the Featured widget?
featured: true

# Featured image
# Place an image named `featured.jpg/png` in this page's folder and customize its options here.
image:
  caption: ""
  focal_point: ""
  placement: 1
  preview_only: false

authors:
- admin

tags:
- Digital Humanities
- Machine Learning
- Digital Critical Editions
- Current Research

categories:
- Efficient Editing
---
# Introduction
How to produce digital scholarly editions without breaking the bank? In this post, the first of a series devoted to efficient editing, I evaluate the role pre-trained language models can play in the automation of editorial tasks, such as semantic markup.

{{< toc >}}

# The Problem
## A Work of Love
When it comes to love, one does not count the cost... or so goes the old proverb. This is particularly true for digital scholarly editions, as the transcription, translation, and annotation involved in their development entail thousands of hours of work, carried out, as in the case of [*Secrets of Craft and Nature in Renaissance France*](https://edition640.makingandknowing.org), by hundreds of highly qualified collaborators.

In a sense, that high-visibility projects in the Digital Humanities can obtain the vast amounts of funding necessary to run is a blessing. Yet heavy reliance on the largesse of wealthy foundations, universities, and government agencies, the prolonged need for important human resources, does not constitute a viable economic model for the future.

In fact, if we want to encourage scholars from all over the world to make historical documents accessible to a broader public, {{< hl >}}the cost of Digital Critical Editions should decrease by orders of magnitude{{< /hl >}}. 

## A High Threshold
Somewhat paradoxically, {{< hl >}}the solution may come from labor-intensive projects such as [*Secrets of Craft and Nature in Renaissance France*](https://edition640.makingandknowing.org), as they constitute a valuable training set{{< /hl >}} to automate some of the most rebarbative and repetitive tasks involved in digital editing, such as markup.

Not that markup is unimportant. As a matter of fact, {{< hl >}}markup has become the indispensable component of any serious digital scholarly project.{{< /hl >}} Standardized by the [Text Encoding Initiative](https://tei-c.org), it enables us to record as many aspects as possible regarding the document and the text it mediates, such as structure, marginal annotations, deletions, variations, type of paper, stains, calligraphy... You name it.

Taken from [*Secrets of Craft and Nature in Renaissance France*](https://edition640.makingandknowing.org), the following example shows how markup enhances the text with additional information (category, structure, semantic fields, deletions, etc), ultimately giving digital editions a significant advantage over their material ancestors.

<table>
<tr>
<th> Plain Text </th>
<th> XML Markup</th>
</tr>
<tr>
<td>

```text
Pour rompre grenades et donner 
violence aux artifices de foeu

Mects parmy la pouldre et la sixiesme
partye dicelle de vif argent
```

</td>
<td>

```xml
<div id="p008r_2" categories="arms and armor">  
<head>Pour rompre <wp>grenades</wp> et donner<lb/> 
violence aux <wp>artifices de foeu</wp></head>
<ab>Mects parmy la <m>pouldre</m>
<del><ms>six fois autant</ms> de 
<m>vif argent</m></del><lb/>
<del>et</del> <ms>la sixiesme partye</ms>
 dicelle de <m>vif argent</m></ab>
</div>

```

</td>
</tr>
</table>

This information is not only valuable for archival purposes, but also, as I have shown in previous occasions, for synthetic and analytical purposes. Nevertheless, this type of annotation can be extremely time-consuming, since the same text often has to be available in different flavors: as a translation, as a transcription, a modernization, etc. 

# The Solution
## Transformers: the Simplest Path to Automation?
In 2020, [OpenAI](https://www.openai.com) released with much fanfare its latest family of general-purpose large-scale language models called GPT-3, which stands for "Generative Pre-trained Transformer 3." Transformers represent a fairly recent breakthrough in Artificial Intelligence. They learn new tasks with impressive speed, by simply reading a prompt and looking at a very limited number of examples. They can also receive additional training with an ad-hoc dataset (fine-tuning), improving latency and accuracy. We say, for that reason, that GPT-3 and comparable transformers are [few-shot learners](https://arxiv.org/abs/2005.14165). 

OpenAI claims that GPT-3 contains a record number of 175 billion parameters, having been trained on more than 570gb of text, the majority of which are English documents presumably taken from [the internet](https://skylion007.github.io/OpenWebTextCorpus/). Because of its sheer size, GPT-3 has set a new standard in this domain, executing out of the box diverse tasks with troubling realism. It writes plausible [opinion pieces](https://www.theguardian.com/commentisfree/2020/sep/08/robot-wrote-this-article-gpt-3), it [interacts with humans](https://www.quickchat.ai/emerson) on chat rooms, [answers to emails](https://www.jarvis.ai/?fpr=serpbattle), [summarizes texts](https://medium.com/geekculture/a-paper-summarizer-with-python-and-gpt-3-2c718bc3bc88), translates documents, explains jargon, etc.

Having had early access to OpenAI's API since May 2021, I have been able to experiment with the model's capacity to solve a number of reputedly difficult tasks, such as translating French poetry and Neo-Latin texts to English, explaining analogies, and even simplifying Book 4 of Kant's *Groundwork for a Metaphysics of Morals* to a seven-year old kid (albeit unconvincingly).

### Codex
One of the latest development of GPT-3 focuses on computer languages. Named *Codex*, this model translates natural language to computer language and vice versa. For example, if I'm looking for a regular expression that enables me to "find words starting with a capital letter only," GPT-3 promptly translates this into a functional Regular Expression: ```[A-Z]+\w+```.

OpenAI claims that *Codex* can work with a dozen of computer languages, including Python, JavaScript, Go, Perl, PHP, Ruby, and Swift. By converting pseudo-code into code seamlessly, *Codex* enables people to focus not on the fastidious syntax of a computer language, but on the logical steps and strategies that enable applications to solve problems.

### Beyond OpenAI
OpenAI, of course, is not the only player in town. As mentioned before, the Beijing Academy for Artificial Intelligence announced in 2021 an even bigger and more capable model known as *Wu Dao 2*. Nvidia and Microsoft joined forces to produce the aptly named *Megatron-Turing NLG 530B* model. Smaller start-ups like [AI21 Labs](https://www.ai21.com) and [Cohere](https://cohere.ai) also propose APIs to the public. Also worth mentioning are open-source initiatives such as [EuletherAI](https://www.eleuther.ai). The AI scene, of course, is evolving very quickly, to follow new initiatives in the field, check out the [the Hugging Face](https://huggingface.co/transformers/master/index.html).

# The Experiments

{{% callout note %}}
The objective of these experiments is to find the most economic path to reliable automation of editorial tasks. One may argue that some of these could also be automated using supervised learning algorithms. We will explore this hypothesis in a future post.
{{% /callout %}}

Can a Transformer like GPT-3 learn to annotate, for example, a 16th-century technical and scientific manuscript?

## Experiment 1 -- Text Categorization.
Let's start with something relatively simple. As a "few-shots learner," GPT-3 should be able to rapidly understand how the entries in Ms Fr 640 have been classified by our editorial team.

### Prompt engineering
To train it, I used a very minimal prompt and selected four small plaintext entries as examples, including one about "medicine, "arms and armor," and "painting." 

### Testing
Then, I copied another passage that was not in the initial sequence: 

```text
Working neatly
Never put down, if you can, two colors one on top of the other.   
But next, having made your design carefully, keep the place of shadows for them alone,
& also separately that of lights & highlights, without layering one color all over & then highlighting or else shading on it.  
And in this way, you further your work, economize your colors & work neatly.  
Which is the reason that, the colors not being muddled nor mixed together, they do not die & you soften the colors better, since they are not so thick.
```
The output is perfectly consistent with the content: 

```xml
<categories="painting">
```

If we try with an entry belonging to a category that was not even included in the initial selection of texts chosen to train of GPT-3, the result is surprising. 

```xml
<categories="jewelry">
```

### Result
The "jewelry" category does not exist in our edition of Ms. Fr. 640. The editorial team [prefers](https://edition640.makingandknowing.org/#/content/resources) the broader category of "Stones." GPT-3's intuition is good, however, and indicates that with a little more training, it can learn to categorize any entry of Ms. Fr. 640, and perhaps even that of similar 16th-century technical texts.   

## Experiment 2 -- Semantic Markup
Let's raise the bar a little higher. If transformers such as GPT-3 can learn to categorize texts according to specific editorial criteria, can they also identify some of the text's markup?  

{{% callout note %}}
*Secrets of Craft and Nature* offers a [combination](https://edition640.makingandknowing.org/#/content/resources/principles) of semantic and structural labels. Unfortunately, GPT-3 does not process images, contrary to other projects such as [Wu Dao 2](https/://towardsdatascience.com/gpt-3-scared-you-meet-wu-dao-2-0-a-monster-of-1-75-trillion-parameters-832cd83db484). It is likely that future iterations of GPT will include this capability, which is necessary to recognize most of the structural and material aspects of a document. We will skip these particular tags and focus instead on markup that does not require image recognition. 
{{% /callout %}}

### Prompt engineering
Semantic tags include references to animals, plants, toponyms, sensorial inputs, etc. In the training prompt, I selected a few examples from the edition:
```xml
<!--Input prompt-->
The following is a list of words and their corresponding semantic tags

cannons: <wp>cannons</wp>
powder: <m>powder</m>
flasks: <tl>flasks</tl>
wooden: <m>wooden</m>
iron: <m>iron</m>
parchment: <m>parchment</m>
goats: <al>goats</al>
lambs: <al>lambs</al>
leather: <m>leather</m>
earth: <m>earth</m>
fine fatty earth: <m>fine fatty earth</m>
Venice: <pl>Venice</pl>
Flemish: <pl>Flemish</pl>
almond: <pa>almond</pa>
almond oil: <m><pa>almond</pa> oil</m>
walnuts skin: <m><pa>walnuts</pa> skin</m>
molten lead: <m>molten lead</m>
today: <tmp>today</tmp>
In the past: <tmp>In the past</tmp>
Clockmakers: <pro>Clockmakers</pro>
red copper: <m>red copper</m>
crucible: <tl>crucible</tl>
bellows: <tl>bellows</tl>
charcoal: <m>charcoal</m>
founders: <pro>founders</pro>
```
### Testing
Let's try a few easy words with the `Davinci-codex` model, such as *Apothecary*, *smoke*, *glassmakers*, *latten*, and *snake*. The results are immediate and flawless:

```xml
<!--Output-->
Apothecary: <pro>Apothecary</pro>
smoke: <m>smoke<m>
glassmakers: <pro>glassmakers</pro>
latten: <m>latten</m>
snake: <al>snake</al>
```

A harder test implies the use of compound words, such as *copper plates*, *walnut oil*, and *wood block*. The goal of such a test is to see whether GPT-3 properly handles nested tags. 

```xml
<!--Output-->
copper plates: <m>copper plates</m>
walnut oil: <m><pa>walnut</pa> oil</m>
wood block: <m>wood block</m>
```

Yet the results are mixed, since `Davinci-codex` only labeled *walnut oil* correctly, failing to detect the `tl` and `m` nested tags in *copper plates* and *wood block*. However, as the next test shows below, these errors can be mitigated with a better training prompt. After adding five more examples of nested tags, `Davinci-codex` returned almost flawless result with only one mistake (*oil paintbrushes*):

```xml
<!--Output-->
cannon powder: <m><wp>cannon</wp> powder</m>
arquebus powder: <m><wp>arquebus</wp> powder</m>
oil paintbrushes: <m><al>oil</al> paintbrushes</m>
sheep footbones: <m><al>sheep</al> footbones</m>
bronze mortar: <tl><m>bronze</m> mortar</tl>
```

# Conclusion
It is important to remember that these tests were made using small text fragments. I suspect that by providing more context in the examples and in the prompt, GPT-3 models would yield even better results. Moreover, fine-tuning the model with ad-hoc training datasets would no-doubt further improve labeling accuracy.  
If these experiments would still need to be conducted at a larger scale to demonstrate the reliability of pre-trained language models, we can nonetheless conclude that {{< hl >}}this approach enables editors to automate several annotation tasks in a few easy steps, potentially saving vast amounts of time and money in the process.{{< /hl >}}