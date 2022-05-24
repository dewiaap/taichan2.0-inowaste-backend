const fetch = require('node-fetch');

const level = {
    getAllLevel: async () => {
        try {
            let res = await fetch(`${process.env.SUPABASE_URL}/taichan_level?select=*`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                }
            })
            let json = await res.json()
            return { status: 'ok', data: json }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    }
}

module.exports = level;