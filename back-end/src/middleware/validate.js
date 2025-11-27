/*
Vulnerabilidade: API3:2023 - Falha de autorização a nível de propriedade (Mass Assignment).
Esta vulnerabilidade foi evitada no código ao:
1. Utilizar a biblioteca Zod para definir schemas rígidos para a validação do corpo das requisições (req.body).
2. Garantir que apenas as propriedades esperadas e autorizadas sejam aceitas e processadas, rejeitando qualquer propriedade extra ou malformada.
3. Prevenir ataques de "Mass Assignment" que poderiam levar à manipulação não autorizada de dados ou elevação de privilégios, como a inserção de campos não previstos no modelo.
4. Retornar HTTP 422 (Unprocessable Entity) com mensagens de erro claras para o front-end em caso de falha de validação, oferecendo feedback útil para a correção.
*/
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
