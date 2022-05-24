const fetch = require('node-fetch');

const berita = {
    getAllBerita: async () => {
        try {
            let res = await fetch(`${process.env.SUPABASE_URL}/taichan_berita?select=*`, {
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
    },
    getBeritaByCol: async ({ column, value }) => {
        try {
            const params = ["id_berita"].includes(column) ? `${column}=eq.${value}` : `${column}=ilike.%25${value}%25`
            let res = await fetch(`${process.env.SUPABASE_URL}/taichan_berita?select=*&${params}`, {
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
    },
    addBerita: async (data) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/taichan_berita`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                },
                body: JSON.stringify(data)
            })
            return { status: 'ok', msg: 'success add berita' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    updateBerita: async (data, { id_berita }) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/taichan_berita?id_berita=eq.${id_berita}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                },
                body: JSON.stringify(data)
            })
            return { status: 'ok', msg: 'success update berita' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    deleteBerita: async ({ id_berita }) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/taichan_berita?id_berita=eq.${id_berita}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                }
            })
            return { status: 'ok', msg: 'success delete berita' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    }
}

module.exports = berita;