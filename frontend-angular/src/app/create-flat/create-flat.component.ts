import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Flat } from '../flat';
import { HttpErrorResponse } from '@angular/common/http';
import { FlatService } from '../flat.service';

@Component({
  selector: 'app-create-flat',
  standalone: false,
  templateUrl: './create-flat.component.html',
  styleUrl: './create-flat.component.css'
})
export class CreateFlatComponent {

  public flat: Flat = {
    residentName: '',
    flatNumber: 0,
    dues: 0,
    squareMeters: 0,
    paid: false,
    numberOfRooms: '',
    floor: 0,
    imageUrl: '',
    id: 0
  };
  


  constructor(private flatService: FlatService){}

  public onSubmit(addForm: NgForm): void {
    this.flatService.addFlat(addForm.value).subscribe({
      next: (response: Flat) => {
        console.log(response);
        alert('Success!')
        addForm.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
      complete: () => console.log("Flat ekleme işlemi tamamlandı")
    });
  }
}
