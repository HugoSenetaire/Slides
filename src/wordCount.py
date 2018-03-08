from lxml import etree
from string import Template

def wordCount(filePath):

    file = etree.parse(filePath)

    balise = []

    for title in file.xpath("/user/diapo/title"):
        balise.append(title.text)

    for title in file.xpath("/user/diapo/subtitle"):
        balise.append(title.text)

    for title in file.xpath("/user/diapo/paragraph"):
        balise.append(title.text)

    for title in file.xpath("/user/diapo/bullet"):
        balise.append(title.text)

    fragmented = []





    for i, sentence in enumerate(balise):
        balise[i] = sentence.lower()
        balise[i] = balise[i].replace("\'", " ").replace("\"", " ").replace(":", " ").replace(";", " ")   #On garde délibérément les ".", "!", "?" etc pour pouvoir analyser leur utilisation                                                                                  #au même titre que les mots
        fragmented += balise[i].split()

    #print(balise)       #Balise est le tableau rempli avec le contenu de toutes les balises contenant du texte
    #print(fragmented)   #Fragmented est le tableau contenant tous les mots du power point, en lower case


    dictionary = {}
    for word in fragmented:
        if (word in dictionary):
            dictionary[word]+=1
        else:
            dictionary[word]=1


    #print(dictionary)   #Dictionnary contient tous les mots et points de ponctuation du power point avec leur nombre d'apparition
    return dictionary