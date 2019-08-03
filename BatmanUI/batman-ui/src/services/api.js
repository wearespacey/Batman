const BASE_URL = 'https://batman-project.azurewebsites.net/api';

class Api{
    static async getBoxes(){
        const response = await fetch(`${BASE_URL}/SelectOption/BoxId`);
        const data = await response.json();
        return data;
    }

    static async getOperators(){
        const response = await fetch(`${BASE_URL}/SelectOption/OperatorName`);
        const data = await response.json();
        return data;
    }

    static async getHabitat(){
        const response = await fetch(`${BASE_URL}/SelectOption/habitat1`);
        const data = await response.json();
        return data;
    }

    static async addNewLocation(boxLocation){
        const response = await fetch({
            url: `${BASE_URL}/boxlocation`,
            method:'POST',
            body:boxLocation,
            headers:{
                'content-type':'Application/json'
            }
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
    }
}

export default Api;