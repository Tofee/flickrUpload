var flickrUpload = {} || flickrUpload;

flickrUpload = (function () {

  //private variables
  var boundaryString = Math.floor(Math.random()*32768)+"asodijuuuuuuuu";
  var boundary1 = '--'+boundaryString;
  var boundary2 = '----'+boundaryString;
  var boundary3 = '----'+boundaryString+'--';

  // Create body to send
  function _createBody(oauth_keys, binary){
    var body = "";
    for( var key in oauth_keys){
      body +=_addOAuth(key, oauth_keys[key]);
    }
    body+=boundary2+'\r\n';
    body+='Content-Disposition: form-data; name="photo"; filename="a.jpeg"'+'\r\n'+'Content-Type: image/jpeg'+'\r\n'+  
    '\r\n'+
    binary+'\r\n'+
    boundary3+'\r\n';
    return body;
  }

  // Add OAuth parameters into body
  function _addOAuth(name, value) {
      var c = boundary2 + "\r\n"
      c += "Content-Disposition: form-data; name=\"" + name + "\"\r\n\r\n";
      c += value + "\r\n";
      return c;
  }

  // XHR Cross browser
  function _createHttpRequest(){
    var obj = null;
    try{ //Safari,Mozilla, Opera, IE 7〜
      obj = new XMLHttpRequest();
    }
    catch(e){
      try{ //IE6
        obj = new ActiveXObject("Msxml2.XMLHTTP");
      }
      catch(e){
        try{ //IE 5,5.5
          obj = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch(e){}
      }
    }
    return obj;
  }

  return {
    // Post the photo  
    post: function( oauth_keys, url, binary ) {
      var body = _createBody(oauth_keys, binary);
      var request= _createHttpRequest();
      request.open("POST",url,false);
      request.setRequestHeader("Content-Type","multipart/form-data;boundary="+boundary1);
      request.sendAsBinary(body);
    }
  };
})();

