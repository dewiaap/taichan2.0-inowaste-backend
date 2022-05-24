const model = require('../models/berita.model');
const {success, error} = require('../constants/result');

const berita = {
    getAllBerita: async (req, res) => {
        model.getAllBerita()
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
    getBeritaByCol: async (req, res) => {
        model.getBeritaByCol(req.params)
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
    addBerita: async (req, res) => {
        model.addBerita(req.body)
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
    updateBerita: async (req, res) => {
        model.updateBerita(req.body, req.params)
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
    deleteBerita: async (req, res) => {
        model.deleteBerita(req.params)
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

module.exports = berita