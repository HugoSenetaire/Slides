from tex2py import *
import json

def tex2json(doc):
    with open(doc) as f:
        data=f.read().replace("\n","<br>")
        data=data.replace("\end{document}","\section{Poubelle} <br> \end{document}")
    # print(doc)
    # print(data)
    # data=doc.read().replace("\n","<br>")
    # data=data.replace("\end{document}","\section{Poubelle} <br> \end{document}")
    tree=tex2py(data)

    def serialiseur_perso(obj):
        # print(obj.depth,obj,type(obj))
        if isinstance(obj,TreeOfContents):
            if obj.depth==0:
                #
                return {"titre_latex":obj.name,"sections":list(map(serialiseur_perso,list(filter(lambda x: x.name!="Poubelle",list(obj.sections)))))}
            if obj.depth==1:
                if len(obj.descendants)>1:
                    return {"titre":obj.name,"texte":obj.descendants[0] if isinstance(obj.descendants[0],str) else "","sous_parties":list(map(serialiseur_perso,list(obj.subsections)))}
                else:
                    return {"titre":obj.name,"texte":obj.descendants[0] if isinstance(obj.descendants,str) else "","sous_sous_parties":[],"texte":obj.descendants[0]}
            if obj.depth==2:
                if len(obj.descendants)>1:
                    return {"titre":obj.name,"texte":obj.descendants[0] if isinstance(obj.descendants[0],str) else "","sous_sous_parties":list(map(serialiseur_perso,list(obj.subsubsections)))}
                else:
                    return {"titre":obj.name,"texte":obj.descendants[0] if isinstance(obj.descendants[0],str) else "","sous_sous_parties":[],"texte":obj.descendants[0]}
            if obj.depth==3:
                return {"titre":obj.name,"texte":obj.descendants[0]}
        raise TypeError(repr(obj) + " n'est pas sérialisable !")

    # with open('Test.json','w',encoding='utf-8') as f:
    #     return json.dump(serialiseur_perso(tree),f,indent=4)

    return json.dumps(serialiseur_perso(tree))

if __name__ == '__main__':
    print(tex2json('/home/lou/Slides/src/uploaded_media/test.tex'))
