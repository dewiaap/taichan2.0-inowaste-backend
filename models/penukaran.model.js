const fetch = require('node-fetch');
const user = require('./user.model');
const voucher = require('./voucher.model');

const penukaran = {
    getAllPenukaran: async () => {
        try {
            let res = await fetch(`${process.env.SUPABASE_URL}/taichan_penukaran?select=*,voucher:taichan_voucher(*, id_voucher),user:taichan_user(*, id_user)`, {
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
    getPenukaranByCol: async ({ column, value }) => {
        try {
            const params = ["id_penukaran", "id_user"].includes(column) ? `${column}=eq.${value}` : `${column}=ilike.%25${value}%25`
            let res = await fetch(`${process.env.SUPABASE_URL}/taichan_penukaran?select=*,voucher:taichan_voucher(*, id_voucher),user:taichan_user(*, id_user)&${params}`, {
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
    addPenukaran: async (data) => {
        try {
            let users = await user.getUserByCol({ column: 'id_user', value: data.id_user })
            let vouchers = await voucher.getVoucherByCol({ column: 'id_voucher', value: data.id_voucher })
            if (users.status == 'ok') {
                users = users.data[0]
                vouchers = vouchers.data[0]
                if (users.poin >= vouchers.poin) {
                    let res = await fetch(`${process.env.SUPABASE_URL}/taichan_penukaran`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                            'apikey': process.env.SUPABASE_API_KEY,
                            "Prefer": "return=representation"
                        },
                        body: JSON.stringify(data)
                    })
                   let new_data = { "poin": (users.poin - vouchers.poin) }
                    await fetch(`${process.env.SUPABASE_URL}/taichan_user?id_user=eq.${data.id_user}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                            'apikey': process.env.SUPABASE_API_KEY
                        },
                        body: JSON.stringify(new_data)
                    })
                }
                return { status: 'ok', msg: 'success add penukaran' }
            } else {
                return { status: 'err', msg: 'Poin ada tidak cukup!' }
            }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    updatePenukaran: async (data, { id_penukaran }) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/taichan_penukaran?id_penukaran=eq.${id_penukaran}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                },
                body: JSON.stringify(data)
            })
            return { status: 'ok', msg: 'success update penukaran' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    deletePenukaran: async ({ id_penukaran }) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/taichan_penukaran?id_penukaran=eq.${id_penukaran}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                }
            })
            return { status: 'ok', msg: 'success delete penukaran' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    }
}

module.exports = penukaran;