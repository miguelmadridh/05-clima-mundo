//const axios = require('axios');
const lugar = require('./lugar/lugar');

const argv = require('yargs').options(

    {
        direccion: {
            alias: 'd',
            desc: 'Es la direccion en donde se va a buscar el clima',
            demand: true
        }
    }
).help().argv;


const getInfo = async(direccion) => {
    try {
        let dir = await lugar.getLugarLatLng(direccion);
        let clima = await lugar.getClima(dir.lat, dir.lng);

        return `El clima en ${dir.direccion} es de ${clima}`;
    } catch (e) {
        return `No se pudo determinar el clima en ${ direccion }`;
    }
}

getInfo(argv.direccion).then(resp => { console.log(resp) }).catch(e => console.log(e));