import { FormControl } from '@angular/forms';

export const removeSpace = (fc: FormControl) => {
  if (/\s/g.test(fc.value)) {
    fc.setValue(fc.value.replaceAll(' ', ''))
  }
}
