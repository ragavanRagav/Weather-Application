import { Component, OnInit } from "@angular/core";
import { WeatherService } from "../weather.service";
@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls:['./home.component.css'] 
})
export class HomeComponent implements OnInit {
    degree:string='\xB0C';
    city ="";
    weather = [];
    ser = "Add City";
    change(index)
    {
        this.city = "";
        if(!this.weather[index].display)
        {
            this.weather[index].display = true;
            this.ser = "Edit";
            this.weather[index].details.name = "";
            this.weather[index].result = false;
        }
        else
        {
            this.weather[index].display = false;
            this.weather[index].details.name = "Currently No Data";
        }
    }
    constructor(private details: WeatherService){}
    search(index)
    {
        if(this.city!=""){
        this.details.forecast(this.city,index);
        this.details.fetchData().subscribe((value)=>{
            this.weather.push(value);
        })
        }
    }
    ngOnInit(): void {
        this.weather = this.details.load();
    }
}