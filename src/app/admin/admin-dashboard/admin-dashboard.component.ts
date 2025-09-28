import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables)
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.renderCharts();
  }

  renderCharts(): void {
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [{
          label: 'Revenu (MAD)',
          data: [3200, 2800, 3500, 4000, 4600, 5000, 4200],
          backgroundColor: 'rgba(25, 135, 84, 0.7)'
        }]
      },
      options: { responsive: true }
    });

    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [{
          label: 'Commandes',
          data: [20, 25, 18, 30, 40, 50, 45],
          borderColor: 'rgba(13, 110, 253, 1)',
          backgroundColor: 'rgba(13, 110, 253, 0.2)',
          tension: 0.3
        }]
      },
      options: { responsive: true }
    });

    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['Sur place', 'Livraison', 'À emporter'],
        datasets: [{
          data: [300, 600, 334],
          backgroundColor: ['#ffc107', '#198754', '#0dcaf0']
        }]
      },
      options: { responsive: true }
    });

    new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: ['Pizza', 'Tacos', 'Boissons'],
        datasets: [{
          data: [400, 300, 200],
          backgroundColor: ['#fd7e14', '#20c997', '#6f42c1']
        }]
      },
      options: { responsive: true }
    });

    new Chart('polarChart', {
      type: 'polarArea',
      data: {
        labels: ['Pizza', 'Burger', 'Tacos', 'Pâtes', 'Salades'],
        datasets: [{
          data: [120, 90, 110, 60, 50],
          backgroundColor: ['#0d6efd', '#dc3545', '#ffc107', '#198754', '#6c757d']
        }]
      },
      options: { responsive: true }
    });

    new Chart('radarChart', {
      type: 'radar',
      data: {
        labels: ['Rapidité', 'Qualité', 'Propreté', 'Prix', 'Service client'],
        datasets: [{
          label: 'Note sur 10',
          data: [8, 9, 7, 8, 9],
          backgroundColor: 'rgba(13, 110, 253, 0.2)',
          borderColor: '#0d6efd',
          pointBackgroundColor: '#0d6efd'
        }]
      },
      options: { responsive: true }
    });
  }
}

