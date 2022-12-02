---
# Documentation: https://wowchemy.com/docs/managing-content/

title: "A Perceptual Geography of the Levante"
subtitle: "What was the Levante associated with in 16th-century Florence?"
summary: "The Levante is an elusive toponym, as it is usually defined in relation with--or in opposition to--another territory. What was then Tuscany's Levante in the 16th century? The data that I gathered from the MIA database gives an unexpected answer."
authors: [Admin]
tags: [MAP, avviso]
categories: [Notes]
date: 2022-10-29T10:02:52-05:00
lastmod: 2022-10-29T10:02:52-05:00
featured: true
draft: false


# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: "Density Map of toponyms mentioned in ASFi MdP 4277 from 1543 to 1566"
  focal_point: ""
  preview_only: true

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: ["MAP"]
---

# Introduction
The *Levante* is an elusive place. Usually defined in relation with--or in opposition to--another territory, its meaning has rarely been stable, evoking different geographies according to the place and time the term was used. Yet if an objective and accurate definition of the term is hard to articulate, one can still hope to draw a subjective map of the region, using as a basis the correlations existing within a given corpus of texts. In other words, what space could the *Levante* evoke to a specific group of readers?  
In this post, I will show you how to use data from the Medici Archive Project's [MIA database](https://mia.medici.org/) 
to visualize the specific places with which the toponym was associated.  

