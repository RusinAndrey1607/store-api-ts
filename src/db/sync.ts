import { Characteristic } from './../models/characteristic.model';
import { Type } from '../models/type.model';
import { User } from '../models/user.model';
import { Brand } from './../models/brand.model';
import { CharacteristicValue } from '../models/characteristic_value.model';
import { Basket } from '../models/basket.model';
import { Device } from '../models/device.model';
import { ValueCharacteristic } from '../models/valueCharacterisics.model';
import { Rating } from '../models/rating.model';
import { BasketDevice } from '../models/basket_device.model';

export const syncDB = async () =>{
    await Brand.createTable()
    await Type.createTable()
    await User.createTable()
    await Basket.createTable()
    await Characteristic.createTable()
    await CharacteristicValue.createTable()
    await Device.createTable()
    await ValueCharacteristic.createTable()
    await Rating.createTable()
    await BasketDevice.createTable()
}