const { SaltPass } = require('../helpers/saltpass')
const fetch = require('node-fetch');
const bcrypt = require('bcrypt')

const user = {
    getAllUser: async () => {
        try {
            let res = await fetch(`${process.env.SUPABASE_URL}/taichan_user?select=*,level:taichan_level(level,id_level)`, {
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
    getUserByCol: async ({ column, value }) => {
        try {
            const params = ["id_level", "id_user"].includes(column) ? `${column}=eq.${value}` : `${column}=ilike.%25${value}%25`
            let res = await fetch(`${process.env.SUPABASE_URL}/taichan_user?select=*,level:taichan_level(level, id_level)&${params}`, {
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
    login: async ({ username, password }) => {
        try {
            let res = await fetch(`${process.env.SUPABASE_URL}/taichan_user?select=*, level:taichan_level(level, id_level)&username=ilike.%25${username}%25`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                }
            })
            res = await res.json()
            if (res) {
                const ps = res[0].password;
                const compare = await bcrypt.compare(password, ps);
                if (compare) {
                    return { 'status': 'ok', 'data': { is_login: true, ...res[0] } };
                }
                else {
                    return { 'status': 'error', 'msg': 'wrong password or username' };
                }
            } else {
                return { status: 'err', msg: "user atau password salah" }
            }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    addUser: async (data) => {
        try {
            const password = data.password
            delete data.password
            const salt = await SaltPass(password)
            data.password = salt
            await fetch(`${process.env.SUPABASE_URL}/taichan_user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                },
                body: JSON.stringify(data)
            })
            return { status: 'ok', msg: 'success add user' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    updateUser: async (data, { id_user }) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/taichan_user?id_user=eq.${id_user}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                },
                body: JSON.stringify(data)
            })
            return { status: 'ok', msg: 'success update user' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    deleteUser: async ({ id_user }) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/taichan_user?id_user=eq.${id_user}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                }
            })
            return { status: 'ok', msg: 'success delete user' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    }
}

module.exports = user;