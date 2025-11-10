/*
  Função que retorna um middleware de validação do Zod.
  Parâmetros:
  - schema: esquema do Zod a ser usado na validação.
*/
export default function (schema) {
  return function (req, res, next) {
    try {
      // Tenta validar os dados da requisição com o schema fornecido
      schema.parse(req.body)
      // Deu certo, pode passar para o próximo middleware
      next()
    }
    catch (error) {
      // Deu errado, vamos montar uma mensagem de erro personalizada
      // e retornar ao front-end
      
      // O Zod devolve um array de erros, cada um relativo a um campo
      // do formulário
      const errorMessages = {}
      for(let e of error.issues) {
        // O nome do campo com problema
        const field = e.path[0]
        // A mensagem de erro do campo
        const message = e.message
        // Adiciona a mensagem de erro ao objeto de mensagens de erro
        errorMessages[field] = message
      }

      // Retorna o status HTTP 422 (Unprocessable Entity) com as
      // mensagens de erro
      res.status(422).send(errorMessages)
    }
  }
}
