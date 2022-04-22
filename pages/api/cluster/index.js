const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

export default async function handler(req, res) {
  const db = await sqlite.open({
    filename: './cmsc447-team2-data.db',
    driver: sqlite3.Database,
  })

  if (req.method === 'GET') {
    const data = await db.all(
      'SELECT * FROM CrimeLocation JOIN CrimeData ON CrimeData.id = CrimeLocation.id WHERE neighborhood_cluster = ?',
      ['cluster 13']
    )
    res.status(200).json(data)
  }
}
