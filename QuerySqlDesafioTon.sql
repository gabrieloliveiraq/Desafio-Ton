/*************************************************************************************
*                           Script Para Listagem de Clientes                         *
**************************************************************************************
* Autor: Gabriel de Oliveira														 *
* Data: 11/07/2022																	 *
* Descrição: Listagem de Ids e E-mails de Clientes Impactados Pelo Incidente         *
*************************************************************************************/

SELECT DISTINCT ton_users.id, ton_users.email FROM ton_transactions 
INNER JOIN ton_users ON ton_users.id = ton_transactions.user_id
WHERE ton_transactions.status = 'PROCESSING'