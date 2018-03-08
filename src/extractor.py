# il faudrait charger les images aussi
# probleme avec les sauts a la ligne + mise en page ppt

from lxml import etree
from itertools import groupby
from win32com import client


def dataCut(datapath):
    word = client.Dispatch("Word.Application")
    word.Visible = False
    doc = word.Documents.Open(datapath)
    styles_list = []
    words_list = []
    for heading, grp_wrds in groupby(doc.Words, key=lambda x: str(x.Style)):
        # List of the succesive style of text
        styles_list += [heading]
        # List of the words grouped by style
        words_list += [''.join(str(word) for word in grp_wrds)]
    return (styles_list, words_list)


# Generation of the XML for a "Title + Subtitle" text
def generateXMLSubtitle(presentation, slide, words_list):
    slide.set("layout", "title+subtitle")
    presentation.append(etree.SubElement(slide, "title"))
    presentation[-1].text = (words_list[0]).replace("\r", " ")
    presentation.append(etree.SubElement(slide, "subtitle"))
    presentation[-1].text = (words_list[1]).replace("\r", " ")


# Generation of the XML for a "Title" text
def generateXMLTitle(presentation, slide, words_list):
    slide.set("layout", "title")
    presentation.append(etree.SubElement(slide, "title"))
    presentation[-1].text = (words_list[0]).replace("\r", " ")


# Generation of the XML for a "Normal" text
def generateXMLNormal(presentation, slide, words_list, ind, i):
    slide.set("layout", "title+paragraph")
    presentation.append(etree.SubElement(slide, "title"))
    presentation[-1].text = (words_list[ind]).replace("\r", " ")
    presentation.append(etree.SubElement(slide, "paragraph"))
    presentation[-1].text = (words_list[i])


# Generation of the XML for a "List Pragraph" text
def generateXMLBullets(presentation, slide, words_list, ind, i):
    slide.set("layout", "title+bullets")
    presentation.append(etree.SubElement(slide, "title"))
    presentation[-1].text = (words_list[ind]).replace("\r", "")
    listbullets = words_list[i].split("\r")
    for j in listbullets:
        if j != "":
            presentation.append(etree.SubElement(slide, "bullet"))
            presentation[-1].set("level", "0")
            presentation[-1].text = j
            

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


def xmlGeneration(datapath, output):
    # Gathering the data
    styles_list, words_list = dataCut(datapath)

    # Preparation of the xml file
    user = etree.Element("user")
    done = False

    # List that will stock the different XML tags
    presentation = []
    presentation.append(etree.SubElement(user, "diapo"))
    ind = 0  # this variable will follow our progression on the word file

    # Generation of the first slide. 2 possibilities : "Title" or "Title+Subtitle" slide
    slide = presentation[0]
    if styles_list[1] == "Subtitle":
        generateXMLSubtitle(presentation, slide, words_list)
        ind = 2
    else:
        generateXMLTitle(presentation, slide, words_list)
        ind = 1

    #
    while (not done):
        # Check if we reached the last heading
        done = not ("Heading 1" in styles_list[ind + 1:])

        # Calculate the amount of slides for this heading
        if (not done):
            final_ind = ind + 1 + styles_list[ind + 1:].index('Heading 1')
        else:
            final_ind = len(styles_list)

        # Iterate on the slide under this Heading
        for i in range(ind + 1, final_ind):
            presentation.append(etree.SubElement(user, "diapo"))
            slide = presentation[-1]
            if (styles_list[i] == "Normal"):
                generateXMLNormal(presentation, slide, words_list, ind, i)
            elif (styles_list[i] == "List Paragraph"):
                generateXMLBullets(presentation, slide, words_list, ind, i)
            elif(styles_list[i]=="Subtle Emphasis"):
                generateXMLImage(presentation,slide,words_list,ind,i)
            elif(styles_list[i]=="Strong"):
                generateXMLFigure(presentation,slide,words_list,ind,i)
        ind = final_ind

    # Save file
    filename = output
    with open(filename, 'wb') as f:
        f.write(etree.tostring(user))
