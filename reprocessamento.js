const fs = require('fs');
const readline = require('readline');

async function lerDados() {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream("./loteParaReprocessamento.csv");
        const reader = readline.createInterface({ input: stream });

        let lista = [];

        reader.on("line", item => {
            const [id, email] = item.replace(/\r/, '').split(',');

            lista.push({
                id,
                email
            })
        });

        reader.on("close", () => {
            // 👇 chegou ao final do arquivo
            resolve(lista)
        });

        stream.on('error', reject)
        reader.on('error', reject)
    })
}


//A função fixTransactions deve receber um array com os ids dos usuários impactados
const fixTransactions = async (userIds) => {
    console.log(`Corrigindo transações dos usuários enviados. Informações dos usuários: ${userIds} `)
}

//A função sendEmails deve receber um array com os emails dos usuários impactados
const sendEmails = async (userEmails) => {
    console.log(`Enviando comunicação para os usuários impactados nos seguintes e-mails: ${userEmails}`)
}

const main = async () => {
    const ids = []
    const emails = []

    const dados = await lerDados();

    dados.forEach(async (dados) => {
        ids.push(dados.id)
        emails.push(dados.email)
    })
    await fixTransactions(ids)
    await sendEmails(emails)
}


main()
    .then(() => console.log('Transações reprocessadas!'))
    .catch(err => console.error(err))