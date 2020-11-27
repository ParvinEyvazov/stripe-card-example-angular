import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';

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

  constructor(private cd: ChangeDetectorRef) {}

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
        email: 'test@gmail.com',
      },
    });

    console.log(result);
  }

  onSuccess(token) {
    console.log('aaa');
    console.log(token);
  }

  onError(error) {
    console.log(error);
    if (error.message) {
      this.cardError = error.message;
    }
  }
}
