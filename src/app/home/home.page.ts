import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  currentImage: any;
  intro = true;
  showImage = false;
  thanks = false;

  constructor(private camera: Camera) { }

  takePicture() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.FRONT,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      this.intro = false;
      this.showImage = true;

      this.currentImage = 'data:image/jpeg;base64,' + imageData;

      console.log(this.currentImage);
      console.log('blabla');

    }, (err) => {
     // Handle error
     console.log('Camera issue: ' + err);
    });
  }

  publishPicture(publish: boolean) {
    if (publish) {
      console.log('yeah');
    } else {
      console.log('goFuckYourself');
    }

    this.currentImage = null;
    this.showImage = false;
    this.thanks = true;
    setTimeout(() => {
      this.thanks = false;
      this.intro = true;
    }, 2000);
  }
}
