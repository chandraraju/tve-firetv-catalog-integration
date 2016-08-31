var XMLWriter = require('xml-writer');
var XMLParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;

var serializer = new XMLSerializer();
var locale = 'en-US';
var worksElement = 'Works';

var xmlUtil = {

    getLocaleAttribute: function(currentXW){
        currentXW.writeAttribute('locale', locale);
    },

    getTitleElement: function(currentXW, titletext){
        currentXW.startElement('Title');
        this.getLocaleAttribute(currentXW);
        currentXW.text(titletext);
        currentXW.endElement();
    },

    getIDElement: function(currentXW, idtext){
        xw.startElement('ID');
        xw.text(idtext);
        xw.endElement();
    },

    getFreeOfferElements: function(currentXW){
        currentXW.startElement('Offers').startElement('FreeOffer').startElement('Regions').startElement('Country').text('US')
            .endElement().endElement().endElement().endElement();
    },

    getShortDescriptionElement: function(currentXW, stext){
        currentXW.startElement('ShortDescription');
        this.getLocaleAttribute(currentXW);
        currentXW.text(stext);
        currentXW.endElement();
    },

    getSynposisElement: function(currentXW, stext){
        currentXW.startElement('Synopsis');
        this.getLocaleAttribute(currentXW);
        currentXW.text(stext);
        currentXW.endElement();
    },

    getImageUrlElement: function(currentXW, imgtext){
        currentXW.startElement('ImageUrl');
        currentXW.text(imgtext);
        currentXW.endElement();
    },

    getShowIDElement: function(currentXW, idtext){
        currentXW.startElement('ShowID');
        currentXW.text(idtext);
        currentXW.endElement();
    },

    getSeasonIDElement: function(currentXW, idtext, seasonnumber){
        currentXW.startElement('SeasonID');
        currentXW.text(idtext + '-SS' + seasonnumber);
        currentXW.endElement();
    },

    getEpisodeInSeasonElement: function(currentXW, numtext){
        currentXW.startElement('EpisodeInSeason');
        currentXW.text(numtext);
        currentXW.endElement();
    },

    getSeasonInShowElement: function(currentXW, numtext){
        currentXW.startElement('SeasonInShow');
        currentXW.text(numtext);
        currentXW.endElement();
    },

    getWorksElement: function(xmlparent, xmlchild){
        var xmldoc = new XMLParser().parseFromString(xmlparent);
        var works = xmldoc.getElementsByTagName('Works')[0];
        var xmltvshows = new XMLParser().parseFromString(xmlchild);
        works.appendChild(xmltvshows);
        return serializer.serializeToString(xmldoc);
    },

    appendToWorks: function(worksxml, programsxml){
        var xmldatafile =   this.getWorksElement(worksxml, programsxml);
        return xmldatafile;
    },

    createTvEpisodeXML: function(video, program){
        xw = new XMLWriter();
        xw.startElement('TvEpisode');
        this.getIDElement(xw, video.id);
        this.getTitleElement(xw, video.title);
        this.getFreeOfferElements(xw);
        this.getShortDescriptionElement(xw, video.description);
        this.getImageUrlElement(xw, video.hdposterurl);
        this.getShowIDElement(xw, program.id);
        this.getSeasonIDElement(xw, program.id, video.seasonNumber);
        this.getEpisodeInSeasonElement(xw, video.episodeNumber);
        xw.endElement();

        return xw.toString();
        //console.dir(xw.toString());
    },

    createTvSeasonXML: function(module, program){
        xw = new XMLWriter();
        xw.startElement('TvSeason');
        this.getIDElement(xw, program.id + '-SS' + module.data[0].seasonNumber);
        this.getTitleElement(xw, module.title);
        this.getFreeOfferElements(xw);
        this.getShortDescriptionElement(xw, module.data[0].description);
        this.getImageUrlElement(xw, module.data[0].hdposterurl);
        this.getShowIDElement(xw, program.id);
        this.getSeasonInShowElement(xw, module.data[0].seasonNumber);
        xw.endElement();

        return xw.toString();
        //console.dir(xw.toString());
    },

    createTvShowXML: function(program){
        xw = new XMLWriter();
        xw.startElement('TvShow');
        this.getIDElement(xw, program.id);
        this.getTitleElement(xw, program.title);
        this.getFreeOfferElements(xw);
        this.getShortDescriptionElement(xw, program.description);
        //this.getSynposisElement(xw, program.description);
        this.getImageUrlElement(xw, program.hdposterurl);
        xw.endElement();

        return xw.toString();
        //console.dir(xw.toString());
    },

    createTvWorksXML: function(programsxml){
        xw = new XMLWriter();
        xw.startDocument('1.0','UTF-8');
        xw.startElement('Catalog');
        xw.writeAttribute('xmlns', 'http://www.amazon.com/FireTv/2014-04-11/ingestion');
        xw.writeAttribute('version', 'FireTv-v1.3');
        xw.startElement('Partner');
        xw.text('NBCUP_N')
        xw.endElement();
        xw.startElement('Works');
        xw.endElement();
        xw.endDocument();

        return xw.toString();
    }

};


module.exports = xmlUtil;
