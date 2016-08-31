var metadata = require('../controller/serviceController.js');
var query = require('array-query');
var XMLWriter = require('xml-writer');
var xmlutil = require('../utils/xmlUtil');
var fileUtil = require('../utils/fileUtil');

//global variables
var xw; //xmlwriter variable
var worksXML = "";
var programsXML = "";
var videosXML = "";
var seasonsXML = "";

var programsArray = [];

function processPrograms(programsResponse){
    var xmlfile = "";

    var programsJSON = JSON.parse(programsResponse);
    var moduleArray = programsJSON.modules;
    var programsModule = query('alias').equals('grid').on(moduleArray);

    if (programsModule.length > 0){
        for (m = 0; m < programsModule.length; m++){
            programsArray = programsArray.concat(programsModule[m].data);
        }
    }

    console.dir(programsArray.length);
    if (programsArray.length > 0){
        for (prg = 0; prg < programsArray.length; prg++){
            programsXML =  programsXML + xmlutil.createTvShowXML(programsArray[prg]);
        }
    }


}

function processVideos(videoResponse,program){
    var videosArray = [];

    var videosJSON = JSON.parse(videoResponse);
    var moduleArray = videosJSON.modules;
    var videosModule = query('alias').equals('season').on(moduleArray);

    //console.dir(videosModule.length);
    if (videosModule.length > 0){
        for (v = 0; v < videosModule.length; v++){
            videosArray = videosArray.concat(videosModule[v].data);
            if (videosModule[v].data.length > 0){
                seasonsXML = seasonsXML + xmlutil.createTvSeasonXML(videosModule[v],program);
            }
        }
    }
    //console.dir(videosArray.length);
    if(videosArray.length > 0){
        for (e = 0; e < videosArray.length; e++){
            videosXML = videosXML + xmlutil.createTvEpisodeXML(videosArray[e], program);
        }
    }
}

function createWriteCatalogXML(){
    worksXML = xmlutil.createTvWorksXML(programsXML);

    //append programs xml to works
    xmlfile = xmlutil.appendToWorks(worksXML, programsXML);

    //append seasons xml to works
    if (seasonsXML.length > 1) {
        xmlfile = xmlutil.appendToWorks(xmlfile, seasonsXML);
    }

    //append videos xml to works
    if (videosXML.length > 1){
        xmlfile = xmlutil.appendToWorks(xmlfile, videosXML);
    }

    fileUtil.writeToFile(xmlfile);

}

metadata.programsRequest().then(function(response){
    console.log(response.body);
    processPrograms(response.body);

    var videoResponseCount = 0;
    //videos request
    if (programsArray.length > 0){
        for (prg = 0; prg < programsArray.length; prg++){
            metadata.videosRequest(programsArray[prg]).then(function(result){
                processVideos(result.response.body,result.program);
                videoResponseCount = videoResponseCount + 1;
                console.dir(videoResponseCount);
                //check and call the final method, after the responses are processed
                if (videoResponseCount == programsArray.length){
                    console.dir("finalize method call");
                    createWriteCatalogXML();
                }
            });
        }
    }
});


console.log("test");