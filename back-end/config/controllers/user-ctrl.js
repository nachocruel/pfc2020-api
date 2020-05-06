const User = require('../../../schemes/user-service')

createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Informar o usuário',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: movie._id,
                message: 'Usuario criado!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'O usuário não foi criado!',
            })
        })
}

updateUser = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Usuário não encontrado!',
            })
        }

        user.name = body.name
        user.email = body.email
        user.password = body.password
        user.profile = body.profile
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'Usuário atualizado!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Usuário não atualizado!',
                })
            })
    })
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `Usuário não encontrado` })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `Usuário não encontrado` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `Usuário não encontrados` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

logarUser = async (req, res) => {
    const body = req.body
    await User.findOne({ $and: [{email: body.email}, {password: body.password}] }, (err, user) => {
        if (err) {
            return res.status(400).json({ result: false, message: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ result: false, message: `Usuário não encontrado` })
        }else{
            return res.status(200).json({ result: true, data: user })
        }
   
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById,
    logarUser,
}