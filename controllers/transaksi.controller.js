const model = require('../models/transaksi.model');
const {success, error} = require('../constants/result');

const transaksi = {
    getAllTransaksi: async (req, res) => {
        model.getAllTransaksi()
        .then(result => {
            if(result.status == "ok") {
                success(res, result.data)
            }
            else{
                error(res, result.msg)
            }
        })
        .catch(err=>{
            error(res, err)
        })
    },
    getTransaksiByCol: async (req, res) => {
        model.getTransaksiByCol(req.params)
        .then(result => {
            if(result.status == "ok") {
                success(res, result.data)
            }
            else{
                error(res, result.msg)
            }
        })
        .catch(err=>{
            error(res, err)
        })
    },
    login: async (req, res) => {
        model.login(req.body)
        .then(result => {
            if(result.status == "ok") {
                success(res, result.data)
            }
            else{
                error(res, result.msg)
            }
        })
        .catch(err=>{
            error(res, err)
        })
    },
    addTransaksi: async (req, res) => {
        model.addTransaksi(req.body)
        .then(result => {
            if(result.status == "ok") {
                success(res, result.msg)
            }
            else{
                error(res, result.msg)
            }
        })
        .catch(err=>{
            error(res, err)
        })
    },
    addStatusTransaksi: async (req, res) => {
        model.addStatusTransaksi(req.body)
        .then(result => {
            if(result.status == "ok") {
                success(res, result.msg)
            }
            else{
                error(res, result.msg)
            }
        })
        .catch(err=>{
            error(res, err)
        })
    },
    updateTransaksi: async (req, res) => {
        model.updateTransaksi(req.body, req.params)
        .then(result => {
            if(result.status == "ok") {
                success(res, result.msg)
            }
            else{
                error(res, result.msg)
            }
        })
        .catch(err=>{
            error(res, err)
        })
    },
    deleteTransaksi: async (req, res) => {
        model.deleteTransaksi(req.params)
            .then(result => {
                if (result.status == "ok") {
                    success(res, result.msg)
                }
                else {
                    error(res, result.msg)
                }
            })
            .catch(err => {
                error(res, err)
            })
    }
}

module.exports = transaksi