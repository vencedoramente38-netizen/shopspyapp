export interface Product {
  id: number;
  ranking: number;
  categoria: string;
  nome: string;
  preco: string;
  precoOriginal: string;
  desconto: string;
  avaliacao: number;
  vendas: string;
  comissao?: string;
  imagem: string;
  link: string;
  scoreViral: number;
  video?: string;
  copyVenda?: string;
}

export type Category = "Todos" | "Moda" | "Casa" | "Eletrônicos" | "Beleza" | "Ferramentas";
export type SortOption = "Mais Vendidos" | "Maior Desconto" | "Melhor Avaliação" | "Menor Preço";
