import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-dayuse-accordion-item',
  templateUrl: './dayuse-accordion-item.component.html',
  styleUrls: ['./dayuse-accordion-item.component.scss'],
})
export class DayuseAccordionItemComponent implements OnChanges {
  @Input() dayUseData = null;
  facilties = [];

  ngOnChanges(changes: SimpleChanges) {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const shortDate = [year, month, day].join('-');

    this.facilties = [];

    if (changes['dayUseData'].currentValue) {
      const park = changes['dayUseData'].currentValue;
      park.facilities.forEach((facility) => {
        let am = facility.reservations[shortDate]['AM']
          ? facility.reservations[shortDate]['AM'].capacity
          : null;
        let pm = facility.reservations[shortDate]['PM']
          ? facility.reservations[shortDate]['PM'].capacity
          : null;
        let day = facility.reservations[shortDate]['DAY']
          ? facility.reservations[shortDate]['DAY'].capacity
          : null;

        this.facilties.push({
          name: facility.name,
          am: am,
          amStyle: this.setStyle(am),
          pm: pm,
          pmStyle: this.setStyle(pm),
          day: day,
          dayStyle: this.setStyle(day),
        });
      });
    }
  }
  setStyle(capacity) {
    switch (capacity) {
      case 'High':
        return 'text-danger';
      case 'Moderate':
        return 'text-warning';
      case 'Low':
        return 'text-success';
      case 'Full':
        return 'text-secondary';
      default:
        return '';
    }
  }
}
