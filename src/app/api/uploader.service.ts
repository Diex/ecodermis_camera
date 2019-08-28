import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BoundDirectivePropertyAst } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class UploaderService {

  // Imgur image upload endpoint
  // This is the same for everybody.
  public IMGUR_ENDPOINT = 'https://api.imgur.com/3/image';
  // Imgur client ID
  public IMGUR_CLIENT_ID = '9c48ba5baf1e548';



  constructor(private http: HttpClient) {
    console.log('UploadService created!');
    
    const form = new FormData();
    form.append('refresh_token', '{{refreshToken}}');
    form.append('client_id', '{{clientId}}');
    form.append('client_secret', '{{clientSecret}}');
    form.append('grant_type', 'refresh_token');

    // var settings = {
    //   'url': 'https://api.imgur.com/oauth2/token',
    //   'method': 'POST',
    //   'timeout': 0,
    //   'processData': false,
    //   'mimeType': 'multipart/form-data',
    //   'contentType': false,
    //   'data': form
    // };


    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.imgur.com/oauth2/token', true);
    xhr.onreadystatechange = () => {
          console.log(xhr.response);
          const link = JSON.parse(xhr.response);
      }
    // This synchronously sends our form-data body.
    // xhr.send(form);
  }

  upload(data: string, share: boolean) {
    this.sendToImgur(data);
  }

  // POSTs a photo to Imgur in exchange for a link to the image
  // image: base64 encoded image
  // urlCallback: callback that returns the link to the image
  // failureCallback: callback that returns errors
  sendToImgur(image: string, urlCallback: Function = null, failureCallback: Function = null): void {
    image = image.substring(image.indexOf('base64,') + 'base64,'.length);
    const auth = 'Client-ID ' + this.IMGUR_CLIENT_ID;
    
    const form: FormData = new FormData();
    form.append('image', image);
    form.append('album', 'T8BdrMLNSrJhKjZ');    

    fetch('https://api.imgur.com/3/image', {
    //mode: 'cors',
      method: 'POST',
      headers: {
        Authorization: 'Client-ID 9c48ba5baf1e548',
      },
      body: form
  }).then(response => {
    console.log(response);
    if (response.ok) {
      alert('Image uploaded to album');       
    }
  }).catch(error => {
    console.error(error);
    //alert('Upload failed: ' + error);
  });


    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', this.IMGUR_ENDPOINT, true);
    // xhr.setRequestHeader('Authorization', auth);
    // xhr.onreadystatechange = () => {
    //   if (xhr.readyState == 4) {
    //     if (xhr.status == 200) {
    //       console.log(xhr.response);
    //       const deletehash = JSON.parse(xhr.response)['data']['deletehash'];
    //       this.addToAlbum(deletehash);
    //     } else if (xhr.status >= 400 && failureCallback != null) {
    //       console.log('error...');
    //     }
    //   }
    // }

    // // This synchronously sends our form-data body.
    // xhr.send(body);
  }

  addToAlbum(deleteHash){
    console.log(deleteHash);
    const xhr = new XMLHttpRequest();
    // ecodermislive3 T8BdrMLNSrJhKjZ
    xhr.open('POST', 'https://api.imgur.com/3/album/T8BdrMLNSrJhKjZ/add', true);

    const auth = 'Client-ID ' + this.IMGUR_CLIENT_ID;
    xhr.setRequestHeader('Accept', '*/*');
    xhr.setRequestHeader('Authorization', auth);
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=--------------------------892031197249140284033904');
    // xhr.setRequestHeader('Host', 'api.imgur.com');
    // xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
    const body: FormData = new FormData();
    body.append('deletehashes[]', deleteHash);
    xhr.onreadystatechange = () => {
      console.log(xhr.response);
    };
    xhr.send();

  }
}
