import { z } from 'zod'

// Define a lista de cores permitidas
const colors = [
  'AMARELO', 'AZUL', 'BRANCO', 'CINZA', 'DOURADO', 'LARANJA', 'MARROM',
  'PRATA', 'PRETO', 'ROSA', 'ROXO', 'VERDE', 'VERMELHO'
]

// Calcula o ano corrente
const currentYear = new Date().getFullYear()

// Define a data de abertura da loja
const storeOpeningDate = new Date('2020-03-20')

const Car = z.object({
  brand: z.string()
    .min(1, { message: 'A marca deve ter, no mínimo, 1 caractere.' })
    .max(25, { message: 'A marca deve ter, no máximo, 25 caracteres.' }),

  model: z.string()
    .min(1, { message: 'O modelo deve ter, no mínimo, 1 caractere.' })
    .max(25, { message: 'O modelo deve ter, no máximo, 25 caracteres.' }),

  color: z.enum(colors, {
    errorMap: () => ({ message: 'A cor selecionada é inválida.' })
  }),

  year_manufacture: z.number()
    .int()
    .min(1960, { message: 'O ano de fabricação não pode ser anterior a 1960.' })
    .max(currentYear, { message: `O ano de fabricação não pode ser posterior ao ano corrente (${currentYear}).` }),

  imported: z.boolean(),

  plates: z.string()
    .length(8, { message: 'A placa deve ter exatamente 8 caracteres.' }),

  selling_date: z.coerce.date()
    .min(storeOpeningDate, { message: 'A data de venda não pode ser anterior à abertura da loja.' })
    .max(new Date(), { message: 'A data de venda não pode ser posterior à data de hoje.' })
    .nullish(),

  selling_price: z.number()
    .min(5000, { message: 'O preço de venda deve ser de, no mínimo, R$ 5.000,00.' })
    .max(5000000, { message: 'O preço de venda deve ser de, no máximo, R$ 5.000.000,00.' })
    .nullish(),
})

export default Car