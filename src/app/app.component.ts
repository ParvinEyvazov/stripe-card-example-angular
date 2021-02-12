import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import * as Bucket from '@spica-devkit/bucket';

import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'stripe-test';

  @ViewChild('cardInfo') cardInfo: ElementRef;
  _totalAmount: number = 25;
  card: any;
  //cardHandler = this.onChange.bind(this);
  cardError: string;

  test_data;
  data_subscribtion: any;

  uploadedImage: File;
  imagePreview: string;
  image_url_real;
  image_url_modified;

  constructor(
    private cd: ChangeDetectorRef,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer
  ) {
    console.log('a');
  }

  ngAfterViewInit() {
    // this.initiateCardElement();
    Bucket.initialize({
      apikey: '24k19kieg2bs6',
      publicUrl: 'https://master.spicaengine.com/api',
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    //    this.data_subscribtion.unsubscibe();
  }

  onImageChange(event) {
    let image = event.target.files[0];

    this.assignUrl(image, true);

    this.ng2ImgMax.resizeImage(image, 10000, 500).subscribe(
      (result) => {
        this.uploadedImage = result;
        this.assignUrl(this.uploadedImage, false);
        var sizeInMB = this.uploadedImage.size / (1024 * 1024);

        console.log('size: ', sizeInMB);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  assignUrl(file, is_real) {
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (_event) => {
      if (is_real == true) {
        this.image_url_real = reader.result;
      } else {
        this.image_url_modified = reader.result;
      }
    };
  }

  initiateCardElement() {
    console.log('aa');
    Bucket.initialize({
      apikey: '24k19kieg2bs6',
      publicUrl: 'https://master.spicaengine.com/api',
    });

    /*
     {
        filter: JSON.stringify({ status: 'good' }),
      }
    */
    //console.log(Bucket);
    // Bucket.data.realtime
    //   .getAll('5fec45a4dfdd0f002c91f4c5')
    //   .toPromise()
    //   .then((data) => console.log(data));

    // Giving a base style here, but most of the style is in scss file
    // const cardStyle = {
    //   base: {
    //     color: '#32325d',
    //     fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    //     fontSmoothing: 'antialiased',
    //     fontSize: '100px',
    //     '::placeholder': {
    //       color: '#aab7c4',
    //     },
    //   },
    //   invalid: {
    //     color: '#fa755a',
    //     iconColor: '#fa755a',
    //   },
    // };
    // this.card = elements.create('card', { cardStyle });
    // this.card.mount(this.cardInfo.nativeElement);
    // this.card.addEventListener('change', this.cardHandler);
  }

  ubsub() {
    this.data_subscribtion.unsubscribe();
  }

  sub() {
    let filt = 'good';

    this.data_subscribtion = Bucket.data.realtime
      .getAll('5feca10d46caa3002dd3ddbe')
      .subscribe(
        (data) => {
          console.log('data: ', data);
          this.test_data = data;
        },
        (error) => {
          console.log('err: ', error);
        }
      );
  }

  // onChange({ error }) {
  //   if (error) {
  //     this.cardError = error.message;
  //   } else {
  //     this.cardError = null;
  //   }
  //   this.cd.detectChanges();
  // }

  // async createStripeToken() {
  //   const { token, error } = await stripe.createToken(this.card);
  //   console.log('token: ', token, ' error: ', error);
  //   if (token) {
  //     this.onSuccess(token);
  //   } else {
  //     this.onError(error);
  //   }
  //   this.createPaymentMethod();
  // }

  // async createPaymentMethod() {
  //   const result = await stripe.createPaymentMethod({
  //     type: 'card',
  //     card: this.card,
  //     billing_details: {
  //       email: 'test2@gmail.com',
  //     },
  //   });

  //   console.log(result);
  // }

  // onSuccess(token) {}

  // onError(error) {
  //   console.log(error);
  //   if (error.message) {
  //     this.cardError = error.message;
  //   }
  // }
}
