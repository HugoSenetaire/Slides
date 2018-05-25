from tex2py import *
import json

def tex2json(doc):
    #NOUVELLE VERSION 100% INDEPENDANTE

    with open(doc) as f:
        data=f.read().replace("\n","<br>").replace("\\noindent","").replace("noindent","")
        # data=f.read()


    ind=data.find("\\title{")
    if ind>-1:
        title=data[ind+7:ind+data[ind:].index("}")]
    else:
        title="document"
    splitted_data=data.split("\section{")
    abstract=data.find('\\begin{abstract}')>-1
    if abstract:
        splitted_data[0]=splitted_data[0][data.find('\\begin{abstract}')+17:].replace("\\end{abstract}","")
    else:
        #si il y a pas d'abstract on supprime tous les include avant
        del splitted_data[0]

    for i in range (int(abstract),len(splitted_data)):
        splitted_data[i]=splitted_data[i].split("\subsection{")
        for j in range (1,len(splitted_data[i])):
            splitted_data[i][j]=splitted_data[i][j].split("\subsubsection{")

    #abstract est un booleen qui précise s'il y a un un abstract dans le doc
    def serialiseur_doc(splitted_data,abstract):
        if abstract:
            dic_abstract=serialiseur_abstract(splitted_data[0])
            dic_sections=[dic_abstract]+list(map(serialiseur_section,splitted_data[1:]))
        else:
            dic_sections=list(map(serialiseur_section,splitted_data))
        return {"title": title, "sections" : dic_sections}

    def serialiseur_abstract(abstract):
        return {"title":"Abstract", "text":abstract}

    def serialiseur_section(section):
        # calcul du titre
        if(isinstance(section,list)):
            ind_fin_titre=section[0].find("}")
            titre=section[0][:ind_fin_titre]
            texte=section[0][ind_fin_titre+1:]
    #     calcul du dictionnaire des sous parties
            dic_subsections=list(map(serialiseur_subsection,section[1:]))
        else:
            ind_fin_titre=section.find("}")
            titre=section[:ind_fin_titre]
            dic_subsections=[]
            texte=section[ind_fin_titre+1:]
        return { "title": titre, "text":texte, "sub_sections":dic_subsections}

    def serialiseur_subsection(subsection):
        #calcul du titre
        if(isinstance(subsection,list)):
            ind_fin_titre=subsection[0].find("}")
            titre=subsection[0][:ind_fin_titre]
            texte=subsection[0][ind_fin_titre+1:]
            #calcul du dictionnaire des sous_sous_parties
            dic_subsubsections=list(map(serialiseur_subsubsection,subsection[1:]))
        else:
            ind_fin_titre=subsection.find("}")
            titre=subsection[:ind_fin_titre]

            #calcul du dictionnaire des sous_sous_parties
            dic_subsubsections=[]
            texte=subsection[ind_fin_titre+1:]

        return {"title":titre, "text":texte,"sub_sub_sections":dic_subsubsections }

    def serialiseur_subsubsection(subsubsection):
        #calcul du titre
        ind_fin_titre=subsubsection.find("}")
        titre=subsubsection[:ind_fin_titre]

        return {"title":titre,"text":subsubsection[ind_fin_titre+1:]}






    with open('test_output.json','w',encoding='utf-8') as f:
        # json.dump(serialiseur_perso(tree),f,indent=4)
        json.dump(serialiseur_doc(splitted_data,data.find("\\begin{abstract}")>-1),f,indent=4)



    return json.dumps(serialiseur_doc(splitted_data,data.find("\\begin{abstract}")>-1))











    # ANCIENNE VERSION UTILISANT TEX2PY
    # with open(doc) as f:
    #     data=f.read().replace("\n","<br>")
    #     data=data.replace("\end{document}","\section{Trash} <br> \end{document}")
    # # print(doc)
    # # print(data)
    # # data=doc.read().replace("\n","<br>")
    # # data=data.replace("\end{document}","\section{Poubelle} <br> \end{document}")
    # tree=tex2py(data)
    #
    # def serialiseur_perso(obj):
    #     # print(obj.depth,obj,type(obj))
    #     if isinstance(obj,TreeOfContents):
    #         if obj.depth==0:
    #             #
    #             return {"title_latex":obj.name,"sections":list(map(serialiseur_perso,list(filter(lambda x: x.name!="Trash",list(obj.sections)))))}
    #         if obj.depth==1:
    #             if len(obj.descendants)>1:
    #                 return {"title":obj.name,"text":obj.descendants[0] if isinstance(obj.descendants[0],str) else "","sub_sections":list(map(serialiseur_perso,list(obj.subsections)))}
    #             else:
    #                 return {"title":obj.name,"text":obj.descendants[0] if isinstance(obj.descendants,str) else "","sub_sub_sections":[],"text":obj.descendants[0]}
    #         if obj.depth==2:
    #             if len(obj.descendants)>1:
    #                 return {"title":obj.name,"text":obj.descendants[0] if isinstance(obj.descendants[0],str) else "","sub_sub_sections":list(map(serialiseur_perso,list(obj.subsubsections)))}
    #             else:
    #                 return {"title":obj.name,"text":obj.descendants[0] if isinstance(obj.descendants[0],str) else "","sub_sub_sections":[],"text":obj.descendants[0]}
    #         if obj.depth==3:
    #             return {"title":obj.name,"text":obj.descendants[0]}
    #     raise TypeError(repr(obj) + " cannot be serialized !")
    #
    # # with open('Test.json','w',encoding='utf-8') as f:
    # #     return json.dump(serialiseur_perso(tree),f,indent=4)
    #
    # return json.dumps(serialiseur_perso(tree))

if __name__ == '__main__':
    print(tex2json('/home/lou/enpc/Slides/src/uploaded_media/test.tex'))