# The MIA database
The MIA database is a collaborative platform for scholars who wish to upload and share their own photographs of archival material from the [State Archives of Florence](https://archiviodistatofirenze.cultura.gov.it/asfi/home). Over the past year, and under the patronage of the [National Endowment for the Humanities](https://www.neh.gov), our team has photographed, transcribed, synthesized, and classified thousands of documents stored in *avvisi* section of the *Mediceo del Principato* archive in Florence. While our database was not primarily intended for statistical analysis, the metadata we made available can be still downloaded and used as datasets. 

# The dataset
In this case, the dataset I created covers all the news from *Levante* from 1543 to 1566, that is to say, from the first avviso recorded in the archives to the year when Sultan [Suleyman I](https://en.wikipedia.org/wiki/Suleiman_the_Magnificent) dies. Here is a sample of the data I extracted from the server. Made of three columns, the data consist of a unique document number, a place name, and a date. 

```csv
57386 Malta / Europe / World / Top of the TGN hierarchy 1565-1-3
57386 Modon / Messinias, Nomos / Peloponnisos / Ellas 1565-1-3
57386 Al-Iskandariyah / Muhafazat al Iskandariyah / Egypt / Africa  1565-1-3
57386 Evvoia / Evvoias, Nomos / Sterea Ellas-Evvoia / Ellas 1565-1-3
57386 Venetian Republic / Italia / Europe / World 1565-1-3
57386 Arsenale / Istanbul / Istanbul / Marmara  1565-1-3
57386 Black Sea / Asia / World / Top of the TGN hierarchy 1565-1-3
57389 Otranto / Lecce / Puglia / Italia 1565-1-3
57389 Nisoi Aiyaiou / Ellas / Europe / World  1565-1-3
57389 Malta / Europe / World / Top of the TGN hierarchy 1565-1-3
57389 Buda / Budapest / Budapest / Magyarorszag 1565-1-3
57389 Al-Iskandariyah / Muhafazat al Iskandariyah / Egypt / Africa  1565-1-3
57389 Kipros / Asia / World / Top of the TGN hierarchy  1565-1-3
57389 Rodhos / Rodos, Nisos / Sporadhes / Nisoi Aiyaiou 1565-1-3
57389 Arsenale / Istanbul / Istanbul / Marmara  1565-1-3
57389 Çorlu / Thraki / Ellas / Europe 1565-1-3
```

## Cleaning up the data
To visualize this data, we need to make it readable as a csv (comma separated values) dataset. We also need to convert the geographic information included here to a more "machine-friendly" format: GPS coordinates. Because the dataset contains hundreds of entries, we would rather automate this process. This can be achieved fairly quickly and quite accurately using pre-trained language models such as [GPT-3](https://wwww.openai.org), [Bloom](https://huggingface.co/bigscience/bloom), or [AI-21](https://www.ai21.com), to name but a few. This operation needs to be closely supervised, however, as pre-trained language models have a slight tendency to hallucinate.


```csv
documentId,latitude,longitude,documentDate
57386,35.899167,14.514167,1565-1-3
57386,37.05,22.116667,1565-1-3
57386,31.200028,29.918719,1565-1-3
57386,38.366667,23.666667,1565-1-3
57386,45.438333,12.331333,1565-1-3
57386,41.018611,28.984444,1565-1-3
57386,42.7,18.8,1565-1-3
57389,40.216667,18.166667,1565-1-3
57389,37.966667,23.716667,1565-1-3
57389,35.899167,14.514167,1565-1-3
57389,47.4925,19.051389,1565-1-3
57389,31.200028,29.918719,1565-1-3
57389,34.916667,33.616667,1565-1-3
57389,36.405419,28.227778,1565-1-3
57389,41.018611,28.984444,1565-1-3
57389,41.133333,27.416667,1565-1-3
```

# The Density Map.
A density map is a type of visualization that highlights the frequency with which a place is mentioned in a given dataset. This is especially useful for understanding not just the geographic scope of one's data, but also its focal points. Which places on the map are more frequently mentioned? And which ones are more episodic? Where are the centers, and how far is the periphery? Where on the map is a reader's attention most likely to be focused? 


<iframe width='100%' height='600px' src="https://api.mapbox.com/styles/v1/clemclem/cl9q7c77p004y14mqytjrfnex.html?title=false&access_token=pk.eyJ1IjoiY2xlbWNsZW0iLCJhIjoiY2lmbGpvbjMwZjh3NnJ5bHg4ZzkzeWZzeCJ9.IgOF4fphVbsWAIKyzAV-DQ&zoomwheel=false#3.83/43.29/33.61" title="Levante" style="border:none;"></iframe>

For the sake of this experiment--and since I was in a rush--I used one of [Map Box's](https://www.mapbox.com) APIs. However, many visualization libraries and Geographic Information Systems allow you to produce the same kind of density map. 

# A Few Observations 
The result is more of an impressionistic tableau than the accurate representation of a clearly definable concept, and that's precisely what I like about this experiment. Indeed, while data science can be a powerful ally to the humanities, we don't necessarily have to abide by its rules.  

Another interesting aspect of this experiment, is that the map reveals a *Levante* that is completely integrated with the rest of Europe and the Mediterranean. It also highlights the centrality of Edirne in the political geography of the Ottoman Empire. Moreover, Spain's most relevant city in the map is neither Madrid nor the Escorial, but Naples. Last but not the least, Islands and small city-states such as Ragusa seem to have in important role mediating between the different powers of the region.  


# How to request data from MIA
Although MIA is an outstanding collaborative tool for researchers, the data it stores in its servers is not easily accessible. Its back-end, for example, is not published in public repositories. However, you can still obtain the data by registering to MIA and doing requests it to the server using python.

### Request
```python
url = "https://mia.medici.org/Mia/json/de/advancedsearch/advancedSearchResults/0/90/docYear/asc/?isNewsFeedSearch=False" 
payload = [{"searchSection":"archivalLocationSearch","type":"archivalLocationAdvancedSearch","isActiveFilter":True,"repository":None,"collection":"Mediceo del Principato","series":None,"volume":"2863","insert":None},{"searchSection":"categoryAndTypologySearch","type":"categoryAndTypologyAdvancedSearch","isActiveFilter":True,"category":"News","typology":None},{"searchSection":"transcriptionSearch","type":"transcriptionAdvancedSearch","isActiveFilter":False,"transcription":""},{"isActiveFilter":False,"searchSection":"synopsisSearch","type":"synopsisAdvancedSearch","synopsis":""},{"searchSection":"placesSearch","type":"placesAdvancedSearch","isActiveFilter":False,"places":[]},{"searchSection":"peopleSearch","type":"peopleAdvancedSearch","isActiveFilter":False,"people":[]},{"searchSection":"topicsSearch","type":"topicsAdvancedSearch","isActiveFilter":True,"topics":[{"topicTitle":"Place Index","topicId":"51","placeAllId":""}]},{"searchSection":"dateSearch","type":"dateAdvancedSearch","isActiveFilter":False,"dateFilterType":"","dateYear":"","dateMonth":"","dateDay":"","dateBYear":"","dateBMonth":"","dateBDay":""},{"searchSection":"documentOwnerSearch","type":"documentOwnerAdvancedSearch","isActiveFilter":False,"editType":"owner","account":""},{"searchSection":"languagesSearch","type":"languagesAdvancedSearch","isActiveFilter":False,"languages":[]}]
headers = {'Content-type': 'application/json', 'Accept': '*/*'}
r = requests.post(url, data=json.dumps(payload), headers=headers, auth=('LOGIN','PASSWORD'))
```
Make sure to replace LOGIN and PASSWORD with your own credentials.

### Write response to file
```python
with open('response.json', 'wb') as fd:
    for chunk in r.iter_content(chunk_size=128):
        fd.write(chunk)
```
### Open JSON
```python
f = open('response.json', encoding="utf8")
```
### Return JSON object as a dictionary
```python
json_complete = json.load(f)
```
### Select data from the JSON and print it in a CSV format
```python
with open('results.csv', 'w', newline='') as csvfile:
    fieldnames = ['documentId', 'placeCited', 'documentDate']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for i in json_complete['data']:
        if i['topics'] != None:
            for x in i['topics']:
                documentId=x['documentId']
                placeCited=x['topicPlaceName']
                year=i['date']['docYear']
                month=i['date']['docMonth']
                day=i['date']['docDay']
                documentDate=str(year)+ "-" + str(month)+"-" + str(day)
                writer.writerow({'documentId': documentId, 'placeCited': placeCited, 'documentDate': documentDate})
```

Once you have downloaded the `results.csv` file, you can proceed to cleanup the data as explained above. 