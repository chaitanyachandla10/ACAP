import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormGroupDirective, FormArray, Validators} from '@angular/forms';
import { AcapService } from '../acap.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ItemsArray:any;
  total:any;
  constructor(private formBuilder: FormBuilder,private acapservice: AcapService) { }

  ngOnInit(): void {
     
    this.acapservice.getPeople().subscribe((data: any[])=>{
      console.log(data);
      //console.log(Array.of(data));
      //this.ItemsArray = Array.of(data);
      this.ItemsArray = data;
      console.log(this.ItemsArray.manager.length);
      for(var j=0; j>=data.length; j++)
      {
        console.log("-----j-----",j);
        for(var i=0; i>=data[j].manager.length; i++)
        {
          var deveploertotal,testertotal,managertotal;
          var sum;
          deveploertotal = this.ItemsArray.manager[i].developer*1000;
          testertotal = this.ItemsArray.manager[i].tester*500;
          managertotal = this.ItemsArray.manager[i].noofManager*300;
          sum = deveploertotal + testertotal + managertotal;
          alert(sum);
          console.log(sum);
          this.total +=sum;
          alert(this.total);
          console.log(this.total);
        }
      }
    })

    }

}
