import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "IsAdmin"
})
export class IsAdminPipe implements PipeTransform {
  transform(value: String, ...args: String[]): String {
    return value === "ADMIN" ? "Admin" : "User";
  }
}