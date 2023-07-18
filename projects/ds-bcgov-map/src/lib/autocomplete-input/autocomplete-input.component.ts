import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
})
export class AutocompleteInputComponent implements AfterViewInit {
  @Input() id: string;
  @Output() autocompleteEvent = new EventEmitter();
  public autocompleteInput: string;

  constructor() {}

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    try {
      const input = document.getElementById(this.id) as HTMLInputElement;
      const options = {
        componentRestrictions: { country: 'CA' },
        types: ['geocode'], // 'establishment' / 'address' / 'geocode'
      };
      const autocomplete = new google.maps.places.Autocomplete(input, options);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        this.autocompleteEvent.emit(place);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
