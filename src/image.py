import urllib
from io import BytesIO
from PIL import Image

### WARNING adapt this constant to your computer and rechearch
name='test.jpg'
keyword='drink'  # 'drink%20alcool' #'drink+alcool'

def importImage(keyword,name):
    
    # extract source code of a page and transform it into a string
    page=urllib.request.urlopen('https://www.flickr.com/search/?text='+keyword)
    strpage=page.read()
    mystring=str(strpage)
    
    # find indices of the beginning to end of image url
    begin=mystring.find('img.src')
    begin=begin+12
    stop=mystring.find('jpg\\\'')
    stop=stop+3
    
    # save the image form its url under a certain name
    imageurl='http://' + mystring[begin:stop]
    print(imageurl)
    page =urllib.request.urlopen(imageurl)
    buffer = page.read()
    im = Image.open(BytesIO(buffer))
    im.save(name)

## exemple
if __name__ == "__main__":
    importImage(keyword,name)