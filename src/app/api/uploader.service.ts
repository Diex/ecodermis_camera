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

  upload(image: string, share: boolean) {
    image = image.substring(image.indexOf('base64,') + 'base64,'.length);
    const auth = 'Client-ID ' + this.IMGUR_CLIENT_ID;

    const form: FormData = new FormData();
    form.append('image', image);
    form.append('album', 'T8BdrMLNSrJhKjZ');

    const sharing = share ? 'share' : 'not_share';
    form.append('description', sharing);
    
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
        alert('Image uploaded ...');
      }
    }).catch(error => {
      console.error(error);
      //alert('Upload failed: ' + error);
    });
  }

  // POSTs a photo to Imgur in exchange for a link to the image
  // image: base64 encoded image
  // urlCallback: callback that returns the link to the image
  // failureCallback: callback that returns errors
  sendToImgur(image: string, ): void {
    
  }

  // addToAlbum(deleteHash) {
  //   console.log(deleteHash);
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('POST', 'https://api.imgur.com/3/album/T8BdrMLNSrJhKjZ/add', true);

  //   const auth = 'Client-ID ' + this.IMGUR_CLIENT_ID;
  //   xhr.setRequestHeader('Accept', '*/*');
  //   xhr.setRequestHeader('Authorization', auth);
  //   const body: FormData = new FormData();
  //   body.append('deletehashes[]', deleteHash);
  //   xhr.onreadystatechange = () => {
  //     console.log(xhr.response);
  //   };
  //   xhr.send();

  // }
}
