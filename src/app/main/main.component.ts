import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  amountInput!: HTMLInputElement;
  fromCurrencySelect!: HTMLSelectElement;
  toCurrencySelect!: HTMLSelectElement;
  convertButton!: HTMLButtonElement;
  resultBox!: HTMLInputElement;
  conversionRates: any = {};

  currencyList: string[] = [
    "USD", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD",
    "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYN", "BZD",
    "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP",
    "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS", "GIP",
    "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR",
    "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW",
    "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD",
    "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO",
    "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON",
    "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS",
    "SRD", "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TVD",
    "TWD", "TZS", "UAH", "UGX", "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", "XCD", "XDR",
    "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL"
  ];

  constructor() {}

  async ngOnInit() {
    this.amountInput = document.getElementById('amount') as HTMLInputElement;
    this.fromCurrencySelect = document.getElementById('from-currency-select') as HTMLSelectElement;
    this.toCurrencySelect = document.getElementById('to-currency-select') as HTMLSelectElement;
    this.convertButton = document.getElementById('convert-button') as HTMLButtonElement;
    this.resultBox = document.getElementById('resultbox') as HTMLInputElement;

    this.populateDropdown(this.fromCurrencySelect);
    this.populateDropdown(this.toCurrencySelect);

    this.fromCurrencySelect.value = "EGP";
    this.toCurrencySelect.value = "USD";

    await this.fetchConversionRates();

    this.convertButton.addEventListener('click', () => this.exchange());
  }

  async fetchConversionRates() {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/d95a41618f1124c591e49dc7/latest/USD`);
      const data = await response.json();
      this.conversionRates = data.conversion_rates;
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  }

  populateDropdown(selectElement: HTMLSelectElement) {
    this.currencyList.forEach(currency => {
      const option = document.createElement("option");
      option.value = currency;
      option.text = currency;
      selectElement.add(option);
    });
  }

  exchange() {
    const amount = Number(this.amountInput.value);
    if (amount <= 0) {
      this.resultBox.classList.remove('d-none');
      this.resultBox.value = "Enter a valid amount.";
      return;
    }

    const fromRate = this.conversionRates[this.fromCurrencySelect.value];
    const toRate = this.conversionRates[this.toCurrencySelect.value];
    const convertedAmount = (amount / fromRate) * toRate;

    this.resultBox.classList.remove('d-none');
    this.resultBox.value = `${amount} ${this.fromCurrencySelect.value} = ${convertedAmount.toFixed(2)} ${this.toCurrencySelect.value}`;
  }
}
