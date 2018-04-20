from lxml import etree
from itertools import groupby
from win32com import client

number = ["1","2","3","4","5","6","7","8","9"]
symbol = ["-", "*","."," "]

titreTr=["Title","Titre"]
titre1Tr=["Heading 1","Titre 1"]
titre2Tr=["Heading 2","Titre 2"]
titre3Tr=["Heading 3", "Titre 2"]
Possibletitre= titreTr + titre1Tr + titre2Tr +titre3Tr
soustitreTr=["Subtitle", "Sous-titre"]
normalTr=["Normal", "Normal"]
paraTr=["List Paragraph", "Paragraphe de liste"]
emphaseTr=["Subtle Emphasis", "Emphase pâle"]
figureTr = ["Strong", "Elevé"]


def getTitleLevel(separateWords) :
    found = False

    if separateWords[0] not in number :
        return 0
    level = 1;
    while not found :
        if separateWords[2*level-1] in symbol and separateWords[2*level] in number :
            level+=1
        else :
            found = True
    return level

def dataCutPlus(datapath):
    #Gestion de la fin ? Problème d'un esapce considéré comme titre
    
    doc = open(datapath,"r")
    text = doc.read()
    
    
    styles_list=[]
    words_list=text.split("\n")
    for words in words_list :
        separate_words = words.split(" ")
        level = getTitleLevel(separate_words)
        if level > 0 :
            styles_list.append("Titre " + str(level)) #Titre de sous partie
        else :
            if len(separate_words) < 10 :
                styles_list.append("Titre") #Titre générale de la présentation
            else :
                styles_list.append("Normal")
    doc.close()
    return(styles_list,words_list)
    
    
def dataCut(datapath):
    word=client.Dispatch("Word.Application")
    word.Visible=False
    doc=word.Documents.Open(datapath)
    styles_list=[]
    words_list=[]
    for heading, grp_wrds in groupby(doc.Words, key=lambda x: str(x.Style)):
        #List of the succesive style of text
        styles_list+=[heading]
        #List of the words grouped by style
        words_list+=[''.join(str(word) for word in grp_wrds)]
    return(styles_list,words_list)
    
# ici on se limite à une seule page de garde (toujours au début)
#Generation of the XML for a "Title + Subtitle" text
def generateXMLSubtitle(presentation,slide,words_list): 
    slide.set("layout","title+subtitle")
    presentation.append(etree.SubElement(slide, "title"))
    presentation[-1].text=(words_list[0]).replace("\r"," ")
    presentation.append(etree.SubElement(slide,"subtitle"))
    presentation[-1].text=(words_list[1]).replace("\r"," ")
    

#Generation of the XML for a "Title" text
def generateXMLTitle(presentation,slide,words_list):
    slide.set("layout","title")
    presentation.append(etree.SubElement(slide, "title"))
    presentation[-1].text=(words_list[0]).replace("\r"," ")
    
    
#Generation of the XML for a "Normal" text
def generateXMLNormal(presentation,slide,words_list,ind,i):
    slide.set("layout","title+paragraph")
    presentation.append(etree.SubElement(slide, "title"))
    presentation[-1].text=(words_list[ind]).replace("\r"," ")
    presentation.append(etree.SubElement(slide,"paragraph"))
    listparagraphs=words_list[i].split("\r") #Séparation des paragraphes vis à vis retour ligne 
    presentation[-1].text=listparagraphs[0]
    paragraph=presentation[-1]
    for j in listparagraphs[1:-1]:
        presentation.append(etree.SubElement(paragraph,"br")) # \br balise isolée (pas de fin) signal de retour chariot
        presentation[-1].tail=j #A utiliser pour ajouter après la balise \br
    
    
#Generation of the XML for a "List Pragraph" text
def generateXMLBullets(presentation,slide,words_list,ind,i): 
    slide.set("layout","title+bullets")
    presentation.append(etree.SubElement(slide, "title"))
    presentation[-1].text=(words_list[ind]).replace("\r","")
    listbullets=words_list[i].split("\r")
    for j in listbullets:
        if j!="":
            presentation.append(etree.SubElement(slide,"bullet"))
            presentation[-1].set("level","0") #On recrée une balise ou on précise le niveau de la bullet (gérer plus de niveau de bullet)
            presentation[-1].text=j


#Generation of the XML for an image ("Subtle emphasis" text)
def generateXMLImage(presentation,slide,words_list,ind,i):
    slide.set("layout","title+paragraph+image")
    presentation.append(etree.SubElement(slide, "title"))
    presentation[-1].text=(words_list[ind]).replace("\r","")
    presentation.append(etree.SubElement(slide,"image"))
    presentation[-1].text=(words_list[i].replace("\r",""))


#Generation of the XML for a figure ("Strong" text)
def generateXMLFigure(presentation,slide,words_list,ind,i):
    if ":" in words_list[i]:
        slide.set("layout","title+figure+label")
        presentation.append(etree.SubElement(slide, "title"))
        presentation[-1].text=(words_list[ind]).replace("\r","")
        textSplit=words_list[i].split(":")
        presentation.append(etree.SubElement(slide,"figure"))
        presentation[-1].text=(textSplit[0].replace("\r",""))
        presentation.append(etree.SubElement(slide,"label"))
        presentation[-1].text=(textSplit[1].replace("\r",""))
    else:
        slide.set("layout","title+figure")
        presentation.append(etree.SubElement(slide, "title"))
        presentation[-1].text=(words_list[ind]).replace("\r","")
        presentation.append(etree.SubElement(slide,"figure"))
        presentation[-1].text=(words_list[i].replace("\r",""))  


#Generation of the XML for a graph (tableau ?)
def generateXMLgraph(presentation,slide,words_list,ind,i):
    

def xmlGeneration(datapath,output):
    language = 1
    #Gathering the data
    styles_list,words_list=dataCut(datapath)
    
    #Preparation of the xml file
    user = etree.Element("user")
    done=False
    
    #List that will stock the different XML tags
    presentation=[]
    presentation.append(etree.SubElement(user, "diapo"))
    ind=0 #this variable will follow our progression on the word file
    
    #Generation of the first slide. 2 possibilities : "Title" or "Title+Subtitle" slide
    slide=presentation[0]
    if styles_list[1]==soustitreTr[language]: 
        generateXMLSubtitle(presentation,slide,words_list)
        ind=2
    else:
        generateXMLTitle(presentation,slide,words_list)
        ind=1
    
    #
    while(not done):
        #Check if we reached the last heading
        done=not (Possibletitre[language] in styles_list[ind+1:])
        
        #Calculate the amount of slides for this heading
        if(not done):
            final_ind=ind+1+styles_list[ind+1:].index(titre1Tr[language])
        else:
            final_ind=len(styles_list)
        
        #Iterate on the slide under this Heading
        for i in range(ind+1,final_ind):
            presentation.append(etree.SubElement(user,"diapo"))
            slide=presentation[-1]
            if(styles_list[i]==normalTr[language]):
                generateXMLNormal(presentation,slide,words_list,ind,i)
                
            elif(styles_list[i]==paraTr[language]):
                generateXMLBullets(presentation,slide,words_list,ind,i)
            elif(styles_list[i]==emphaseTr[language]):
                generateXMLImage(presentation,slide,words_list,ind,i)
            elif(styles_list[i]==figureTr[language]):
                generateXMLFigure(presentation,slide,words_list,ind,i)
        ind=final_ind
    
    #Save file
    filename=output
    with open(filename,'wb') as f:
        f.write(etree.tostring(user))