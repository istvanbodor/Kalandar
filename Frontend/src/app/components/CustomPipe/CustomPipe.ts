import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "IsAdmin"
})
export class IsAdminPipe implements PipeTransform {
  transform(value: String, ...args: String[]): String {
    return value === "ADMIN" ? "Admin" : "User";
  }
}

@Pipe({
  name: "IsFullDay"
})
export class IsFullDay implements PipeTransform {
  transform(value: boolean, ...args: String[]): String {
    return value === true ? "Full day" : "Not full day";
  }
}