const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

export default async function handler(req, res) {
  const db = await sqlite.open({
    filename: './cmsc447-team2-data.db',
    driver: sqlite3.Database,
  })

  if (req.method === 'GET') {
    const data = await db.all(
      'SELECT CrimeLocation.location_id, offense_key, method FROM CrimeLocation JOIN CrimeData ON CrimeData.location_id = CrimeLocation.location_id WHERE neighborhood_cluster = ?',
      [`cluster ${req.query.id}`]
    )
    res.status(200).json(data)
  }
}
