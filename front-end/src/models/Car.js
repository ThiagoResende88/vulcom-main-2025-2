import { z } from 'zod'

const currentYear = new Date().getFullYear()

const Car = z.object({
  brand: z.string()
    .min(1, { message: 'A marca do carro é obrigatória' })
    .max(25, { message: 'A marca do carro não pode ser maior que 25 caracteres' }),
  
  model: z.string()
    .min(1, { message: 'O modelo do carro é obrigatório' })
    .max(25, { message: 'O modelo do carro não pode ser maior que 25 caracteres' }),

  color: z.enum(
    [
      'AMARELO', 
      'AZUL', 
      'BRANCO', 
      'CINZA', 
      'DOURADO', 
      'LARANJA', 
      'MARROM', 
      'PRATA', 
      'PRETO', 
      'ROSA', 
      'ROXO', 
      'VERDE', 
      'VERMELHO'
    ],
    { required_error: 'A cor deve ser selecionada' }
  ),

  year_manufacture: z.coerce.number({ invalid_type_error: 'O ano deve ser um número' })
    .int()
    .min(1960, { message: 'O ano de fabricação não pode ser anterior a 1960' })
    .max(currentYear, { message: `O ano de fabricação não pode ser posterior a ${currentYear}` }),

  imported: z.coerce.boolean(),

  plates: z.string()
    .length(8, { message: 'A placa do carro deve ter exatamente 8 caracteres' }),

  selling_date: z.coerce.date()
    .min(new Date('2020-03-20'), { message: 'A data de venda não pode ser anterior a 20/03/2020' })
    .max(new Date(), { message: 'A data de venda não pode ser posterior à data de hoje' })
    .optional()
    .nullable(),

  selling_price: z.coerce.number({ invalid_type_error: 'O preço de venda deve ser um número' })
    .min(5000, { message: 'O preço de venda mínimo é de R$ 5.000,00' })
    .max(5000000, { message: 'O preço de venda máximo é de R$ 5.000.000,00' })
    .optional()
    .nullable()
})

export default Car
