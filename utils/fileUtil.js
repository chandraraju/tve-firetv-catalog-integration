var fs = require('fs');

var global_FilePath = "./data/catalog-usanow.xml";

var fileUtil = {

    writeToFile: function(xmldata){

        var entityfile = global_FilePath;
        console.dir(entityfile);

        var entityStream = fs.createWriteStream(entityfile);
        entityStream.on('finish', function () {
            console.log('file has been written');
            //if (!global_Continue){
            //    global_Continue = true;
            //    generateAppData('mobile');
            //}
        });
        entityStream.write(xmldata);
        entityStream.close();
        entityStream.end();
    }
}

module.exports = fileUtil;
