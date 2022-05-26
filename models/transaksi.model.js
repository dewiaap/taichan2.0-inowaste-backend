const fetch = require('node-fetch');
const user = require('./user.model');

const transaksi = {
    getAllTransaksi: async () => {
        try {
            let res = await fetch(`${process.env.SUPABASE_URL}/taichan_transaksi?select=*, mitra:taichan_user!taichan_transaksi_id_mitra_fkey(*, id_user), user:taichan_user!taichan_transaksi_id_user_fkey(*, id_user)`, {
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
    getTransaksiByCol: async ({ column, value }) => {
        try {
            const params = ["id_transaksi", "id_user"].includes(column) ? `${column}=eq.${value}` : `${column}=ilike.%25${value}%25`
            let res = await fetch(`${process.env.SUPABASE_URL}/taichan_transaksi?select=*, mitra:taichan_user!taichan_transaksi_id_mitra_fkey(*, id_user), user:taichan_user!taichan_transaksi_id_user_fkey(*, id_user)&${params}`, {
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
    addTransaksi: async (data) => {
        try {
            let res = await fetch(`${process.env.SUPABASE_URL}/taichan_transaksi`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY,
                    "Prefer": "return=representation"
                },
                body: JSON.stringify(data)
            })
            let json = await res.json()
            if (json) {
                const data_status = {
                    id_transaksi: json[0].id_transaksi,
                    status: "permintaan dibuat"
                }
                await fetch(`${process.env.SUPABASE_URL}/taichan_status_transaksi`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                        'apikey': process.env.SUPABASE_API_KEY,
                    },
                    body: JSON.stringify(data_status)
                })
            }
            return { status: 'ok', msg: 'success add transaksi' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    addStatusTransaksi: async (data) => {
        try {
            let res = await fetch(`${process.env.SUPABASE_URL}/taichan_status_transaksi`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY,
                },
                body: JSON.stringify(data)
            })
            if(data.status.toLowerCase() == "minyak diterima"){
                let trx = await transaksi.getTransaksiByCol({ column: "id_transaksi", value: data.id_transaksi })
                console.log(trx)
                if(trx.status === "ok"){
                    trx = trx.data[0]
                    let users = await user.getUserByCol({ column: "id_user", value: trx.id_user })
                    let mitra = await user.getUserByCol({ column: "id_user", value: trx.id_mitra })
                    users = users.data[0]
                    mitra = mitra.data[0]
                    let new_data = {"poin" : (users.poin + (trx.liter*mitra.poin))}
                    await fetch(`${process.env.SUPABASE_URL}/taichan_user?id_user=eq.${trx.id_user}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                            'apikey': process.env.SUPABASE_API_KEY
                        },
                        body: JSON.stringify(new_data)
                    })
                }
            }
            return { status: 'ok', msg: 'success add status transaksi' }
        } catch (err) {
            console.log(err)
            return { status: 'err', msg: err }
        }
    },
    updateTransaksi: async (data, { id_transaksi }) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/taichan_transaksi?id_transaksi=eq.${id_transaksi}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                },
                body: JSON.stringify(data)
            })
            return { status: 'ok', msg: 'success update transaksi' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    deleteTransaksi: async ({ id_transaksi }) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/taichan_status_transaksi?id_transaksi=eq.${id_transaksi}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                }
            })
            await fetch(`${process.env.SUPABASE_URL}/taichan_transaksi?id_transaksi=eq.${id_transaksi}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                }
            })
            return { status: 'ok', msg: 'success delete transaksi' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    }
}

module.exports = transaksi;