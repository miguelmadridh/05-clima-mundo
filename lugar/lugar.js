const axios = require('axios');


const getLugarLatLng = async(direccion) => {

    let dir = encodeURI(direccion);
    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${dir}&key=AIzaSyDzbQ_553v-n8QNs2aafN9QaZbByTyM7gQ`)

    if (resp.status === 'ZERO_RESULTS') {
        throw new Error(`No hay resultados para la ciudad ${direccion}`);
    }

    let location = resp.data.results[0];
    let coors = location.geometry.location;


    return {
        direccion: location.formatted_address,
        lat: coors.lat,
        lng: coors.lng
    };

}



const getClima = async(lat, lng) => {
    let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=236e3e9fb926cd125222cd44c31d3da6`);
    return resp.data.main.temp;
}


module.exports = {
    getLugarLatLng,
    getClima

}