import { Component, numberAttribute, OnInit } from '@angular/core';
import { Flat } from '../flat';
import { FlatService } from '../flat.service';
import { HttpErrorResponse } from '@angular/common/http';
import { response } from 'express';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  

  ngOnInit(): void {
    this.getFlats();
    
  }
///////////////////////////////////
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
//////////////////////////////////////



  
  public flats!: Flat[];


  public selectedFlat!: Flat;

  public selectedIsPaid: boolean = false;

  ///////////////
  public deleteFlat!: Flat;
  /////////////////


  constructor(private flatService: FlatService){ /*flatService.getFlats().subscribe( response => {
    this.flats = response;
    console.log(this.flats);
  });*/}
  
  public getFlats() : void {
    this.flatService.getFlatsByUser().subscribe({
      next : (response : Flat[]) => {
        this.flats = response;
      },
      error : (error : HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public onOpenModal(flat: Flat, mode: string): void {
    const container=document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');

    if (mode === 'delete') {
      this.deleteFlat = flat;
      button.setAttribute('data-target', '#deleteFlatModal'); 
    }

    if (mode === 'isPaid') {
      this.selectedFlat = flat;
      this.selectedIsPaid = flat.paid;
      button.setAttribute('data-target', '#isPaidModal');
    }

    container?.appendChild(button);
    button.click();
    
  }

  public onDeleteFlat(flatId: number): void {
    this.flatService.deleteFlat(flatId).subscribe({
      next : (response: void) => {
        console.log(response);
        this.getFlats();
      },
      error : (error : HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onUpdateIsPaid(): void {
  this.flatService.updateIsPaid(this.selectedFlat.id, this.selectedIsPaid).subscribe({
    next: () => {
      this.selectedFlat.paid = this.selectedIsPaid;
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    }
  });


  }
}
