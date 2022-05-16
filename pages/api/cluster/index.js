const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

export default async function handler(req, res) {
  const db = await sqlite.open({
    filename: './cmsc447-team2-data.db',
    driver: sqlite3.Database,
  })

  if (req.method === 'GET') {
    const data = await db.all('SELECT offense FROM CrimeData')

    const arr = []
    for (let i in data) {
      arr.push(data[i].offense)
    }

    const labels = arr.filter((v, i, a) => a.indexOf(v) === i)
    console.log(labels)
    res.status(200).json(data)
  }
}
