import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
   studUrl = "http://localhost:8080/api/StudentDeatils/";

constructor(private http: Http) { }
saveDetails(studs) {


alert("Service");
return this.http.post(this.studUrl + "post", studs)
      .map(res => res.json());
      
}
getAllStudentDetails() {
    return this.http.get(this.studUrl + "get")
      .map(res => res.json());
  }
getDetails(rollno){
      return this.http.get(this.studUrl + "get/" + rollno)
      .map(res => res.json()); 
}
deleteDetails(rollno){
      return this.http.delete(this.studUrl + "delete/" + rollno);
}
 updateDetails(rollno, studs) {
       alert(rollno);
    console.log(JSON.stringify(studs));
    return this.http.put(this.studUrl + "put/" +rollno, studs)
      .map(res => res.json());
  }
}