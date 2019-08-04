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
        const response = await fetch(`${BASE_URL}/boxLocation`,{
            method:'POST',
            headers:{
                'Content-type':'Application/json'
            },
            body:JSON.stringify(boxLocation)
        });
        const data = await response.json();
    }

    static async getCurrentLocations() {
        const response = await fetch(`${BASE_URL}/boxLocation/notfinish`);
        const data = await response.json();
        return data;
    }

    static async getAllLocations() {
        const response = await fetch(`${BASE_URL}/boxLocation`);
        const data = await response.json();
        return data;
    }
}

export default Api;