import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import * as Bucket from '@spica-devkit/bucket';

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
  cardHandler = this.onChange.bind(this);
  cardError: string;

  constructor(private cd: ChangeDetectorRef) {
    console.log('a');
  }

  // ngOnDestroy() {
  //   if (this.card) {
  //     // We remove event listener here to keep memory clean
  //     this.card.removeEventListener('change', this.cardHandler);
  //     this.card.destroy();
  //   }
  // }

  ngAfterViewInit() {
    this.initiateCardElement();
  }

  initiateCardElement() {
    console.log('aa');
    Bucket.initialize({
      apikey: 'ajjbym18ki4asz2m',
      publicUrl: 'https://test-4061d.hq.spicaengine.com/api',
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

    Bucket.data.realtime
      .getAll('5fec45a4dfdd0f002c91f4c5', {
        filter: JSON.stringify({ status: 'good' }),
      })
      .subscribe(
        (data) => {
          console.log('data: ', data);
        },
        (error) => {
          console.log('err: ', error);
        }
      );

    // Giving a base style here, but most of the style is in scss file
    const cardStyle = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '100px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    };
    this.card = elements.create('card', { cardStyle });
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  onChange({ error }) {
    if (error) {
      this.cardError = error.message;
    } else {
      this.cardError = null;
    }
    this.cd.detectChanges();
  }

  async createStripeToken() {
    const { token, error } = await stripe.createToken(this.card);
    console.log('token: ', token, ' error: ', error);
    if (token) {
      this.onSuccess(token);
    } else {
      this.onError(error);
    }
    this.createPaymentMethod();
  }

  async createPaymentMethod() {
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: this.card,
      billing_details: {
        email: 'test2@gmail.com',
      },
    });

    console.log(result);
  }

  onSuccess(token) {}

  onError(error) {
    console.log(error);
    if (error.message) {
      this.cardError = error.message;
    }
  }
}
