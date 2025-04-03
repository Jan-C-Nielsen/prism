import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const app = express()

app.use(cors())

app.use(express.json())

app.get("/bolcher", async function (_, res) {
    let bolcher = await prisma.bolche.findMany()
    res.json(bolcher)
})

app.get("/bolcher/:id", async function (req, res) {
    let params = req.params
    let bolche = await prisma.bolche.findUnique({
        where: { id: parseInt(params.id) }
    })
    res.json(bolche)
})

// app.post("/bolcher", async function (req, res) {
//     let body = req.body

//     let bolche = await prisma.bolche.create({
//         data: {
//             navn: body.navn,
//             farve: body.farve,
//             vaegt: body.vaegt,
//             surhed: body.surhed,

//             smag: body.smag,
//             pris: body.pris

//         }
//     })
//     res.json(bolche)
// })

app.delete("/bolcher", async function (req, res) {
    let body = req.body

    let bolche = await prisma.bolche.findUnique({
        where: { id: body.id }
    })

    if (!bolche) {
        return res.status(404).json({ message: "Findes ikke" })
    }

    await prisma.bolche.delete({
        where: { id: body.id }
    })

    return res.status(204).end()

})

app.patch("/bolcher", async function (req, res) {
    let body = req.body

    const update = await prisma.bolche.update(
        {
          where:{ id: body.id},
          data:  body
        }
    )
    return  res.status(204).end()
})

app.listen(4000, function () {
    console.log("Listening")
})
