import { Characteristic } from './models/characteristic.model';
import { User } from './models/user.model';
import { dbConnect } from "./db/db"
import { Basket } from './models/basket.model';
import { Brand } from './models/brand.model';
import { Type } from './models/type.model';
import { Device } from './models/device.model';
import { BasketDevice } from './models/basket_device.model';
import { Rating } from './models/rating.model';
import { CharacteristicValue } from './models/characteristic_value.model';
import { ValueCharacteristic } from './models/valueCharacterisics.model';

const express = require("express")
const { config } = require("dotenv")
config()


const port = process.env.PORT || 8000
const app = express()

const start = async () => {
    try {
        await dbConnect()
        console.log(await User.findAll())
        console.log(await ValueCharacteristic.createTable())
        app.listen(port, () => {
            console.log("Server working on a port", port)

        })
    } catch (error) {
        console.log(error);

    }
}

start()