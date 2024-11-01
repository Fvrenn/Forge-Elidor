import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnifeService } from '../../../../../services/knife/knife.service';

@Component({
  selector: 'app-couteauxlist',
  templateUrl: './couteauxlist.component.html',
  styleUrl: './couteauxlist.component.scss'
})
export class CouteauxlistComponent implements OnInit {
  knives: any[] = [];

  constructor(private knifeService: KnifeService, private router: Router) {}

  ngOnInit(): void {
    this.loadKnives();
  }

  loadKnives(): void {
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

  deleteKnife(id: number): void {
    this.knifeService.deleteKnife(id).subscribe(
      () => {
        this.knives = this.knives.filter(knife => knife.id !== id);
      },
      (error: any) => {
        console.error('Failed to delete knife', error);
      }
    );
  }
}