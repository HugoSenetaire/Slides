import json
from pprint import pprint

def jsonToBeamer(inputFile,outputFile):
    beamerText="\\documentclass{beamer} \n\\usetheme{default}\n"
    # with open(inputFile) as f:
    #     data=json.load(f)
    data = inputFile
    beamerText+="\\title{{ {} }} \n\n\\subject{{ }} \n\n \\AtBeginSubsection[] \n {{ \n \\begin{{frame}}<beamer>{{Outline}} \n    \\tableofcontents[currentsection,currentsubsection] \n \\end{{frame}} \n }} \n\n".format(data["title"])
    beamerText+="\\begin{document} \n\n \n \\begin{frame} \n   \\titlepage \n \\end{frame} \n \n \\begin{frame}{Outline} \n \\tableofcontents \n \\end{frame} \n\n"
    for i in range(len(data["sections"])):
        currentSection=data["sections"][i]
        beamerText+="\\section{{ {} }} \n".format(currentSection["title"])
        if len(currentSection["text"])>0:
            beamerText+="\\begin{{frame}}{{ {} }}{{}} \n".format(currentSection["title"])
            beamerText+="   \\begin{itemize} \n"
            for j in range(len(currentSection["text"])):
                beamerText+="      \\item {{ \n         {} \n      }} \n".format(currentSection["text"][j])
            beamerText+="   \\end{itemize} \n \\end{frame}\n\n"
        for j in range(len(currentSection["sub_sections"])):
            currentSubSection=currentSection["sub_sections"][j]
            beamerText+="\\subsection{{{}}} \n\n\\begin{{frame}}{{{}}}{{}}\n".format(currentSubSection["title"],currentSubSection["title"])
            if len(currentSubSection["text"])>0:
                beamerText+="   \\begin{itemize} \n"
                for j in range(len(currentSubSection["text"])):
                    beamerText+="      \\item {{ \n         {} \n      }} \n".format(currentSubSection["text"][j])
                beamerText+="   \\end{itemize} \n \\end{frame}\n\n"
            if len(currentSubSection["sub_sub_sections"])>0:
                for k in range(len(currentSubSection["sub_sub_sections"])):
                    currentSubSubSection=currentSubSection["sub_sub_sections"][k]
                    beamerText+="\\subsubsection{{{}}} \n\n\\begin{{frame}}{{{}}}{{}}\n".format(currentSubSubSection["title"],currentSubSubSection["title"])
                    if len(currentSubSubSection["text"])>0:
                        beamerText+="   \\begin{itemize} \n"
                        for j in range(len(currentSubSection["text"])):
                            beamerText+="      \\item {{ \n         {}\n      }} \n".format(currentSubSubSection["text"][j])
                        beamerText+="   \\end{itemize} \n \\end{frame}\n\n"
    beamerText+="\\end{document}"
    with open(outputFile,"w") as o:
        o.write(beamerText)
    return beamerText
