from PyQt4.QtGui import *
from PyQt4.QtCore import *
import os


class MainWindow(QWidget):
    def __init__(self,args):
        #initialisation de la fenêtre
        QWidget.__init__(self,None)
        self.setWindowTitle("Générateur de slides")
        layoutMain=QGridLayout(self)
        
        tab=QTabWidget()

        #génération du premier onglet : Path
        pathTab=QWidget()
        layoutPathTab=QGridLayout(pathTab)
        
        #découpage en 3 parties : Input, Output, Generate
        
        part1=QGroupBox("Input")
        layoutPart1=QHBoxLayout(part1)
        
    
        

        self.inputPath=QLineEdit()
        self.inputPath.setText(os.getcwd())
        self.browseInput=QPushButton("Browse")
        
        
        layoutPart1.addWidget(QLabel("Input Path : "))
        layoutPart1.addWidget(self.inputPath)
        layoutPart1.addWidget(self.browseInput)
        
        # self.inputPath=QFileDialog()
        # self.inputPath.setViewMode(QFileDialog.Detail)
        # layoutPart1.addWidget(self.inputPath)
        
        
        part2=QGroupBox("Output")
        layoutPart2=QVBoxLayout(part2)
        self.outputPath=QFileDialog()
        layoutPart2.addWidget(self.outputPath)
        
        self.generateButton=QPushButton("Générer")
        
        layoutPathTab.addWidget(part1,0,0,1,5)
        layoutPathTab.addWidget(part2,2,0,1,5)
        
        
        
        #génération du second onglet
        optionsTab=QWidget()
        layoutOptionsTab=QGridLayout(optionsTab)
        self.generateImage=QCheckBox("Générer une image")
        self.useMask=QCheckBox("Utiliser un masque préexistant")
        self.wordCloud=QCheckBox("Générer un word cloud")
        
        layoutOptionsTab.addWidget(self.generateImage)
        layoutOptionsTab.addWidget(self.useMask)
        layoutOptionsTab.addWidget(self.wordCloud)
        
        
        
        
        
        
        #on rajoute les onglets
        tab.addTab(pathTab,"Chemins")
        tab.addTab(optionsTab,"Options")
        
        layoutMain.addWidget(tab,0,0,3,5)
        layoutMain.addWidget(self.generateButton,3,4)


        


if __name__ == "__main__" :
   app=QApplication(sys.argv)
   fenetre=MainWindow(sys.argv)
   fenetre.show()