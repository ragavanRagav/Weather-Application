import { Injectable } from '@angular/core';
import { getJSON } from "tns-core-modules/http";
import { AsyncSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http : HttpClient) { }
  private weatherData = [
    {details:{name:"Currently no data"},date:" ",time:" ",display:false,result:false},
  {details:{name:"Currently no data"},date:" ",time:" ",display:false,result:false},
  {details:{name:"Currently no data"},date:" ",time:" ",display:false,result:false},
  {details:{name:"Currently no data"},date:" ",time:" ",display:false,result:false},
  {details:{name:"Currently no data"},date:" ",time:" ",display:false,result:false},
  {details:{name:"Currently no data"},date:" ",time:" ",display:false,result:false}
];
public api_key : String="037ad795e293772e84189f7523bab40e";
private retrivedData = new AsyncSubject();
  load()
  {
    return this.weatherData;
  }
  forecast(city,panel)
  {         
      this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.api_key}`).subscribe((resData :  any)=>{
      let result:any = resData;
      this.weatherData[panel].details.name= "City Not Found";
      this.weatherData[panel].display = false;
      if(city == resData.name){
        this.weatherData[panel].details = result ;
        this.weatherData[panel].date= new Date().toString().substring(0,10);
        this.weatherData[panel].time= new Date().toString().substring(15,28);
        this.weatherData[panel].result = true;
      }
     },(err)=>{
         if(err.status==404){
              this.weatherData[panel].details.name="City Not Found";
              this.weatherData[panel].display = false;
         }
     });
  }
  fetchData()
  {
    return this.retrivedData.asObservable();
  }
}
