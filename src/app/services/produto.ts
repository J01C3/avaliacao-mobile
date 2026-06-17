import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  updateDoc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  firestore = inject(Firestore);

  adicionar(nome: string) {
    const produtosRef = collection(this.firestore, 'produtos');

    return addDoc(produtosRef, {
      nome: nome
    });
  }

  listar() {
    const produtosRef = collection(this.firestore, 'produtos');

    return collectionData(produtosRef, {
      idField: 'id'
    });
  }

  editar(id: string, nome: string) {
    const produtoRef = doc(
      this.firestore,
      `produtos/${id}`
    );

    return updateDoc(produtoRef, {
      nome: nome
    });
  }

  excluir(id: string) {
    const produtoRef = doc(
      this.firestore,
      `produtos/${id}`
    );

    return deleteDoc(produtoRef);
  }
}