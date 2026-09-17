import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  standalone: true,
  name:"typeColumnFormat"
})
export class TypeColumnFormatPipe implements PipeTransform {
  transform(value: string): any {
    let type = "--";
    if (value) {
      type = value;
    }
    return `[${type}]`;
  }
}
