import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../../../services/news/news.service';

@Component({
  selector: 'app-actualite-comp',
  templateUrl: './actualite-comp.component.html',
  styleUrl: './actualite-comp.component.scss'
})
export class ActualiteCompComponent implements OnInit {
  news: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.isLoading = true;
    this.newsService.getNews().subscribe(
      (data: any[]) => {
        this.news = data;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Erreur lors du chargement des actualités', error);
        this.errorMessage = 'Impossible de charger les actualités';
        this.isLoading = false;
      }
    );
  }
}