import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnifeService } from '../../../../../services/knife/knife.service';

@Component({
  selector: 'app-couteauxlist',
  templateUrl: './couteauxlist.component.html',
  styleUrl: './couteauxlist.component.scss'
})
export class CouteauxlistComponent implements OnInit{
  knives: any[] = [];

  constructor(private knifeService: KnifeService, private router: Router) {}

  ngOnInit(): void {
    this.knifeService.getKnives().subscribe(
      (data: any[]) => {
        this.knives = data;
      },
      (error: any) => {
        console.error('Failed to fetch knives', error);
      }
    );
  }

  navigateToAddKnife(): void {
    this.router.navigate(['/admin/couteaux/add']);
  }
}
