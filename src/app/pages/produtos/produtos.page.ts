import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonItem,
  IonInput,
  IonList,
  IonLabel,
  IonListHeader
} from '@ionic/angular/standalone';

import { ProdutoService } from '../../services/produto';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonItem,
    IonInput,
    IonList,
    IonLabel,
    IonListHeader
  ]
})
export class ProdutosPage {

  produtoService = inject(ProdutoService);
  api = inject(ApiService);

  nome = '';

  produtos: any[] = [];
  posts: any[] = [];

  constructor() {
    this.carregarProdutos();

    this.api.getPosts().subscribe((dados: any) => {
      this.posts = dados.slice(0, 5);
    });
  }

  carregarProdutos() {
    this.produtoService.listar().subscribe((dados: any) => {
      this.produtos = dados;
    });
  }

  adicionarProduto() {
    if (!this.nome.trim()) return;

    this.produtoService.adicionar(this.nome).then(() => {
      this.nome = '';
      this.carregarProdutos();
    });
  }

  editarProduto(produto: any) {
    const novoNome = prompt('Digite o novo nome:', produto.nome);

    if (!novoNome || !novoNome.trim()) return;

    this.produtoService.editar(produto.id, novoNome).then(() => {
      this.carregarProdutos();
    });
  }

  excluirProduto(id: string) {
    this.produtoService.excluir(id).then(() => {
      this.carregarProdutos();
    });
  }
}