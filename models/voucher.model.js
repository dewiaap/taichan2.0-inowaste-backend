const fetch = require('node-fetch');

const voucher = {
    getAllVoucher: async () => {
        try {
            let res = await fetch(`${process.env.SUPABASE_URL}/taichan_voucher?select=*`, {
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
    getVoucherByCol: async ({ column, value }) => {
        try {
            const params = ["id_voucher"].includes(column) ? `${column}=eq.${value}` : `${column}=ilike.%25${value}%25`
            let res = await fetch(`${process.env.SUPABASE_URL}/taichan_voucher?select=*&${params}`, {
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
    addVoucher: async (data) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/taichan_voucher`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                },
                body: JSON.stringify(data)
            })
            return { status: 'ok', msg: 'success add voucher' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    updateVoucher: async (data, { id_voucher }) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/taichan_voucher?id_voucher=eq.${id_voucher}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                },
                body: JSON.stringify(data)
            })
            return { status: 'ok', msg: 'success update voucher' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    deleteVoucher: async ({ id_voucher }) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/taichan_voucher?id_voucher=eq.${id_voucher}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                }
            })
            return { status: 'ok', msg: 'success delete voucher' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    }
}

module.exports = voucher;