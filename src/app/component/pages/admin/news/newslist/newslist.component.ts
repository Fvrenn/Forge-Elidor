import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from '../../../../../services/news/news.service';

@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrl: './newslist.component.scss'
})
export class NewslistComponent implements OnInit {
  news: any[] = [];
  isLoading = false;
  errorMessage = '';
  searchTerm = '';

  constructor(
    private router: Router,
    private newsService: NewsService
  ) {}

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
        this.errorMessage = 'Impossible de charger la liste des actualités';
        this.isLoading = false;
      }
    );
  }

  navigateToAddNews(): void {
    this.router.navigate(['/admin/news/add']);
  }

  navigateToEditNews(id: number): void {
    this.router.navigate(['/admin/news/edit', id]);
  }

  deleteNews(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
      this.isLoading = true;
      this.newsService.deleteNews(id).subscribe(
        () => {
          this.news = this.news.filter(item => item.id !== id);
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Erreur lors de la suppression de l\'actualité', error);
          this.errorMessage = 'Impossible de supprimer l\'actualité';
          this.isLoading = false;
        }
      );
    }
  }

  get filteredNews(): any[] {
    return this.news.filter(item => 
      item.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      item.contenu.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}