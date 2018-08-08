// combine files into nest
#target photoshop
// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
$.level = 0;
//debugger; // launch debugger on next line
// on localized builds we pull the $$$/Strings from a .dat file, see documentation for more details
$.localize = true;

var gScriptResult;

var inputPaths =  Folder.selectDialog( 'select folder' );

var samplesFolder = new Folder(inputPaths);

//Get the files
var fileList = samplesFolder.getFiles();

var doc_1, doc_2;

var doc_0 = app.activeDocument;

//loop

var count = 0;

var Suffix = '';

var saveFile;

try {
  Path = app.activeDocument.path;
} catch (e) {
  Path = app.recentFiles[0];
}

var Name = 'Nest_top_nr_';

var opened_docs = [];
var doc_name = '';
var text_l = '';
var new_text;

//red color
var red_color_obj = new CMYKColor();

  red_color_obj.cyan = 0;  red_color_obj.magenta  = 100;
  red_color_obj.yellow = 100;  red_color_obj.black = 0;


//files count must be even !!
for (var i = 0; i < fileList.length; i = i + 2) {

  doc_0 = app.activeDocument;

      for (var j = 0; j < 2; j++) {

          doc_1 = open(fileList[i+j]);

          if (doc_1.width < doc_1.height) {
              doc_1.rotateCanvas(90);
            }

          doc_name = doc_1.name.toString();

          doc_1.flatten();
          doc_1.selection.selectAll();
          doc_1.selection.copy();
          doc_1.close(SaveOptions.DONOTSAVECHANGES);

          doc_0 = app.activeDocument;
          doc_0.paste();

          new_text = doc_0.artLayers.add();

          new_text.kind = LayerKind.TEXT;

          new_text.textItem.size='12 pt';

          new_text.textItem.color.cmyk = red_color_obj;
          new_text.textItem.contents = doc_name;
          new_text.name= '0' + j;

      }

    app.doAction("nest","Chime_top_nest.ATN");

    count = count + 1;

    Suffix = count;
    saveFile = File(Path + "/" + Name + "_" + Suffix + '.tif');
    SaveTIFF(saveFile);
}


function SaveTIFF(saveFile){
tiffSaveOptions = new TiffSaveOptions();
tiffSaveOptions.embedColorProfile = true;
tiffSaveOptions.alphaChannels = true;
tiffSaveOptions.layers = true;
tiffSaveOptions.imageCompression = TIFFEncoding.TIFFLZW;
activeDocument.saveAs(saveFile, tiffSaveOptions, true, Extension.LOWERCASE);
}
