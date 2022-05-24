const fetch = require('node-fetch');

const galeri = {
    getAllGaleri: async () => {
        try {
            let res = await fetch(`${process.env.SUPABASE_URL}/taichan_galeri?select=*`, {
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
    getGaleriByCol: async ({ column, value }) => {
        try {
            const params = ["id_galeri"].includes(column) ? `${column}=eq.${value}` : `${column}=ilike.%25${value}%25`
            let res = await fetch(`${process.env.SUPABASE_URL}/taichan_galeri?select=*&${params}`, {
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
    addGaleri: async (data) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/taichan_galeri`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                },
                body: JSON.stringify(data)
            })
            return { status: 'ok', msg: 'success add galeri' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    updateGaleri: async (data, { id_galeri }) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/taichan_galeri?id_galeri=eq.${id_galeri}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                },
                body: JSON.stringify(data)
            })
            return { status: 'ok', msg: 'success update galeri' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    deleteGaleri: async ({ id_galeri }) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/taichan_galeri?id_galeri=eq.${id_galeri}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                }
            })
            return { status: 'ok', msg: 'success delete galeri' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    }
}

module.exports = galeri;